import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SignButton from "../components/SignButton";
import SignForm from "../components/SignForm";
import { signIn, signUp } from "../lib/auth";
import { getUser } from "../lib/users";
import { useUserContext } from "../context/UserContext";

export default function SignInScreen({ navigation, route }) {
  const { isSignUp } = route.params || {};
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState();
  const { setUser } = useUserContext();
  const createChangeTextHandler = (name) => (value) => {
    setForm({ ...form, [name]: value });
  };
  const onSubmit = async () => {
    Keyboard.dismiss();
    const { email, password, confirmPassword } = form;

    if (isSignUp && password !== confirmPassword) {
      Alert.alert("실패", "비밀번호가 일치하지 않습니다.");
      console.log({ password, confirmPassword });
      return;
    }
    setLoading(true);
    const info = { email, password };
    console.log(form);

    try {
      const { user } = isSignUp ? await signUp(info) : await signIn(info);
      console.log(user);
      const profile = await getUser(user.uid);
      if (!profile) {
        navigation.navigate("Welcome", { uid: user.uid });
      } else {
        setUser(profile);
      }
    } catch (e) {
      const messages = {
        "auth/email-already-in-use": "이미 가입된 이메일입니다.",
        "auth/invalid-login-credentials": "이메일 또는 비밀번호가 틀렸습니다.",
        "auth/user-not-found": "존재하지 않는 계정입니다.",
        "auth/invalid-email": "유효하지 않은 이메일주소입니다.",
        "auth/weak-password": "비밀번호를 8자 이상 입력해주세요.",
        "auth/missing-password": "비밀번호를 입력해주세요.",
      };
      const msg = messages[e.code] || `${isSignUp ? "가입" : "로그인"} 실패`;
      console.log(e.code, msg);
      Alert.alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.KeyboardAvoidingView}
      behavior={Platform.select({ ios: "padding" })}
    >
      <SafeAreaView style={styles.fullscreen}>
        <Text style={styles.text}>Login</Text>
        <View style={styles.form}>
          <SignForm
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            form={form}
            createChangeTextHandler={createChangeTextHandler}
          />
          <SignButton
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            loading={loading}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  KeyboardAvoidingView: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
  form: {
    marginTop: 64,
    width: "100%",
    paddingHorizontal: 16,
  },
  buttons: {
    marginTop: 64,
  },
});
