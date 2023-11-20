// screens/GetUserCategoryScreen.js

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserContext } from "../context/UserContext";
import { updateUserCategory } from "../lib/users";

const categories = [
  "전자제품",
  "의류",
  "도서",
  "가구",
  "스포츠용품",
  "기타",
  "음식",
  "음료",
  "뷰티",
  "건강",
  "가전제품",
  "애완동물용품",
  "가방",
  "신발",
  "액세서리",
  "의류소품",
  "시계",
  "자동차 용품",
  "전자/테크",
  "취미",
  "스포츠",
  "인테리어",
  "욕실용품",
  "리빙",
  "헤어",
  "스킨케어",
  "메이크업",
  "네일아트",
  "향수",
  "미용도구",
  "건강기능식품",
  "의료용품",
  "건강 측정기기",
  "의약품",
  "냉장식품",
  "건조식품",
  "간편조리식품",
  "음료수",
  "커피 및 차",
  "간식",
  "카메라",
  "휴대폰 액세서리",
  "음향기기",
  "게임",
  "소프트웨어",
  "유아의류",
  "유아신발",
  "완구",
  "유아도서",
  "유아용품",
  "캠핑용품",
  "등산용품",
  "문구",
  "예술",
  "음악",
  "속옷",
  "모자 및 장갑",
  "스카프",
  "시즌",
  "휴일",
  "파티",
];

const GetUserCategoryScreen = ({ navigation }) => {
  const { user, setUser } = useUserContext();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((prevCategory) => prevCategory !== category)
      );
    } else {
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    }
  };

  const handleContinue = async () => {
    // Firestore에 사용자가 선택한 카테고리 업데이트
    await updateUserCategory(user.uid, selectedCategories);

    // 로컬 사용자 컨텍스트 업데이트
    setUser((prevUser) => ({ ...prevUser, userCategory: selectedCategories }));

    // 다음 화면(MainTab)으로 이동
    navigation.navigate("MainTab");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>선호하는 물건 카테고리를</Text>
        <Text style={styles.headerText}>골라주세요!</Text>
        <View style={styles.selectedCategories}>
          {selectedCategories.map((selectedCategory, index) => (
            <Text key={index} style={styles.selectedCategoryText}>
              {selectedCategory}
            </Text>
          ))}
        </View>
      </View>
      <ScrollView style={styles.middle}>
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategories.includes(category) &&
                  styles.selectedCategoryButton,
              ]}
              onPress={() => handleCategoryToggle(category)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategories.includes(category) &&
                    styles.selectedCategoryButtonText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.floatingButton} onPress={handleContinue}>
        <Text style={styles.floatingButtonText}>시작하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  headerText: {
    fontSize: 24,
  },
  selectedCategories: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  selectedCategoryText: {
    backgroundColor: "#ad07fa",
    color: "white",
    fontSize: 16,
    padding: 5,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  middle: {
    flex: 1,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    padding: 14,
  },
  categoryButton: {
    height: "auto",
    width: "auto",
    padding: 10,
    marginVertical: 5,
    borderRadius: 14,
    backgroundColor: "#e3e2e1",
    borderColor: "black",
    marginHorizontal: 4,
    justifyContent: "center",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3, // Android에서도 그림자 효과 적용
  },
  selectedCategoryButton: {
    backgroundColor: "#ad07fa",
    borderColor: "white",
  },
  categoryButtonText: {
    color: "black",
    fontSize: 18,
  },
  selectedCategoryButtonText: {
    color: "white",
    fontSize: 18,
  },
  floatingButton: {
    position: "absolute",
    bottom: "8%", // 화면 하단에서 10% 위치
    alignSelf: "center", // 가운데 정렬
    backgroundColor: "#ad07fa",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3, // Android에서도 그림자 효과 적용
  },
  floatingButtonText: {
    color: "white",
    fontSize: 18,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3, // Android에서도 그림자 효과 적용
  },
});

export default GetUserCategoryScreen;
