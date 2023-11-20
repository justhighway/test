// lib/matches.js
import { FB_DB } from "../FirebaseConfig";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

// 매칭된 아이템 조회
export async function getMatchedItems(userId, itemId) {
  const matchesCollection = collection(FB_DB, "matches");

  const matchedItemsQuery = query(
    matchesCollection,
    where("user1Id", "==", userId),
    where("item1Id", "==", itemId)
  );

  const matchedItemsSnapshot = await getDocs(matchedItemsQuery);

  const matchedItems = [];

  matchedItemsSnapshot.forEach((doc) => {
    const data = doc.data();
    matchedItems.push({
      userId: data.user2Id,
      itemId: data.item2Id,
    });
  });

  return matchedItems;
}

// 매칭 정보 생성
export async function createMatch(user1Id, user2Id, item1Id, item2Id) {
  const matchesCollection = collection(FB_DB, "matches");

  await addDoc(matchesCollection, {
    user1Id,
    user2Id,
    item1Id,
    item2Id,
    timestamp: new Date(),
  });
}
