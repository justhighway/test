import React, { useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { sendMessage, listenForMessages } from "../lib/chat";

const Chatting = ({ route }) => {
  console.log("Chatting component rendered"); // Add this line

  const { roomId } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("useEffect called"); // Add this line

    // Start listening for messages when the component mounts
    const unsubscribe = listenForMessages(roomId, (newMessage) => {
      setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, newMessage)
      );
    });

    // Stop listening when the component unmounts
    return () => {
      console.log("useEffect cleanup"); // Add this line
      unsubscribe();
    };
  }, [roomId]);

  const onSend = async (newMessages = []) => {
    console.log("onSend called"); // Add this line

    if (newMessages.length > 0) {
      const { text } = newMessages[0];
      console.log("text:", text); // Add this line
      await sendMessage(roomId, text);
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{ _id: 1 }} // You can customize the user ID as needed
    />
  );
};

export default Chatting;
