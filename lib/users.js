// lib/users.js

import { FB_DB } from "../FirebaseConfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";

const createUser = async ({
  userEmail,
  userNickname,
  userProfilePic,
  userCategory,
  uid,
}) => {
  try {
    // 문서명을 'uid'로 설정하여 사용자 정보를 저장합니다.
    const userRef = await setDoc(doc(FB_DB, "users", uid), {
      userEmail,
      userNickname,
      userProfilePic,
      userLevel: 1,
      userExp: 0,
      userCategory: [],
      userUploadedItemID: [],
      userLikedItemID: [],
      userDislikedItemID: [],
      userMatchedUserID: [],
      uid: uid, // uid 필드에도 저장합니다.
    });

    return uid; // 생성된 사용자 ID를 반환합니다.
  } catch (e) {
    console.error("문서 추가 중 오류: ", e);
    return null;
  }
};

const getUser = async (uid) => {
  try {
    const userDoc = await getDoc(doc(FB_DB, "users", uid));

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log(`사용자 컬렉션을 받아오는 중: ${userDoc} 문서 없음`);
      return null;
    }
  } catch (e) {
    console.error("사용자 문서 불러오는 중 에러:", e);
    return null;
  }
};

const updateUserCategory = async (userId, categories) => {
  const userRef = doc(FB_DB, "users", userId);

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
export async function updateUserLikedItems(userId, itemId) {
  const userRef = doc(FB_DB, "users", userId);

  await updateDoc(userRef, {
    userLikedItemID: arrayUnion(itemId),
  });
}

// 사용자가 '싫어함'으로 표시한 아이템 추가
export async function updateUserDislikedItems(userId, itemId) {
  const userRef = doc(FB_DB, "users", userId);

  await updateDoc(userRef, {
    userDislikedItemID: arrayUnion(itemId),
  });
}

export { createUser, getUser, updateUserCategory };
