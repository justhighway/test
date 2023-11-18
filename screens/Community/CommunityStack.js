import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BoardScreen from "./BoardScreen";
import PostListScreen from "./PostListScreen";
import PostScreen from "./PostScreen";

const Stack = createNativeStackNavigator();

export default function CommunityStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Board"
        component={BoardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostList"
        component={PostListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Post"
        component={PostScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
