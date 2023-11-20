import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { FB_DB } from "../FirebaseConfig";

// Function to send a message
export const sendMessage = async (roomId, message) => {
  try {
    const docRef = await addDoc(
      collection(FB_DB, "rooms", roomId, "messages"),
      {
        text: message,
        createdAt: new Date(),
        // Add other message properties as needed
      }
    );
    console.log("Message sent with ID: ", docRef.id);
  } catch (error) {
    console.error("Error sending message: ", error);
  }
};

// Function to listen for new messages
export const listenForMessages = (roomId, callback) => {
  const q = query(
    collection(FB_DB, "rooms", roomId, "messages"),
    orderBy("createdAt")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        // Handle new message
        const message = change.doc.data();
        callback(message);
      }
    });
  });

  return unsubscribe; // To stop listening, call this function
};
