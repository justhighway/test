// screen/HomeScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useUserContext } from "../../context/UserContext";
import DeckSwiper from "../../components/DeckSwiper";
import { fetchUserUploadedItem } from "../../lib/items";
import { useIsFocused } from "@react-navigation/native";
import SelectItemButton from "../../components/SelectItemButton";
import { FB_DB } from "../../FirebaseConfig";
import { doc, collection, getDoc } from "firebase/firestore";
import { calculateSimilarity } from "../../lib/calculateSimilarity";

const HomeScreen = () => {
  const { user } = useUserContext();
  const isFocused = useIsFocused();
  const [hasUploadedItem, setHasUploadedItem] = useState(false);
  const [userUploadedItems, setUserUploadedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [similarities, setSimilarities] = useState();

  const checkUploadedItem = async () => {
    const userItems = await fetchUserUploadedItem(user.uid);
    if (userItems && userItems.length > 0) {
      console.log("HomeScreen: 업로드 된 아이템 있음!");
      setHasUploadedItem(true);
      setUserUploadedItems(userItems);
    } else {
      console.log("HomeScreen: 업로드 된 아이템이 없음..");
      setHasUploadedItem(false);
    }
  };

  useEffect(() => {
    if (user && user.uid && isFocused) {
      checkUploadedItem();
      console.log("HomeScreen 재포커스");
    }
    console.log(similarities);
  }, [user, isFocused, similarities]);

  const handleSelectItem = async (selectedItem) => {
    setSelectedItem(selectedItem);

    // 'items' 컬렉션의 데이터를 불러와서 유사도 계산
    const itemsCollection = collection(FB_DB, "items");
    const userCategoryRef = await getDoc(doc(FB_DB, "users", user.uid));
    const userCategory = userCategoryRef.data().userCategory;
    const calculatedSimilarities = await calculateSimilarity(
      selectedItem,
      itemsCollection,
      userCategory
    );
    setSimilarities(calculatedSimilarities);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {hasUploadedItem && !selectedItem ? (
        <>
          <SelectItemButton
            userUploadedItems={userUploadedItems}
            onSelectItem={handleSelectItem}
          />
          <View style={styles.centerTextContainer}>
            <Text style={styles.centerText}>물건을 선택해주세요.</Text>
          </View>
        </>
      ) : selectedItem ? (
        <>
          {/* <SelectItemButton
            userUploadedItems={userUploadedItems}
            onSelectItem={handleSelectItem}
          /> */}
          {similarities ? (
            <DeckSwiper similarItems={similarities} />
          ) : (
            <ActivityIndicator />
          )}
        </>
      ) : (
        <View style={styles.container}>
          <Text style={styles.uploadText}>물건을 업로드 해주세요.</Text>
          <Button
            title="uid 확인"
            onPress={() => console.log("로그인 된 uid:", user.uid)}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  centerTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
