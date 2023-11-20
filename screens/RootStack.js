// RootStack.js

import React from "react";
import SignInScreen from "./SignInScreen";
import MainTab from "./MainTab";
import UploadItemScreen from "./UploadItemScreen";
import SignUpScreen from "./SignUpScreen";
import GetUserCategoryScreen from "./GetUserCategoryScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="GetUserCategory" component={GetUserCategoryScreen} />
      <Stack.Screen name="UploadItem" component={UploadItemScreen} />
      <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
  );
};

export default RootStack;
