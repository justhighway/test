// lib/itemService.js
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  arrayUnion,
} from "firebase/firestore";
import { FB_DB, storage } from "../FirebaseConfig";

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
    // 각 이미지에 대해 업로드 수행
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
    const newItemRef = await addDoc(itemsCollection, {
      itemName,
      itemCondition,
      itemPrice,
      itemCategory,
      itemDescription,
      itemPics: imageUrls,
      itemUploadedUserID: userId,
      itemState: "before",
    });

    // 사용자 문서의 userUploadedItemID에 해당 itemID 추가
    const userDocRef = doc(usersCollection, userId);
    await updateDoc(userDocRef, {
      userUploadedItemID: arrayUnion(newItemRef.id),
    });

    return { success: true, itemId: newItemRef.id }; // 업로드 성공 시 true와 itemId 반환
  } catch (error) {
    console.error("상품 업로드 중 오류:", error);
    return { success: false, error }; // 오류 발생 시 false와 오류 정보 반환
  }
}
