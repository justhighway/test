// utils/similarityCalculator.js
import { collection, query, getDocs, limit } from "firebase/firestore";

export const calculateSimilarity = async (
  selectedItem,
  itemsCollection,
  userCategory
) => {
  const querySnapshot = await getDocs(query(itemsCollection, limit(100)));

  // 최소값과 최대값 초기화
  let minPrice = Number.MAX_VALUE;
  let maxPrice = Number.MIN_VALUE;
  let minCondition = Number.MAX_VALUE;
  let maxCondition = Number.MIN_VALUE;

  querySnapshot.forEach((doc) => {
    const firestoreItem = doc.data();

    // 최소값과 최대값 갱신
    minPrice = Math.min(minPrice, firestoreItem.itemPrice);
    maxPrice = Math.max(maxPrice, firestoreItem.itemPrice);
    minCondition = Math.min(minCondition, firestoreItem.itemCondition);
    maxCondition = Math.max(maxCondition, firestoreItem.itemCondition);
  });

  const similarities = [];

  querySnapshot.forEach((doc) => {
    const firestoreItem = doc.data();

    // 유클리드 거리 및 동적 가중치 유사도 계산
    const normalizedPrice =
      1 - Math.abs(selectedItem.itemPrice - firestoreItem.itemPrice) / maxPrice;

    // 가중치 조절
    let priceWeight = 0.7; // 예시로 0.7로 가정
    let conditionWeight = 1 - priceWeight;
    let categoryWeight = 0.2; // 예시로 0.2로 가정

    // 가중치 스케일링
    const totalWeight = priceWeight + conditionWeight + categoryWeight;
    priceWeight /= totalWeight;
    conditionWeight /= totalWeight;
    categoryWeight /= totalWeight;

    const normalizedCondition =
      1 -
      Math.abs(selectedItem.itemCondition - firestoreItem.itemCondition) /
        maxCondition;

    // 카테고리 일치 여부에 따라 가중치 추가
    categoryWeight *= userCategory.includes(firestoreItem.itemCategory) ? 1 : 0;

    // 두 값 사이의 유사도 계산
    let similarity =
      normalizedPrice * priceWeight +
      normalizedCondition * conditionWeight +
      categoryWeight;

    const priceDifference = selectedItem.itemPrice - firestoreItem.itemPrice;
    // 가격과 컨디션의 차이에 따라 동적으로 보정값 적용
    if (firestoreItem.itemPrice - selectedItem.itemPrice > 0) {
      const conditionDifference =
        firestoreItem.itemCondition - selectedItem.itemCondition;

      const conditionCorrection =
        conditionDifference > 0
          ? (conditionDifference / maxCondition) * 0.3 // 예시로 0.1 적용
          : 0;
      similarity += conditionCorrection;
    }

    // 0~100으로 스케일링
    const scaledSimilarity = similarity * 100;

    if (scaledSimilarity >= 70) {
      similarities.push({
        id: doc.id,
        pics: firestoreItem.itemPics[0],
        name: firestoreItem.itemName,
        price: firestoreItem.itemPrice,
        condition: firestoreItem.itemCondition,
        category: firestoreItem.itemCategory,
        similarity: scaledSimilarity,
      });
    }
  });

  return similarities;
};
