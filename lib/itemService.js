// lib/itemService.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { FB_DB, storage } from "../FirebaseConfig";

const itemsCollection = collection(FB_DB, "items");

export async function uploadItem({
  itemName,
  itemCondition,
  itemPrice,
  itemKeywords,
  itemDescription,
  itemPics, // 여러 이미지들의 URI를 가지고 있는 배열
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
    const newItem = {
      itemName,
      itemCondition,
      itemPrice,
      itemKeywords,
      itemDescription,
      itemPics: imageUrls, // 여러 이미지들의 다운로드 URL 배열
    };

    await addDoc(itemsCollection, newItem);

    return true; // 업로드 성공 시 true 반환
  } catch (error) {
    console.error("상품 업로드 중 오류:", error);
    return false; // 오류 발생 시 false 반환
  }
}
