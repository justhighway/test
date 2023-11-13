import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Platform, Pressable, StyleSheet, View, Image } from "react-native";
import { signOutt } from "../lib/auth";
import { createUser } from "../lib/users";
import BorderedInput from "./BorderedInput";
import CustomButton from "./CustomButton";
import { useUserContext } from "../context/UserContext";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../FirebaseConfig";

export default function SetupProfile() {
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigation = useNavigation();
  const { setUser } = useUserContext();

  const { params } = useRoute();
  const { uid } = params || {};

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          console.error("Permission denied for media library access");
        }
      }
    })();
  }, []);

  const onSubmit = async () => {
    setLoading(true);

    let photoURL = null;

    const user = {
      id: uid,
      displayName,
      photoURL,
    };
    createUser(user);
    setUser(user);
  };

  const onCancel = () => {
    signOutt();
    navigation.goBack();
  };

  const onSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoURL(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.block}>
      <Pressable style={styles.circle} onPress={onSelectImage}>
        {photoURL && <Image source={{ uri: photoURL }} style={styles.circle} />}
      </Pressable>
      <View style={styles.form}>
        <BorderedInput
          placeholder="닉네임"
          value={displayName}
          onChangeText={setDisplayName}
          onSubmitEditing={onSubmit}
          returnKeyType="next"
        />
        <View style={styles.buttons}>
          <CustomButton title="다음" onPress={onSubmit} hasMarginBottom />
          <CustomButton title="취소" onPress={onCancel} theme="secondary" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    alignItems: "center",
    marginTop: 24,
    paddingHorizontal: 16,
    width: "100%",
  },
  circle: {
    backgroundColor: "#cdcdcd",
    borderRadius: 64,
    width: 128,
    height: 128,
  },
  form: {
    marginTop: 16,
    width: "100%",
  },
  buttons: {
    marginTop: 48,
  },
});
