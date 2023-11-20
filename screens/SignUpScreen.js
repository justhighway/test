// screens/SignUpScreen.js

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserContext } from "../context/UserContext";
import { signUp } from "../lib/auth";
import { createUser } from "../lib/users";

const SignUpScreen = ({ navigation }) => {
  const { setUser } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const userCredential = await signUp({ email, password });
      setUser(userCredential.user);

      const { uid } = userCredential.user; // 현재 로그인한 사용자의 'uid'를 가져옵니다.

      // createUser 함수 호출 시 'uid' 값을 전달합니다.
      await createUser({
        userEmail: email,
        userNickname: "",
        userProfilePic: "",
        userCategory: [],
        uid: uid, // 'uid'를 전달합니다.
      });

      navigation.navigate("GetUserCategory");
      console.log("유저 정보 생성됨:", userCredential.user.uid);
    } catch (error) {
      console.error("Sign Up Error:", error.message);
      // Handle error (e.g., show error message to user)
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <SafeAreaView style={styles.fullscreen}>
        <View>
          <Text>Sign Up</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="email"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <TextInput
          ref={passwordRef}
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          returnKeyType="done" // 엔터 키를 누를 때 '완료'로 설정
          onSubmitEditing={handleSignUp}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: "8%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 14,
  },
  button: {
    width: "80%",
    height: "8%",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
  },
});

export default SignUpScreen;
