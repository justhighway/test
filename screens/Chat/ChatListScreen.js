// screens/Chat/ChatListScreen.js
import { StyleSheet, View } from "react-native";
import React from "react";

export default function ChatListScreen({ route, navigation }) {
  // route.params가 정의되어 있는지 확인하고, 그렇지 않으면 빈 객체로 설정
  const { roomId } = route.params || {};

  return <Chatting route={{ params: { roomId } }} />;
}

const styles = StyleSheet.create({});
