import { Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const NewLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Emergency Guidelines",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginRight: 35 }}
            >
              <MaterialIcons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="new"
        options={{
          headerTitle: "New",
        }}
      />
      <Stack.Screen
        name="todos"
        options={{
          headerTitle: "What To Do In An Emergency",
        }}
      />

      <Stack.Screen
        name="kits"
        options={{
          headerTitle: "Emergency Kits",
        }}
      />

      <Stack.Screen
        name="procedures"
        options={{
          headerTitle: "Evacuationn Procedures",
        }}
      />
    </Stack>
  );
};

export default NewLayout;
