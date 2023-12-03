import React from "react";
import { StyleSheet, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import RootStack from "./screens/RootStack";
import UserContextProvider from "./context/UserContext";

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
