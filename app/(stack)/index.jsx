import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const EmergencyGuidelines = () => {
  return (
    <View style={styles.container}>
      <Link href="(stack)/todos" style={styles.link}>
        <View style={styles.linkContent}>
          <Ionicons name="bulb" size={24} color="#007AFF" />
          <Text style={styles.linkText}>What To Do In An Emergency?</Text>
        </View>
      </Link>
      <Link href="(stack)/kits" style={styles.link}>
        <View style={styles.linkContent}>
          <Ionicons name="list" size={24} color="#4CD964" />
          <Text style={styles.linkText}>Emergency Kit Checklist</Text>
        </View>
      </Link>
      <Link href="(stack)/procedures" style={styles.link}>
        <View style={styles.linkContent}>
          <Ionicons name="walk" size={24} color="#FF9500" />
          <Text style={styles.linkText}>Evacuation Procedures</Text>
        </View>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
  },
  link: {
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
  linkContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  linkText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 15,
  },
});

export default EmergencyGuidelines;
