// screens/HomeStack.js
import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./HomeScreen";
import ChattingScreen from "../Chat/ChattingScreen";
import UploadItemScreen from "../UploadItemScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chatting"
        component={ChattingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UploadItem"
        component={UploadItemScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
