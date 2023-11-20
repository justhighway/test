// lib/auth.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { FB_AUTH } from "../FirebaseConfig";

const auth = FB_AUTH;
const USER_KEY = "user";

export function signIn({ email, password }) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signUp({ email, password }) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function subscribeAuth(callback) {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem(USER_KEY);
      }
      callback(user);
      resolve(); // Promise를 해결하여 호출자가 기다리도록 함
    });
  });
}

export function signOutt() {
  AsyncStorage.removeItem(USER_KEY);
  return signOut(auth);
}

export async function getStoredUser() {
  const userJson = await AsyncStorage.getItem(USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
}

export function getUserId() {
  const user = getStoredUser();
  return user ? user.uid : null;
}
