// screens/MainTabs.js
import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeStack from "./Home/HomeStack";
import CommunityStack from "./Community/CommunityStack";
import ChatStack from "./Chat/ChatStack";
import MyProfileStack from "./Profile/MyProfileStack";
import UploadItemButton from "../components/UploadItemButton";

const Tab = createBottomTabNavigator();

export default function MainTab() {
  const navigation = useNavigation();

  const handleUploadItemPress = () => {
    navigation.navigate("UploadItem", { refreshHome: true });
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
          tabBarStyle={{ display: "flex" }}
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
