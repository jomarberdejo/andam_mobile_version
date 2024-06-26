import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const agencies = [
  { name: "MDRRMO", reports: 15, icon: "ambulance" },
  { name: "PNP", reports: 10, icon: "local-police" },
  { name: "BFP", reports: 7, icon: "fire-extinguisher" },
  { name: "LGU", reports: 12, icon: "landmark" },
];

const Dashboard = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800, // Fade-in duration in milliseconds
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3, // Adjust the friction to control bounciness
        tension: 40, // Adjust the tension to control speed of animation
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  const animatedStyles = {
    opacity: fadeAnim,
    transform: [{ scale: scaleAnim }],
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Report Overview</Text>
        <Text style={styles.description}>
          View the total number of reports made for each agency.
        </Text>
      </View>
      <View style={styles.agenciesContainer}>
        {agencies.map((agency, index) => (
          <Animated.View key={index} style={[styles.agencyBox, animatedStyles]}>
            {agency.name !== "PNP" ? (
              <FontAwesome5
                name={agency.icon}
                size={40}
                color="#2f95dc"
                style={styles.icon}
              />
            ) : (
              <MaterialIcons
                name={agency.icon}
                size={40}
                color="#2f95dc"
                style={styles.icon}
              />
            )}
            <Text style={styles.agencyName}>{agency.name}</Text>
            <Text style={styles.reportCount}>{agency.reports} Reports</Text>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  agenciesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  agencyBox: {
    width: "45%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  icon: {
    marginBottom: 10,
  },
  agencyName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 5,
  },
  reportCount: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});

export default Dashboard;
