import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, termsAndConditionsText } from "../constants";
import * as ImagePicker from "expo-image-picker";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import axios from "axios";

const Register = () => {
  const [image, setImage] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState();
  const [processing, setProcessing] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      contactNumber: "",
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    console.log(process.env.EXPO_PUBLIC_BACKEND_API_URL);

    async function getAuth() {
      const userDataJson = await AsyncStorage.getItem("userData");
      if (userDataJson != null) {
        const userData = await JSON.parse(userDataJson);
        console.log(userData);
        if (userData) {
          router.push("reports");
        }
      }
    }
    getAuth();
  }, []);

  const onSubmit = (data) => {
    if (!image) {
      Alert.alert(
        "Failed",
        "Please upload an image of your identity, it may be your VALID ID, PHOTO, etc.",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: false }
      );
      return;
    }
    const formData = {
      ...data,
      imageIdentityUrl: image,
    };

    setUserData(formData);

    setModalVisible(true);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const toggleTermsAccepted = () => {
    setTermsAccepted(!termsAccepted);
  };

  const handleAgreement = async () => {
    if (processing) return;

    if (!termsAccepted) {
      Alert.alert(
        "Terms and Conditions",
        "Please agree to the terms and conditions",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: false }
      );
    } else {
      try {
        setProcessing(true);

        const formData = new FormData();
        formData.append("fullName", userData.fullName);
        formData.append("contactNumber", userData.contactNumber);
        formData.append("username", userData.username);
        formData.append("password", userData.password);
        formData.append("file", {
          uri: userData.imageIdentityUrl,
          name: "image.jpg",
          type: "image/jpeg",
        });

        const response = await axios.post(
          // process.env.EXPO_PUBLIC_BACKEND_API_URL + "/api/resident/register",
          "https://andam.onrender.com/api/resident/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const data = await response.data;

        // const newUserData = {
        //   ...userData,
        //   id: data?.resident.id,
        // };

        if (response.status === 201) {
          // await AsyncStorage.setItem("userData", JSON.stringify(newUserData));
          setModalVisible(false);
          reset();
          setImage(null);
          router.push("/");

          ToastAndroid.show(
            "Account Succesfully Registered!",
            ToastAndroid.LONG
          );
          // getCurrentLocation();
        } else {
          Alert.alert("Error", "Failed to register");
        }
      } catch (error) {
        console.error("Error registering:", error);
        Alert.alert(
          "Error",
          "Failed to register, make sure you have internet connection available."
        );
      } finally {
        setProcessing(false);
      }
    }
  };

  const handleRegister = () => {
    router.push("/");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>
          To continue using our app ANDAM, please complete one-time
          registration. Ensure that it is accurate before proceeding.
        </Text>

        <Text style={styles.label}>Full Name:</Text>
        <Controller
          control={control}
          name="fullName"
          render={({ field }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
        />

        {errors.fullName && (
          <Text style={styles.error}>{errors.fullName.message}</Text>
        )}
        <Text style={styles.label}>Contact Number:</Text>
        <Controller
          control={control}
          name="contactNumber"
          render={({ field }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter your contact number"
              onChangeText={field.onChange}
              value={field.value}
              keyboardType="phone-pad"
            />
          )}
        />

        {errors.contactNumber && (
          <Text style={styles.error}>{errors.contactNumber.message}</Text>
        )}

        <Text style={styles.label}>Username:</Text>
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter your unique username."
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
        />

        {errors.username && (
          <Text style={styles.error}>{errors.username.message}</Text>
        )}
        <Text style={styles.label}>Password:</Text>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={field.onChange}
              value={field.value}
              secureTextEntry={true}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}
        <Text style={styles.label}>
          Kindly provide evidence of your identity by uploading it. (Example. ID
          PICTURE, YOUR PHOTO)
        </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
        </View>

        {image && <Image source={{ uri: image }} style={styles.image} />}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.loginText}>Have an account? Login</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <ScrollView style={styles.modalContent}>
              <Text style={styles.modalTitle}>Terms and Conditions</Text>

              <Text style={styles.modalText}>
                {termsAndConditionsText}
                <View style={styles.checkboxContainer}>
                  <BouncyCheckbox
                    isChecked={termsAccepted}
                    text="I acknowledge that I have read, understood, and agree to abide by the terms and conditions of using ANDAM."
                    textStyle={styles.checkboxText}
                    fillColor="blue"
                    onPress={toggleTermsAccepted}
                  />
                </View>
                {"\n\n"}
                <View style={styles.modalActions}>
                  <Pressable
                    style={styles.modalActionButton}
                    onPress={handleAgreement}
                    disabled={processing}
                  >
                    <Text style={styles.modalActionButtonText}>
                      {processing && (
                        <ActivityIndicator size={12} color="yellow" />
                      )}{" "}
                      I agree
                    </Text>
                  </Pressable>
                  <Pressable
                    style={styles.modalActionButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.modalActionButtonText}>Close</Text>
                  </Pressable>
                </View>
                {"\n\n"}
              </Text>
            </ScrollView>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  loginText: {
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 5,
    resizeMode: "cover",
  },

  checkboxContainer: {
    marginVertical: 10,
  },
  checkboxText: {
    width: 240,
    fontSize: 14,
    textDecorationLine: "none",
  },
  submitButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 10,
  },
  modalActions: {
    display: "flex",
    gap: 10,
    alignItems: "center",

    flexDirection: "row",
  },
  modalActionButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },

  modalActionButtonText: {
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
    fontSize: 14,
  },
});

export default Register;
