import React, { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import sidebarLogo from "../assets/andam_logo.png";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const CustomDrawer = (props) => {
  const handleLogout = async () => {
    try {
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Logout",
            onPress: async () => {
              await AsyncStorage.removeItem("userData");
              router.push("/");
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} scrollEnabled={true}>
        <View style={styles.logoContainer}>
          <Image source={sidebarLogo} style={styles.drawerLogo} />
        </View>

        <DrawerItemList {...props} />

        <TouchableOpacity style={styles.logoutContainer} onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color="rgba(28,28,30,0,0.68)"
          />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  drawerLogo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  sidebarContainer: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logoContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    marginTop: 10,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "rgba(28,28,30,0,0.68)",
  },
});

export default CustomDrawer;
