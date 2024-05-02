import React, { useState, useEffect } from "react";
import { StatusBar, ActivityIndicator } from "react-native";
import { LocationProvider } from "../context/LocationContext";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomDrawer from "../components/CustomDrawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Layout = () => {
  const router = useRouter();
  const getIsAuthenticated = async () => {
    try {
      const userDataJson = await AsyncStorage.getItem("userData");

      const userData = JSON.parse(userDataJson);
      console.log(userData);
      if (!userData) {
        router.push("(guest)/login");
      }
    } catch (error) {
      console.error("Error retrieving isAuthenticated:", error);
    }
  };

  useEffect(() => {
    getIsAuthenticated();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar hidden />
      <LocationProvider>
        <Drawer
          drawerContent={(props) => <CustomDrawer {...props} />}
          screenOptions={{
            drawerActiveBackgroundColor: "#5363df",
            drawerActiveTintColor: "#fff",
            drawerLabelStyle: {
              marginLeft: -20,
            },
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: "Emergency Reports",
              headerTitle: "Emergency Reports",
              drawerIcon: ({ size, color, focused }) => (
                <MaterialCommunityIcons
                  name={`${focused ? "file" : "file-outline"}`}
                  size={size}
                  color={color}
                />
              ),
            }}
          />

          <Drawer.Screen
            name="map"
            options={{
              drawerLabel: "Maps",
              headerTitle: "Maps",
              drawerIcon: ({ size, color, focused }) => (
                <Ionicons
                  name={`${focused ? "location" : "location-outline"}`}
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="(guest)/login"
            options={{
              drawerLabel: "Register",
              headerShown: false,
              headerTitle: "Register",

              drawerItemStyle: {
                display: "none",
              },
              drawerIcon: ({ size, color, focused }) => (
                <Ionicons
                  name={`${focused ? "person" : "person-outline"}`}
                  size={size}
                  color={color}
                />
              ),
            }}
          />

          <Drawer.Screen
            name="(stack)"
            options={{
              drawerLabel: "Emergency Guidelines",
              headerShown: false,
              headerTitle: "Emergency Guidelines",
              drawerIcon: ({ size, color, focused }) => (
                <Ionicons
                  name={`${focused ? "list" : "list-outline"}`}
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        </Drawer>
      </LocationProvider>
    </GestureHandlerRootView>
  );
};

export default Layout;
