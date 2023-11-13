// screens/HomeStack.js
import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FeedScreen from "./FeedScreen";
import { signOutt } from "../lib/auth";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
