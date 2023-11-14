import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./screens/RootStack";
import UserContextProvider from "./context/UserContext";
import { LogBox } from "react-native";

// 무시할 경고 추가
LogBox.ignoreLogs(["@firebase/auth:"]);
LogBox.ignoreLogs(["Sending"]);

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({});
