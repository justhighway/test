import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import DeckSwiper from "../../components/DeckSwiper";
import { useUserContext } from "../../context/UserContext";
import { FB_AUTH } from "../../FirebaseConfig";

export default function HomeScreen() {
  const { user } = useUserContext();

  useEffect(() => {
    // 로그인 상태 확인
    const currentUser = FB_AUTH.currentUser;
    if (currentUser) {
      // 사용자가 로그인되어 있을 때 현재 사용자의 UID 출력
      const userId = currentUser.uid;
      console.log("현재 사용자의 UID:", userId);
    } else {
      // 사용자가 로그인되어 있지 않을 때
      console.log("사용자가 로그인되어 있지 않습니다.");
    }

    // 필요하다면 여기에 추가적인 작업 수행 가능

    return () => {
      // 컴포넌트가 언마운트 될 때 정리 작업 수행 가능
    };
  }, []); // 빈 배열을 전달하여 마운트 시에만 실행

  return (
    <>
      {user && user.userUploadedItemID && user.userUploadedItemID.length > 0 ? (
        <DeckSwiper />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>물건을 업로드 해주세요.</Text>
        </View>
      )}
    </>
  );
}
