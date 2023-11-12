import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useUserContext } from "../context/UserContext";

export default function MainTab() {
  const { user } = useUserContext();
  return (
    <View style={styles.block}>
      <Text style={styles.text}>Hello, {user.displayName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
  },
});
