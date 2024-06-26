import React, { useState, useCallback, useEffect } from "react";
import { StatusBar, Text, View, StyleSheet } from "react-native";
import { LocationProvider } from "../context/LocationContext";
import { Drawer } from "expo-router/drawer";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import CustomDrawer from "../components/CustomDrawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Layout = () => {
  useEffect(() => {
    const getIsAuthenticated = async () => {
      try {
        const userDataJson = await AsyncStorage.getItem("userData");
        const userData = JSON.parse(userDataJson);

        if (userData) {
          router.push("reports");
          console.log(userData);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    console.log("Run");
    getIsAuthenticated();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar hidden />
      <LocationProvider>
        <Drawer
          drawerContent={(props) => <CustomDrawer {...props} />}
          screenOptions={{
            // headerRight: () => (
            //   <View style={styles.avatarContainer}>
            //     <Text style={styles.avatarText}>{currentUserName}</Text>
            //   </View>
            // ),

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
              drawerLabel: "Login",
              headerShown: false,
              headerTitle: "Login",
              drawerItemStyle: {
                display: "none",
              },
              drawerStyle: {
                display: "none",
              },
              overlayColor: "transparent",
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
            name="register"
            options={{
              drawerLabel: "Register",
              headerShown: false,
              headerTitle: "Register",
              drawerItemStyle: {
                display: "none",
              },
              drawerStyle: {
                display: "none",
              },
              overlayColor: "transparent",
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
            name="reports"
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
            name="dashboard"
            options={{
              drawerLabel: "Dashboard",
              headerTitle: "Dashboard",
              drawerIcon: ({ size, color, focused }) => (
                <Ionicons
                  name={`${focused ? "trending-up" : "trending-up-outline"}`}
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

          <Drawer.Screen
            name="(tabs)"
            options={{
              drawerLabel: "Announcements",
              headerTitle: "Announcements",
              drawerIcon: ({ size, color, focused }) => (
                <MaterialCommunityIcons
                  name={`${focused ? "bullhorn" : "bullhorn-outline"}`}
                  size={size}
                  color={color}
                />
              ),
            }}
          />

          <Drawer.Screen
            name="feedback"
            options={{
              drawerLabel: "Feedback",
              headerTitle: "Feedback",
              drawerIcon: ({ size, color, focused }) => (
                <Ionicons
                  name={`${focused ? "chatbubbles" : "chatbubbles-outline"}`}
                  size={size}
                  color={color}
                />
              ),
            }}
          />

          <Drawer.Screen
            name="chat"
            options={{
              drawerLabel: "Ask & Learn",
              headerTitle: "Ask & Learn",
              headerShown: true,
              drawerIcon: ({ size, color, focused }) => (
                <MaterialIcons
                  name={`${focused ? "support-agent" : "support-agent"}`}
                  size={size}
                  color={color}
                />
              ),
              drawerItemStyle: {
                display: "block",
              },
            }}
          />

          <Drawer.Screen
            name="profile"
            options={{
              drawerLabel: "Profile",
              headerTitle: "Profile",
              drawerIcon: ({ size, color, focused }) => (
                <Ionicons
                  name={`${
                    focused ? "person-circle" : "person-circle-outline"
                  }`}
                  size={size}
                  color={color}
                />
              ),
            }}
          />

          <Drawer.Screen
            name="about"
            options={{
              drawerLabel: "About",
              headerTitle: "About",
              drawerIcon: ({ size, color, focused }) => (
                <MaterialIcons
                  name={`${focused ? "info" : "info-outline"}`}
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

const styles = StyleSheet.create({
  avatarContainer: {
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default Layout;
