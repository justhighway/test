// UploadItemScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Button,
  Image,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { uploadItem } from "../lib/itemService";
import { useNavigation } from "@react-navigation/native";
import { ref } from "firebase/storage";

export default function UploadItemScreen() {
  const [itemName, setItemName] = useState("");
  const [itemCondition, setItemCondition] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemKeywords, setItemKeywords] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPics, setItemPics] = useState([]);

  const itemConditionRef = useRef();
  const itemPriceRef = useRef();
  const itemKeywordsRef = useRef();
  const itemDescriptionRef = useRef();

  useEffect(() => {
    // 권한 요청
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "권한이 없습니다.",
          "이미지를 업로드하려면 권한이 필요합니다."
        );
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      // result.assets 배열에서 uri만 추출하여 setItemPics로 설정
      setItemPics(result.assets.map((asset) => asset.uri));
      console.log(itemPics);
    }
  };

  useEffect(() => {
    console.log(itemPics);
  }, [itemPics]);

  const handleUpload = async () => {
    if (
      !itemName ||
      !itemCondition ||
      !itemPrice ||
      !itemKeywords ||
      itemPics.length === 0
    ) {
      Alert.alert("입력 필요", "모든 필드를 입력하세요");
      return;
    }

    const success = await uploadItem({
      itemName,
      itemCondition,
      itemPrice,
      itemKeywords,
      itemDescription,
      itemPics,
    });

    if (success) {
      Alert.alert("성공", "상품이 성공적으로 업로드되었습니다");
      // 업로드 후 필요한 작업 수행
    } else {
      Alert.alert(
        "오류",
        "상품 업로드 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.KeyboardAvoidingView}
      behavior={Platform.select({ ios: "padding" })}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {itemPics.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.images} />
        ))}
      </ScrollView>

      <Button title="이미지 선택" onPress={pickImage} />

      <TextInput
        placeholder="상품명"
        value={itemName}
        onChangeText={setItemName}
        style={styles.input}
        onSubmitEditing={() => itemConditionRef.current.focus()}
      />
      <TextInput
        placeholder="상품 상태"
        value={itemCondition}
        onChangeText={setItemCondition}
        style={styles.input}
        ref={itemConditionRef}
        onSubmitEditing={() => {
          itemPriceRef.current.focus();
        }}
      />
      <TextInput
        placeholder="상품 가격"
        value={itemPrice}
        onChangeText={setItemPrice}
        style={styles.input}
        ref={itemPriceRef}
        onSubmitEditing={() => {
          itemKeywordsRef.current.focus();
        }}
      />
      <TextInput
        placeholder="상품 키워드"
        value={itemKeywords}
        onChangeText={setItemKeywords}
        style={styles.input}
        ref={itemKeywordsRef}
        onSubmitEditing={() => {
          itemDescriptionRef.current.focus();
        }}
      />
      <TextInput
        placeholder="상품 설명"
        value={itemDescription}
        onChangeText={setItemDescription}
        style={styles.descriptInput}
        ref={itemDescriptionRef}
      />

      <Button
        title="업로드"
        style={{ backgroundColor: "purple" }}
        onPress={handleUpload}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  KeyboardAvoidingView: {},
  scrollContent: {},
  input: {
    borderColor: "#bdbdbd",
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 48,
    backgroundColor: "white",
    width: "100%",
    marginBottom: 10,
  },
  descriptInput: {
    borderColor: "#bdbdbd",
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: "20%",
    backgroundColor: "white",
    width: "100%",
    marginBottom: 10,
  },
  images: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginRight: 15,
    borderRadius: 10,
  },
});
