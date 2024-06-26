import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { kitCheckList } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const Kits = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {kitCheckList.content.map((kit, index) => (
        <View key={index} style={styles.item}>
          <View style={styles.iconContainer}>
            <Ionicons name={kit.icon} size={24} color="#007AFF" />
          </View>
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{kit.item}</Text>
            <Text style={styles.itemDescription}>{kit.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Kits;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  iconContainer: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 10,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});
