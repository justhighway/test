// lib/items.js
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { FB_DB } from "../FirebaseConfig";

export async function fetchUserUploadedItemIDs(userId) {
  try {
    const userDocRef = doc(FB_DB, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      return userData ? userData.userUploadedItemID : [];
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
  const userDocRef = collection(FB_DB, "users", userId);
  const userDocSnapshot = await getDocs(userDocRef);
  const userData = userDocSnapshot.data();

  const likedItemIDs = userData ? userData.userLikedItemID : [];
  const dislikedItemIDs = userData ? userData.userDislikedItemID : [];

  const itemsCollection = collection(FB_DB, "items");
  const matchingItemsQuery = query(
    itemsCollection,
    where("itemID", "not-in", [...likedItemIDs, ...dislikedItemIDs]),
    where("itemID", "!=", selectedItemId),
    where("itemPrice", ">=", selectedItemId.itemPrice * 0.9),
    where("itemPrice", "<=", selectedItemId.itemPrice * 1.1),
    where("itemCondition", "==", selectedItemId.itemCondition),
    where("itemState", "==", "before")
  );

  const matchingItemsSnapshot = await getDocs(matchingItemsQuery);
  const matchingItemsData = matchingItemsSnapshot.docs.map((doc) => doc.data());

  return matchingItemsData;
}
