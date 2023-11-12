import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SingInScreen from "./SingInScreen";
import WelcomeScreen from "./WelcomeScreen";
import { useUserContext } from "../context/UserContext";
import MainTab from "./MainTab";

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const { user } = useUserContext();
  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SingInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
