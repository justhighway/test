// screens/HomeStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatListScreen from "./ChatListScreen";
import ChattingScreen from "./ChattingScreen";

const Stack = createNativeStackNavigator();

export default function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chatting"
        component={ChattingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
