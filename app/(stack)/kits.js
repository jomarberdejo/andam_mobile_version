import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { kitCheckList } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const Kits = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {kitCheckList.content.map((kit, index) => (
          <View key={index} style={styles.item}>
            <Ionicons
              name={kit.icon}
              size={24}
              color="#000"
              style={styles.icon}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{kit.item}</Text>
              <Text style={styles.itemDescription}>{kit.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Kits;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical: 20,
    flex: 1,
    marginLeft: 5,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemDescription: {
    fontSize: 14,
  },
});
