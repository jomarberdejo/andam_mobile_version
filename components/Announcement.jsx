import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const Announcement = ({ agency }) => {
  const announcements = [
    {
      id: 1,
      title: "Important Announcement",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      title: "Reminder: Event Tomorrow",
      content: "Don't forget about our upcoming event!",
      timestamp: "1 day ago",
    },
    {
      id: 3,
      title: "New Feature Update",
      content: "Introducing exciting new features to our platform.",
      timestamp: "3 days ago",
    },
    {
      id: 4,
      title: "New Feature Update",
      content: "Introducing exciting new features to our platform.",
      timestamp: "3 days ago",
    },
    {
      id: 5,
      title: "New Feature Update",
      content: "Introducing exciting new features to our platform.",
      timestamp: "3 days ago",
    },
    {
      id: 6,
      title: "New Feature Update",
      content: "Introducing exciting new features to our platform.",
      timestamp: "3 days ago",
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.post}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{agency.toUpperCase()} Announcements</Text>
      <FlatList
        data={announcements}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  flatList: {
    flex: 1,
    width: "100%",
  },
  post: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 12,
    color: "#666666",
  },
});

export default Announcement;
