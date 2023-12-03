import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Swiper from "react-native-deck-swiper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function DeckSwiper() {
  return (
    <View style={styles.container}>
      <Swiper
        cards={["DO", "MORE", "OF", "WHAT", "MAKES", "YOU", "HAPPY"]}
        renderCard={(card) => {
          return (
            <View style={styles.card}>
              <Text style={styles.text}>{card}</Text>
            </View>
          );
        }}
        onSwiped={(cardIndex) => {
          console.log(cardIndex);
        }}
        onSwipedAll={() => {
          console.log("onSwipedAll");
        }}
        cardIndex={0}
        backgroundColor={"white"}
        stackSize={3}
        infinite={true}
        stackSeparation={13}
        cardHorizontalMargin={10}
        marginBottom={30}
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
    justifyContent: "center",
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
  },
  overlayLabelWrapperStyle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
