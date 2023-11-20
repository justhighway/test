// screens/RoosStack.js

import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { getUser } from "../lib/users";
import { subscribeAuth, getStoredUser } from "./../lib/auth";
import { useUserContext } from "../context/UserContext";

import MainTab from "./MainTab";
import SignInScreen from "./SignInScreen";
import WelcomeScreen from "./WelcomeScreen";
import UploadItemScreen from "./UploadItemScreen";

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const { user, setUser } = useUserContext();

  useEffect(() => {
    const checkStoredUser = async () => {
      const storedUser = await getStoredUser();
      if (storedUser) {
        setUser(storedUser);
      }
    };

    checkStoredUser();

    const unsubscribe = subscribeAuth(async (currentUser) => {
      if (!currentUser) {
        return;
      }

      const profile = await getUser(currentUser.uid);
      if (!profile) {
        return;
      }

      setUser(profile); // 로그인 상태일 때 사용자 정보 업데이트
    });

    return () => {
      unsubscribe();
    };
  }, [setUser]);

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="물건 업로드" component={UploadItemScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignInScreen" // "SignInScreen" 스크린 추가
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="uploadItem" component={UploadItemScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
