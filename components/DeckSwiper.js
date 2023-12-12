// components/DeckSwiper.js
import React, { useState, useEffect } from "react";
import Swiper from "react-native-deck-swiper";
import { View, StyleSheet, Text, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { mapConditionToLabel } from "../lib/mapConditionToLabe";

const randomImagePaths = [
  require("../assets/airpods.jpeg"),
  require("../assets/ipad.jpeg"),
  require("../assets/iphone.jpeg"),
  require("../assets/macbook.jpeg"),
  require("../assets/max.jpeg"),
  require("../assets/mini.jpeg"),
];

export default function DeckSwiper({ similarItems }) {
  const [currentImageIndices, setCurrentImageIndices] = useState([
    0, 1, 2, 3, 4,
  ]);

  const changeImageIndex = (currentImageIndex) => {
    setCurrentImageIndices((prevIndices) => {
      const nextIndices = prevIndices.map(
        (index) => (index + 5) % randomImagePaths.length
      );
      return nextIndices;
    });
  };

  useEffect(() => {
    // 이미지가 모두 소진되었을 때 새로운 이미지 인덱스를 설정합니다.
    const getNextImageIndices = () => {
      const lastIndex = currentImageIndices[currentImageIndices.length - 1];
      const nextIndices = Array.from(
        { length: 5 },
        (_, index) => lastIndex + index + 1
      );
      return nextIndices;
    };

    setCurrentImageIndices((prevIndices) => {
      const nextIndices = getNextImageIndices();
      return [...prevIndices.slice(1), ...nextIndices];
    });
  }, [similarItems]);

  return (
    <View style={styles.container}>
      <Swiper
        cards={similarItems}
        renderCard={(card, index) => {
          const currentIndex = currentImageIndices[index % 5];
          const currentImagePath = randomImagePaths[currentIndex];

          return (
            <View style={styles.card}>
              <View style={styles.imageContainer}>
                <Image source={currentImagePath} style={styles.image} />
                <View style={styles.overlayTextContainer}>
                  <Text style={styles.text}>{card.name}</Text>
                  <Text style={styles.text}>가격: {card.price}원</Text>
                  <Text style={styles.text}>컨디션: {card.condition}급</Text>
                  <Text style={styles.text}>
                    유사도: {card.similarity.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        onSwiped={(index) => changeImageIndex(currentImageIndices[index + 1])}
        onSwipedAll={() => {
          console.log("onSwipedAll");
        }}
        cardIndex={0}
        backgroundColor={"white"}
        stackSize={3}
        infinite={true}
        stackSeparation={13}
        cardHorizontalMargin={10}
        cardVerticalMargin={100}
        marginBottom={120}
        animateOverlayLabelsOpacity={true}
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
      ></Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    backgroundColor: "white",
  },
  overlayLabelWrapperStyle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    width: 350,
    height: 100,
  },
  overlayTextContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 텍스트를 위한 배경
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});
