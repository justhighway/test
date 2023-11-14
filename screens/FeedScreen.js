import { StyleSheet, Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { signOutt } from "../lib/auth";
import DeckSwiper from "../components/DeckSwiper";

export default function FeedScreen() {
  const navigation = useNavigation();
  const handleLogout = async () => {
    await signOutt();
    navigation.navigate("SignInScreen"); // 로그아웃 후 SignInScreen 스크린으로 이동
  };
  return (
    <View>
      <DeckSwiper />
    </View>
  );
}
