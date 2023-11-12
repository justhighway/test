import { FB_AUTH } from "../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
const auth = FB_AUTH;

export function signIn({ email, password }) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signUp({ email, password }) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function subscribeAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

export function signOutt() {
  return signOut(auth);
}
