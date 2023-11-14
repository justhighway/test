// screens/MainTabs.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import MyProfileStack from "./MyProfileStack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UploadItemButton from "../components/UploadItemButton";
import { useNavigation } from "@react-navigation/native";
import CommunityStack from "./CommunityStack";
import ChatStack from "./ChatStack";

const Tab = createBottomTabNavigator();

export default function MainTab() {
  const navigation = useNavigation();

  const handleUploadItemPress = () => {
    navigation.navigate("물건 업로드");
  };

  return (
    <>
      <View style={styles.block}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#6200ee",
            tabBarIcon: ({ color }) => {
              let iconName;

              if (route.name === "HomeStack") {
                iconName = "home";
              } else if (route.name === "CommunityStack") {
                iconName = "magnify";
              } else if (route.name === "ChatStack") {
                iconName = "chat";
              } else if (route.name === "MyProfileStack") {
                iconName = "account";
              }

              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={24}
                  color={color}
                  style={[
                    route.name === "CommunityStack"
                      ? { marginRight: 30 }
                      : null,
                    route.name === "ChatStack" ? { marginLeft: 30 } : null,
                  ]}
                />
              );
            },
          })}
          tabBarStyle={{ display: "flex" }} // 여기에 옵션 추가
        >
          <Tab.Screen name="HomeStack" component={HomeStack} />
          <Tab.Screen name="CommunityStack" component={CommunityStack} />
          <Tab.Screen name="ChatStack" component={ChatStack} />
          <Tab.Screen name="MyProfileStack" component={MyProfileStack} />
        </Tab.Navigator>
      </View>
      <UploadItemButton onPress={handleUploadItemPress} />
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    zIndex: 0,
  },
  text: {
    fontSize: 24,
  },
});
