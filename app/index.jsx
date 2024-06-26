import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ToastAndroid,
  ImageBackground,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../constants";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  // useEffect(() => {
  //   console.log(process.env.EXPO_PUBLIC_BACKEND_API_URL);

  //   async function getAuth() {
  //     try {
  //       const userDataJson = await AsyncStorage.getItem("userData");

  //       const userData = JSON.parse(userDataJson);
  //       console.log(userData);
  //       if (userData) {
  //         router.push("reports");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getAuth();
  // }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setProcessing(true);
      const response = await axios.post(
        // process.env.EXPO_PUBLIC_BACKEND_API_URL + "/api/resident/login",
        "https://andam.onrender.com/api/resident/login",
        data
      );
      const userData = await response.data;

      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      reset();
      router.push("reports");
      ToastAndroid.show(`Logged In As ${userData.fullName}`, ToastAndroid.LONG);
    } catch (error) {
      console.error(error.response.data.error);
      Alert.alert("Error", error.response.data.error);
    } finally {
      setProcessing(false);
    }
  };

  const handleRegister = () => {
    router.push("register");
  };

  return (
    <ImageBackground
      source={require("../assets/images/carigara-logo.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.loginForm}>
            <Text style={styles.description}>
              Welcome to ANDAM - Reporting Platform for Carigara, Leyte
            </Text>
            {/* <Text style={styles.title}>Login</Text> */}
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  onChangeText={field.onChange}
                  value={field.value}
                />
              )}
            />
            {errors.username && (
              <Text style={styles.error}>{errors.username.message}</Text>
            )}

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

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit(onSubmit)}
              disabled={processing}
            >
              {processing ? (
                <View style={styles.loginLoadingContainer}>
                  <ActivityIndicator size="small" color="yellow" />
                  <Text style={styles.buttonText}>
                    Authenticating, please wait...
                  </Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerText}>
                Don't have an account? Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  formContainer: {
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  description: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },
  // title: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   marginBottom: 20,
  //   textAlign: "center",
  //   color: "white",
  // },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "white",
    borderRadius: 5,
  },
  error: {
    color: "yellow",
    marginBottom: 10,
    textAlign: "left",
  },
  submitButton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    textAlign: "center",
    marginTop: 10,
    color: "white",
    textDecorationLine: "underline",
  },
  loginLoadingContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Login;
