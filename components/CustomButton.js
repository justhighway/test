import { StyleSheet, Text, View, Pressable, Platform } from "react-native";
import React from "react";

export default function CustomButton({ onPress, title, hasMarginBottom }) {
  return (
    <View
      style={[styles.block, styles.overflow, hasMarginBottom && styles.margin]}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.wrapper,
          Platform.OS === "ios" && pressed && { opacity: 0.5 },
        ]}
        android_ripple={{
          color: "#fffff",
        }}
      >
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  overflow: {
    borderRadius: 4,
    overflow: "hidden",
  },
  wrapper: {
    borderRadius: 4,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6200ee",
  },
  text: {
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
  },
  margin: {
    marginBottom: 8,
  },
});
