// screens/UploadItemScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  Image,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { uploadItem } from "../lib/itemService";
import { useUserContext } from "../context/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UploadItemScreen() {
  const { user } = useUserContext();
  const [itemName, setItemName] = useState("");
  const [itemCondition, setItemCondition] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPics, setItemPics] = useState([]);

  const itemConditionRef = useRef();
  const itemPriceRef = useRef();
  const itemCategoryRef = useRef();
  const itemDescriptionRef = useRef();

  const navigation = useNavigation();

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
    }
  };

  const handleUpload = async () => {
    if (
      !itemName ||
      !itemCondition ||
      !itemPrice ||
      !itemCategory ||
      itemPics.length === 0
    ) {
      Alert.alert("입력 필요", "모든 필드를 입력하세요");
      return;
    }

    const { success, itemId, error } = await uploadItem({
      itemName,
      itemCondition,
      itemPrice,
      itemCategory,
      itemDescription,
      itemPics,
      userId: user.uid,
    });

    if (success) {
      Alert.alert("성공", "상품이 성공적으로 업로드되었습니다");
      navigation.pop();
    } else {
      Alert.alert("오류", `상품 업로드 중 오류가 발생했습니다. ${error}`);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ ios: "padding" })}
    >
      <SafeAreaView style={styles.fullscreen}>
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
          onSubmitEditing={() => itemPriceRef.current.focus()}
        />
        <TextInput
          placeholder="상품 가격"
          value={itemPrice}
          onChangeText={setItemPrice}
          style={styles.input}
          ref={itemPriceRef}
          onSubmitEditing={() => itemCategoryRef.current.focus()}
        />
        <TextInput
          placeholder="상품 카테고리"
          value={itemCategory}
          onChangeText={setItemCategory}
          style={styles.input}
          ref={itemCategoryRef}
          onSubmitEditing={() => itemDescriptionRef.current.focus()}
        />
        <TextInput
          placeholder="상품 설명"
          value={itemDescription}
          onChangeText={setItemDescription}
          style={styles.descriptInput}
          ref={itemDescriptionRef}
        />
        <View style={styles.buttonLayout}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.pop()}
          >
            <Text style={{ color: "white" }}>뒤로가기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleUpload}>
            <Text style={{ color: "white" }}>업로드</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
  buttonLayout: {
    flexDirection: "row",
  },
  button: {
    width: "45%",
    height: 60,
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
