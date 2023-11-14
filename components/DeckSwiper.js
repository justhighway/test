// components/DeckSwiper.js
import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text, ActivityIndicator, Image } from "react-native";
import Swiper from "react-native-deck-swiper";
import { collection, getDocs } from "firebase/firestore";
import { FB_DB } from "../FirebaseConfig";
import { LinearGradient } from "expo-linear-gradient";

export default function DeckSwiper() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const itemsCollection = collection(FB_DB, "items");
      const itemsSnapshot = await getDocs(itemsCollection);
      const itemsData = [];

      itemsSnapshot.forEach((doc) => {
        const data = doc.data();
        itemsData.push({
          id: doc.id,
          ...data,
        });
      });

      setItems((prevItems) => [...prevItems, ...itemsData]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [currentIndex]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderCard = useCallback((card) => {
    const { itemName, itemPrice, itemCondition, itemPics } = card;

    return (
      <View style={styles.card}>
        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
          style={styles.gradientBox}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{itemName}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.infoText}>{itemPrice} · </Text>
            <Text style={styles.infoText}>{itemCondition}</Text>
          </View>
        </View>
        {itemPics && itemPics.length > 0 && (
          <Image source={{ uri: itemPics[0] }} style={styles.itemPic} />
        )}
      </View>
    );
  }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Swiper
          cards={items}
          renderCard={renderCard}
          stackSeparation={13}
          cardVerticalMargin={130}
          cardHorizontalMargin={10}
          marginBottom={30}
          onSwiped={(cardIndex) => {
            console.log(cardIndex, "번째 카드");

            setCurrentIndex(cardIndex + 1);

            if (cardIndex === items.length - 1) {
              fetchData();
            }
          }}
          cardIndex={0}
          backgroundColor={"#4FD0E9"}
          stackSize={5}
        ></Swiper>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    backgroundColor: "white",
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  textContainer: {
    padding: 25,
    marginBottom: "3%",
  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  infoText: {
    color: "white",
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  gradientBox: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "20%",
    backgroundColor: "transparent",
    zIndex: 0,
  },
  itemPic: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
});
