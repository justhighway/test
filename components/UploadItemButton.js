import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TABBAR_HEIGHT = 49;

export default function UploadItemButton({ onPress }) {
  const insets = useSafeAreaInsets();
  const bottom = Platform.select({
    android: TABBAR_HEIGHT / 2,
    ios: TABBAR_HEIGHT / 2 + insets.bottom - 4,
  });

  return (
    <View style={[styles.wrapper, { bottom }]}>
      <Pressable
        android_ripple={{
          color: "ffffff",
        }}
        style={styles.circle}
        onPress={onPress}
      >
        <MaterialCommunityIcons name="plus" color="white" size={30} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 5,
    borderRadius: 27,
    height: 60,
    width: 60,
    position: "absolute",
    left: "50%",
    transform: [
      {
        translateX: -27,
      },
    ],
    ...Platform.select({
      ios: {
        shadowColor: "#4d4d4d",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
        overflow: "hidden",
      },
    }),
  },
  circle: {
    backgroundColor: "#6200ee",
    borderRadius: 30,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
