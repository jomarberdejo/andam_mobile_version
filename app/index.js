import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { useLocation } from "../context/LocationContext";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { agencies, backgroundImages, reportSchema } from "../constants";
import { ContactList } from "../components/ContactList";
import axios from "axios";
import { BACKEND_API_URL } from "react-native-dotenv";

const ReportForm = () => {
  const { location, loading } = useLocation();
  const [open, setOpen] = useState(false);
  const [agency, setAgency] = useState(agencies[0].value);
  const [submitting, setSubmitting] = useState(false);

  const defaultValues = {
    detail: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(reportSchema),
    defaultValues,
    mode: "onChange",
  });
  const onSubmit = (data) => {
    Alert.alert(
      "Confirm Submission",
      `Are you sure you want to submit the report for ${agency}?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Submit",
          onPress: async () => {
            try {
              setSubmitting(true);

              const userDataJson = await AsyncStorage.getItem("userData");

              const userData = JSON.parse(userDataJson);

              const { fullName, contactNumber } = userData.userData;

              const response = await axios.post(
                BACKEND_API_URL + "/api/report",
                {
                  name: fullName,
                  contact: contactNumber,
                  detail: data.detail,
                  agency,
                  location: location?.display_name,
                  latitude: parseFloat(location?.lat),
                  longitude: parseFloat(location?.lon),
                }
              );

              if (response.status === 201) {
                Alert.alert("Success", "Report submitted successfully");
                reset();
              } else {
                Alert.alert("Error", "Failed to submit report");
              }
            } catch (error) {
              // Alert.alert("Error", error.message);
              Alert.alert(
                "Exit the App",
                "Ensure that location and permission is enabled and you have internet connection. Please close the app and try again."
              );
            } finally {
              setSubmitting(false);
            }

            // console.log({
            //   ...data,
            //   location,
            // });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const getBackgroundImage = (agency) => {
    return backgroundImages[agency];
  };

  return (
    <>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="yellow" />
          <Text style={styles.loadingText}>Fetching your location...</Text>
        </View>
      )}
      <ImageBackground
        source={getBackgroundImage(agency)}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Text style={styles.formDescription}>
            Please fill in the following details to submit a report:
          </Text>

          <Text style={styles.label}>Select An Agency:</Text>
          <DropDownPicker
            open={open}
            value={agency}
            items={agencies.map((agency) => ({
              label: agency.label,
              value: agency.value,
            }))}
            setOpen={setOpen}
            setValue={setAgency}
            dropDownStyle={styles.dropdown}
          />
          <ScrollView>
            <Text style={styles.label}>Details:</Text>
            <Controller
              control={control}
              name="detail"
              render={({ field }) => (
                <View>
                  <TextInput
                    style={[styles.input, { minHeight: 100 }]}
                    placeholder="Brief details about the problem."
                    multiline
                    onChangeText={field.onChange}
                    value={field.value}
                    placeholderTextColor="rgba(255,255,255,0.7)"
                  />
                  {errors.detail && (
                    <Text style={styles.errorText}>
                      {errors.detail.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit(onSubmit)}
              disabled={submitting}
            >
              <View style={styles.buttonContent}>
                {submitting ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Icon name="plus" size={16} color="white" />
                )}
                <Text style={styles.submitButtonText}>
                  {submitting ? "Submitting..." : "Submit Report"}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.separator} />
            <View style={styles.contactContainer}>
              <ContactList selectedAgency={agency} />
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
  },

  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    zIndex: -1,
  },

  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "yellow",
  },

  formDescription: {
    fontSize: 18,
    fontWeight: "medium",
    marginVertical: 10,
    color: "white",
  },
  label: {
    marginVertical: 5,
    color: "#f5f5f5",
  },
  input: {
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 5,
    padding: 10,
    color: "white",
    borderRadius: 5,
    fontSize: 18,
  },

  submitButton: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 5,
  },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "white",
    marginTop: 40,
    marginBottom: 20,
  },
  contactContainer: {
    marginBottom: 10,
  },

  errorText: {
    color: "orange",
    marginBottom: 10,
  },
});

export default ReportForm;
