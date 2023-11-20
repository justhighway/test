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
import { collection, getDocs } from "firebase/firestore";
import { FB_DB } from "../FirebaseConfig";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function DeckSwiper() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = Dimensions.get("window");

  const fetchData = useCallback(async () => {
    try {
      if (currentIndex === 0) {
        setLoading(true);
      }

      const userUploadedItemIDs =
        user && user.userUploadedItemID ? user.userUploadedItemID : [];

      const itemsCollection = collection(FB_DB, "items");
      const itemsSnapshot = await getDocs(itemsCollection);

      const itemsData = [];

      itemsSnapshot.forEach((doc) => {
        const data = doc.data();
        // 사용자가 업로드한 물건만 필터링
        if (userUploadedItemIDs.includes(doc.id)) {
          itemsData.push({
            id: doc.id,
            ...data,
          });
        }
      });

      setItems((prevItems) => [...prevItems, ...itemsData]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [currentIndex, user]);

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
