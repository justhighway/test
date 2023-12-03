// lib/items.js
import {
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, FB_DB } from "../FirebaseConfig";

const itemsCollection = collection(FB_DB, "items");
const usersCollection = collection(FB_DB, "users");

export async function uploadItem({
  itemName,
  itemCondition,
  itemPrice,
  itemCategory,
  itemDescription,
  itemPics,
  userId,
}) {
  try {
    /** expoImage-picker로 고른 사진들 storage에 올리고 url로 변환 */
    const imageUrls = await Promise.all(
      itemPics.map(async (imageURI, index) => {
        const imageResponse = await fetch(imageURI);
        const imageBlob = await imageResponse.blob();
        const imageRef = ref(storage, `productImages/${itemName}_${index}`);
        await uploadBytes(imageRef, imageBlob);
        return getDownloadURL(imageRef);
      })
    );

    // 상품 데이터를 Firestore에 업로드
    const itemData = {
      itemName,
      itemCondition,
      itemPrice,
      itemCategory,
      itemDescription,
      itemPics: imageUrls,
      itemUploadedUID: userId,
      itemState: "before",
    };
    const itemRef = await addDoc(itemsCollection, itemData);
    const itemID = itemRef.id;

    // users/userID/userUploadedItems 하위 컬렉션에도 item 데이터 저장
    const userItemRef = doc(
      usersCollection,
      userId,
      "userUploadedItems",
      itemID
    );
    await setDoc(userItemRef, itemData);

    console.log("아이템이 저장되었습니다: ", itemID);

    return { success: true };
  } catch (error) {
    console.error("상품 업로드 중 오류:", error);
    return { success: false, error }; // 오류 발생 시 false와 오류 정보 반환
  }
}

export async function fetchUserUploadedItem(uid) {
  try {
    const itemQuery = query(
      collection(FB_DB, "users", uid, "userUploadedItems")
    );
    const itemQuerySnapshot = await getDocs(itemQuery);

    if (!itemQuerySnapshot.empty) {
      const userItems = itemQuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // console.log("userItems:", userItems);
      return userItems;
    } else {
      console.log("items.js: 업로드 된 아이템 없음");
      return [];
    }
  } catch (error) {
    console.error("유저 아이템 불러오는 중 오류 발생:", error);
    return [];
  }
}

export async function fetchMatchingItems(uid, selectedItemId, userCategory) {
  try {
    if (!selectedItemId) {
      console.log("Selected item is undefined");
      return [];
    }

    const userDocRef = doc(FB_DB, "users", uid);
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();

    const likedItemIDs = userData ? userData.userLikedItemID : [];
    const dislikedItemIDs = userData ? userData.userDislikedItemID : [];

    let matchingItemsQuery = query(
      itemsCollection,
      where("itemID", "not-in", [...likedItemIDs, ...dislikedItemIDs]),
      where("itemCategory", "in", userCategory) // 유저의 선호 카테고리에 해당하는 아이템만 필터링
    );

    if (selectedItemId) {
      matchingItemsQuery = query(
        matchingItemsQuery,
        where("itemID", "!=", selectedItemId.itemID),
        where("itemPrice", ">=", selectedItemId.itemPrice * 0.9),
        where("itemPrice", "<=", selectedItemId.itemPrice * 1.1),
        where("itemCondition", "==", selectedItemId.itemCondition),
        where("itemState", "==", "before")
      );
    }

    const matchingItemsSnapshot = await getDocs(matchingItemsQuery);
    const matchingItemsData = matchingItemsSnapshot.docs.map((doc) =>
      doc.data()
    );

    return matchingItemsData;
  } catch (error) {
    console.error("Error fetching matching items:", error);
    return [];
  }
}
