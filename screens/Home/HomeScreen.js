// screen/HomeScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useUserContext } from "../../context/UserContext";
import DeckSwiper from "../../components/DeckSwiper";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { FB_DB } from "../../FirebaseConfig";
import { fetchUserUploadedItemIDs } from "../../lib/items";

const HomeScreen = ({ route }) => {
  const { user } = useUserContext();
  const [hasUploadedItem, setHasUploadedItem] = useState(false);
  const navigation = useNavigation();

  // Function to fetch user data
  const fetchUserData = async (userId) => {
    try {
      const docRef = doc(FB_DB, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  useEffect(() => {
    const checkUploadedItem = async () => {
      if (user && user.uid) {
        const userUploadedItemIDs = await fetchUserUploadedItemIDs(user.uid);

        if (userUploadedItemIDs.length > 0) {
          console.log("Has uploaded items");
          setHasUploadedItem(true);
        } else {
          console.log("No uploaded items");
          setHasUploadedItem(false);
        }
      }
    };

    // Check if user exists before calling checkUploadedItem
    if (user) {
      checkUploadedItem();
    }

    if (route.params?.refreshHome) {
      navigation.setParams({ refreshHome: false });
      console.log("refreshed!");
    }
  }, [user, route.params?.refreshHome]);

  return (
    <View style={styles.container}>
      {hasUploadedItem ? (
        <DeckSwiper userUploadedItemIDs={user?.userUploadedItemID || []} />
      ) : (
        <>
          <Text style={styles.uploadText}>물건을 업로드 해주세요.</Text>
          <Button
            title="hihi"
            onPress={() => console.log("logined user id:", user?.uid)}
          />
        </>
      )}
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
