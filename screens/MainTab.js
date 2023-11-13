import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import MyProfileStack from "./MyProfileStack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UploadItemButton from "../components/UploadItemButton";
import { useNavigation } from "@react-navigation/native";

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
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#6200ee",
          }}
        >
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="MyProfileStack"
            component={MyProfileStack}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color={color}
                />
              ),
            }}
          />
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
