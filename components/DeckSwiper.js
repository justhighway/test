// components/DeckSwiper.js
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { fetchMatchingItems } from "../lib/items";
import { useUserContext } from "../context/UserContext";

export default function DeckSwiper({ userUploadedItemIDs }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = Dimensions.get("window");
  const { user } = useUserContext();
  const cards = ["this", "is", "newver", "that"];

  const fetchData = useCallback(async () => {
    try {
      if (!user) {
        console.log("User not available yet");
        return;
      }

      if (currentIndex === 0) {
        setLoading(true);
      }

      // Log currentIndex and items to see their values
      console.log("currentIndex:", currentIndex);
      console.log("items:", items);

      const selectedItemId = items[currentIndex];

      // Check if selectedItemId is not undefined before fetching matching items
      if (selectedItemId !== undefined) {
        const matchingItems = await fetchMatchingItems(
          user.uid,
          selectedItemId
        );

        // Log matchingItems to see the structure
        console.log("matchingItems:", matchingItems);

        setItems((prevItems) => [...prevItems, ...matchingItems]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [currentIndex, user, items]);

  useEffect(() => {
    console.log("Updated items:", items);
    fetchData();
  }, [fetchData, user, items]);

  const renderCard = useCallback(
    (card) => {
      console.log("Card data:", card);
      if (!card) {
        return (
          <View style={styles.card}>
            <Text style={styles.infoText}>
              조건에 해당하는 데이터가 없습니다.
            </Text>
          </View>
        );
      }

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
    },
    [items]
  );

  return (
    <View>
      {loading ? (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
          color="#6200ee"
        />
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
          stackSize={3}
          animateOverlayLabelsOpacity={true} // 카드 오버레이 레이블 투명도 애니메이션 활성화
          overlayLabels={{
            left: {
              element: (
                <MaterialCommunityIcons
                  name="close-circle"
                  size={100}
                  color="green"
                />
              ),
              title: "NOPE",
              style: {
                wrapper: styles.overlayLabelWrapperStyle,
              },
            },
            right: {
              element: (
                <MaterialCommunityIcons
                  name="heart-circle"
                  size={100}
                  color="#FF0080"
                />
              ),
              title: "LIKE",
              style: {
                wrapper: styles.overlayLabelWrapperStyle,
              },
            },
          }}
          horizontalThreshold={width / 10}
        />
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
  overlayLabelWrapperStyle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  activityIndicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});
