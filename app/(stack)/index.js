import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const EmergencyGuidelines = () => {
  return (
    <View
      style={{
        flex: 1,
        gap: 10,
        justifyContent: "start",
        alignItems: "center",
        marginTop: 15,
      }}
    >
      <Link
        href="(stack)/todos"
        style={{
          padding: 20,
          backgroundColor: "#ddd",
          width: "95%",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        <View style={styles.linkTitle}>
          <Ionicons name="bulb" size={24} color="#000" />
          <Text style={styles.headerText}>What To Do In An Emergency ?</Text>
        </View>
      </Link>
      <Link
        href="(stack)/kits"
        style={{
          padding: 20,
          backgroundColor: "#ddd",
          width: "95%",
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        <View style={styles.linkTitle}>
          <Ionicons name="list" size={24} color="#000" />
          <Text style={styles.headerText}>Emergency Kit Checklist</Text>
        </View>
      </Link>
      <Link
        href="(stack)/procedures"
        style={{
          padding: 20,
          backgroundColor: "#ddd",
          width: "95%",
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        <View style={styles.linkTitle}>
          <Ionicons name="walk" size={24} color="#000" />
          <Text style={styles.headerText}>Evacuation Procedures</Text>
        </View>
      </Link>
      {/* <Link
        href="(stack)/new"
        style={{
          padding: 20,
          backgroundColor: "#ddd",
          width: "95%",
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        Guideline 4
      </Link> */}
      {/* <Link
        href="(stack)/new"
        style={{
          padding: 20,
          backgroundColor: "#ddd",
          width: "95%",
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        Guideline 5
      </Link> */}
    </View>
  );
};

export default EmergencyGuidelines;

const styles = StyleSheet.create({
  linkTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ddd",
    width: "95%",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
  },
});
