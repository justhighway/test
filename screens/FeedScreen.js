import { StyleSheet, Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { signOutt } from "../lib/auth";

export default function FeedScreen() {
  const navigation = useNavigation();
  const handleLogout = async () => {
    await signOutt();
    navigation.navigate("SignInScreen"); // 로그아웃 후 SignInScreen 스크린으로 이동
  };
  return (
    <View style={styles.container}>
      <Button title="로그아웃" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
