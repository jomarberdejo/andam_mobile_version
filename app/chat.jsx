import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  Keyboard,
  Image,
} from "react-native";
import axios from "axios";

const ChatbotScreen = () => {
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [processing, setProcessing] = useState(false);

  const scrollViewRef = useRef();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", keyboardDidHide);
    // return () => {
    //   Keyboard.removeListener("keyboardDidShow", keyboardDidShow);
    //   Keyboard.removeListener("keyboardDidHide", keyboardDidHide);
    // };
  }, []);

  const keyboardDidShow = () => {
    Animated.timing(animatedValue, {
      toValue: 0.1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const keyboardDidHide = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) {
      return;
    }

    const updatedChatHistory = [
      ...chatHistory,
      { type: "user", message: inputText },
    ];
    setChatHistory(updatedChatHistory);

    try {
      setProcessing(true); // Start processing
      const response = await axios.post(
        "https://deep-learning-bqwr.onrender.com/predict",
        {
          message: inputText,
        }
      );

      const botResponse = response.data;

      const updatedChatHistoryWithBot = [
        ...updatedChatHistory,
        { type: "bot", message: botResponse.answer },
      ];
      setChatHistory(updatedChatHistoryWithBot);
    } catch (error) {
      console.error("There was an error sending the message:", error);
    } finally {
      setProcessing(false);
    }

    setInputText("");

    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.chatContainer}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        {chatHistory.map((chat, index) => (
          <View
            key={index}
            style={
              chat.type === "user"
                ? styles.userMessageContainer
                : styles.botMessageContainer
            }
          >
            <View style={styles.imageTextContainer}>
              {/* <Image
                source={{
                  uri: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTAPp4Cyx0uAkK3RupL-EZJ4z-BPsC01kCIoBIbfPlyW208WBn_",
                }}
                style={styles.icon}
              /> */}
              <Text style={styles.chatProfileName}>
                {chat.type === "user" ? "You: " : "Bot: "}
              </Text>
            </View>
            <View
              style={chat.type === "user" ? styles.userText : styles.botText}
            >
              <Text style={styles.messageText}>{chat.message}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <Animated.View
        style={[
          styles.inputContainer,
          {
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -100],
                }),
              },
            ],
          },
        ]}
      >
        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendMessage}
          disabled={processing}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  chatContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  userMessageContainer: {
    flexDirection: "column",
    alignSelf: "flex-end",
    maxWidth: "80%",
    marginVertical: 10,
  },
  botMessageContainer: {
    flexDirection: "column",
    alignSelf: "flex-start",
    maxWidth: "80%",
    marginVertical: 10,
  },
  imageTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  chatProfileName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#666",
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    backgroundColor: "#ccc",
    marginVertical: 5,
    marginRight: 10,
    padding: 10,
    borderRadius: 8,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderLeftWidth: 4,
    borderColor: "#666",
  },
  botText: {
    backgroundColor: "#ddd",
    marginVertical: 5,
    marginRight: 10,
    padding: 10,
    borderRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderLeftWidth: 4,
    borderColor: "#aaa",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#2196f3",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 5,
  },
});

export default ChatbotScreen;
