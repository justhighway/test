// HomeScreen.js에 추가
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from "react-native";
import { useUserContext } from "../../context/UserContext";
import DeckSwiper from "../../components/DeckSwiper";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = ({ route }) => {
  const { user } = useUserContext();
  const [hasUploadedItem, setHasUploadedItem] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Check if the user has uploaded any item
    if (user && user.userUploadedItemID) {
      console.log("user.userUploadedItemID", user.userUploadedItemID);

      if (
        Array.isArray(user.userUploadedItemID) &&
        user.userUploadedItemID.length > 0
      ) {
        console.log("Has uploaded items");
        setHasUploadedItem(true);
      } else {
        console.log("No uploaded items");
        setHasUploadedItem(false);
      }
    }
    if (route.params?.refreshHome) {
      navigation.setParams({ refreshHome: false });
      console.log("refreshed!");
    }
  }, [user, route.params?.refreshHome]);

  return (
    <View style={styles.container}>
      {hasUploadedItem ? (
        <DeckSwiper userUploadedItemIDs={user.userUploadedItemID} />
      ) : (
        <>
          <Text style={styles.uploadText}>물건을 업로드 해주세요.</Text>
          <Button title="hihi" onPress={() => console.log(user)} />
        </>
      )}

      {/* 새로고침을 위한 TouchableOpacity */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
