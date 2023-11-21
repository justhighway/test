// lib/items.js
import { doc, getDoc } from "firebase/firestore";
import { FB_DB } from "../FirebaseConfig";

export async function fetchUserUploadedItemIDs(userId) {
  try {
    const userDocRef = doc(FB_DB, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      return userData ? userData.userUploadedItemID || [] : [];
    } else {
      console.log("User document does not exist");
      return [];
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return [];
  }
}

export async function fetchMatchingItems(userId, selectedItemId) {
  try {
    if (!selectedItemId) {
      console.log("Selected item is undefined");
      return [];
    }

    const userDocRef = doc(FB_DB, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();

    const likedItemIDs = userData ? userData.userLikedItemID : [];
    const dislikedItemIDs = userData ? userData.userDislikedItemID : [];

    const itemsCollection = collection(FB_DB, "items");

    // 비교 대상이 있는 경우에만 where 조건 추가
    let matchingItemsQuery = query(
      itemsCollection,
      where("itemID", "not-in", [...likedItemIDs, ...dislikedItemIDs])
    );

    // 여기서 selectedItemId가 undefined가 아닌 경우에만 추가적인 where 조건을 설정
    if (selectedItemId) {
      matchingItemsQuery = query(
        matchingItemsQuery,
        where("itemID", "!=", selectedItemId.itemID), // itemID를 추가
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
