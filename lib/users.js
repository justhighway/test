import { FB_DB } from "../FirebaseConfig";
import { doc, setDoc, updateDoc, collection } from "firebase/firestore";

/*** lib/users.js
 ** firestore에 users 컬렉션을 생성하고 데이터를 저장하는 함수
 ** userEmail, userProfilePic, userNickname, userLevel, userExp, userCategory, userUploadedItem(subcollection), userLikedItem(subcollection), userDislikedItem(subcollection), userBarterHistory(subcollection)
 */
export const createUser = async ({ userEmail, uid }) => {
  try {
    const userRef = doc(FB_DB, "users", uid);
    await setDoc(userRef, {
      uid: uid,
      userEmail: userEmail,
      userNickname: "",
      userProfilePic: "",
      userLevel: 1,
      userExp: 0,
      userCategory: [],
    });

    // 서브컬렉션들 생성
    // const subCollections = [
    //   "userUploadedItems",
    //   "userLikedItems",
    //   "userDislikedItems",
    //   "userBarterHistory",
    // ];
    // for (const subCollection of subCollections) {
    //   const subCollectionRef = doc(collection(userRef, subCollection));
    //   await setDoc(subCollectionRef, {});
    // }
  } catch (e) {
    console.error("문서 추가 중 오류: ", e);
    return null;
  }
};

export const getUser = async (uid) => {
  try {
    const userDoc = await doc(FB_DB, "users", uid);
    const userDocSnapshot = await getDoc(userDoc);

    if (userDocSnapshot.exists()) {
      return userDocSnapshot.data();
    } else {
      console.log(`사용자 컬렉션을 받아오는 중: ${userDoc} 문서 없음`);
      return null;
    }
  } catch (e) {
    console.error("사용자 문서 불러오는 중 에러:", e);
    return null;
  }
};

export const updateUserCategory = async (uid, categories) => {
  const userRef = doc(FB_DB, "users", uid);
  try {
    await updateDoc(userRef, {
      userCategory: categories,
    });
    console.log("유저 카테고리 저장됨");
  } catch (error) {
    console.error("Error updating user categories:", error);
  }
};

// 사용자가 '좋아함'으로 표시한 아이템 추가
export async function updateUserLikedItems(uid, itemId) {
  await addItemToSubcollection(uid, "userLikedItems", itemId);
}

// 사용자가 '싫어함'으로 표시한 아이템 추가
export async function updateUserDislikedItems(uid, itemId) {
  await addItemToSubcollection(uid, "userDislikedItems", itemId);
}
