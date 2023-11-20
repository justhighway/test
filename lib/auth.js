// lib/auth.js

import { FB_AUTH } from "../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export function signIn({ email, password }) {
  return signInWithEmailAndPassword(FB_AUTH, email, password);
}

export function signUp({ email, password }) {
  return createUserWithEmailAndPassword(FB_AUTH, email, password);
}

export function subscribeAuth(callback) {
  return onAuthStateChanged(FB_AUTH, async (user) => {
    callback(user);
  });
}

export function signOutt() {
  return signOut(FB_AUTH);
}
