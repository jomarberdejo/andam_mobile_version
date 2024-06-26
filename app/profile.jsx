import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect } from "expo-router";

const Profile = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      contactNumber: "",
    },
  });

  const fetchUserData = async () => {
    try {
      console.log("Profile RuN");
      const userDataString = await AsyncStorage.getItem("userData");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setUserId(userData.id);
        setValue("fullName", userData.fullName);
        setValue("email", userData.email);
        setValue("contactNumber", userData.contactNumber);
        setAvatarUrl(userData?.imageIdentityUrl);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      setImageLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  const handleSaveChanges = async (formData) => {
    try {
      setProcessing(true);
      const updatedData = { ...formData, imageIdentityUrl: avatarUrl };

      const data = new FormData();
      data.append("fullName", updatedData.fullName);
      if (updatedData.email) {
        data.append("email", updatedData.email);
      }
      data.append("contactNumber", updatedData.contactNumber);
      if (avatarFile) {
        console.log(avatarFile);
        data.append("file", {
          uri: updatedData.imageIdentityUrl,
          name: "image.jpg",
          type: "image/jpeg",
        });
      }

      const response = await axios.put(
        // `${process.env.EXPO_PUBLIC_BACKEND_API_URL}/api/resident/${userId}`,
        `https://andam.onrender.com/api/resident/${userId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        await AsyncStorage.setItem("userData", JSON.stringify(response.data));
        Alert.alert("Success", "Changes saved successfully.");
      } else {
        throw new Error("Failed to update user data");
      }
    } catch (err) {
      console.error("Failed to save changes", err);
      Alert.alert("Error", "Failed to save changes. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handleUpdateImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      const { uri, type, fileName } = pickerResult.assets[0];
      setAvatarUrl(uri);
      setAvatarFile({
        uri,
        type: type || "image/jpeg",
        name: fileName || "avatar.jpg",
      });
    }
  };

  const confirmSaveChanges = (formData) => {
    Alert.alert(
      "Confirm Save",
      "Are you sure you want to save these changes?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => handleSaveChanges(formData),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={handleUpdateImage}
      >
        {imageLoading ? (
          <ActivityIndicator size="large" color="yellow" />
        ) : (
          <Image
            source={{ uri: avatarUrl }}
            style={styles.avatar}
            onLoad={() => setImageLoading(false)}
          />
        )}
        <View style={styles.editIconContainer}>
          <FontAwesome name="edit" size={24} color="white" />
        </View>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <Controller
          control={control}
          name="fullName"
          render={({ field }) => (
            <TextInput
              style={styles.input}
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Enter your full name"
            />
          )}
        />
        {errors.fullName && (
          <Text style={styles.error}>{errors.fullName.message}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextInput
              style={styles.input}
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <Controller
          control={control}
          name="contactNumber"
          render={({ field }) => (
            <TextInput
              style={styles.input}
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          )}
        />
        {errors.contactNumber && (
          <Text style={styles.error}>{errors.contactNumber.message}</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSubmit(confirmSaveChanges)}
      >
        {processing ? (
          <View style={styles.profileLoadingContainer}>
            <ActivityIndicator size="small" color="white" />
            <Text style={styles.saveButtonText}>Updating</Text>
          </View>
        ) : (
          <Text style={styles.saveButtonText}>Save Changes</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
  },
  avatarContainer: {
    marginBottom: 20,
    position: "relative",
  },
  avatar: {
    width: 320,
    height: 250,
    resizeMode: "cover",
    borderRadius: 4,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 5,
    borderRadius: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  error: {
    color: "red",
  },
  profileLoadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
});

export default Profile;
