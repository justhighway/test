import { collection, addDoc, getDoc, setDoc, doc } from "firebase/firestore";
import { FB_DB } from "../FirebaseConfig";

const db = FB_DB;
const userCollection = collection(db, "users");

const createUser = async ({ id, displayName, photoURL }) => {
  const userRef = doc(db, "users", id);
  await setDoc(userRef, {
    id,
    displayName,
    photoURL,
  });
};

const getUser = async (id) => {
  try {
    // users 컬렉션에서 해당 ID의 문서 조회
    const userDoc = await getDoc(doc(db, "users", id));

    if (userDoc.exists()) {
      // 문서가 존재하면 데이터 반환
      return userDoc.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error getting document: ", e);
    return null;
  }
};

export { createUser, getUser };
