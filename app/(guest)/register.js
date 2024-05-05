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
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../constants";
import * as ImagePicker from "expo-image-picker";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import axios from "axios";

const Register = () => {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState();
  const [processing, setProcessing] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    // console.log(process.env.EXPO_PUBLIC_BACKEND_API_URL);

    async function getAuth() {
      const userDataJson = await AsyncStorage.getItem("userData");
      if (userDataJson !== null) {
        const userData = JSON.parse(userDataJson);
        console.log(userData);
        if (userData.isAuthenticated) {
          router.push("/");
        }
      }
    }
    getAuth();
  }, []);

  const onSubmit = (data) => {
    const formData = {
      ...data,
      imageIdentityUrl: image,
    };

    setUserData(formData);

    setModalVisible(true);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
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
        setProcessing(true); // Set processing to true

        const formData = new FormData();
        formData.append("fullName", userData.fullName);
        formData.append("contactNumber", userData.contactNumber);
        formData.append("file", {
          uri: userData.imageIdentityUrl,
          name: "image.jpg",
          type: "image/jpeg",
        });

        const response = await fetch(
          process.env.EXPO_PUBLIC_BACKEND_API_URL + "/api/resident",
          {
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const data = await response.json();

        const newUserData = {
          ...userData,
          id: data?.resident.id,
        };

        const userDataWithTerms = {
          newUserData,
          termsAccepted: true,
          isAuthenticated: true,
        };

        if (response.status === 201) {
          await AsyncStorage.setItem(
            "userData",
            JSON.stringify(userDataWithTerms)
          );
          setModalVisible(false);
          router.push("/");
        } else {
          Alert.alert("Error", "Failed to register");
        }
      } catch (error) {
        console.error("Error registering:", error);
      } finally {
        setProcessing(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        To continue using our app ANDAM, please complete one-time registration.
        This is irreversible, ensure that it is accurate before proceeding.
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

      <Text style={styles.label}>
        Kindly provide evidence of your identity by uploading it.
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
              1. Acceptance of Terms: By using our app ANDAM, you agree to abide
              by the following terms and conditions.
              {"\n\n"}
              2. User Conduct: You agree not to engage in any unethical or
              illegal activities, including but not limited to spamming, pranks,
              or any other activities that may harm others.
              {"\n\n"}
              3. Data Privacy and Security: ANDAM is committed to ensuring the
              safety and privacy of your data. We implement strict security
              measures to protect your personal information and adhere to all
              relevant data protection regulations.
              {"\n\n"}
              4. Intellectual Property: All content and materials provided by
              ANDAM, including but not limited to text, images, logos, and
              software, are protected by intellectual property laws. You agree
              not to use, reproduce, or distribute any content from the app
              without prior authorization.
              {"\n\n"}
              5. Disclaimer of Warranties: ANDAM provides the app on an "as is"
              and "as available" basis, without any warranties or
              representations of any kind. We do not guarantee the accuracy,
              completeness, or reliability of any content or services provided
              through the app.
              {"\n\n"}
              6. Limitation of Liability: In no event shall ANDAM be liable for
              any indirect, incidental, special, or consequential damages
              arising out of or in any way connected with your use of the app.
              {"\n\n"}
              By checking the box below, you acknowledge that you have read,
              understood, and agree to abide by the above terms and conditions.
              {"\n\n"}
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
                  <Text style={styles.modalActionButtonText}>I agree</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
    fontSize: 14,
  },
});

export default Register;