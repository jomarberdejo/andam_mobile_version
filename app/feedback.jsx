import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import { agencies } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Feedback = () => {
  const [open, setOpen] = useState(false);
  const [agency, setAgency] = useState(agencies[0].value);
  const [feedback, setFeedback] = useState("");
  const [userId, setUserId] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userDataJson = await AsyncStorage.getItem("userData");
        const userData = await JSON.parse(userDataJson);
        if (userData) {
          setUserId(userData.id);
        }
      } catch (error) {
        console.error("Error fetching userId:", error);
      }
    };

    fetchUserId();
  }, []);

  const handleSubmitFeedback = async () => {
    if (!agency || !feedback) {
      Alert.alert("Error", "Please select an agency and enter your feedback.");
      return;
    }

    Alert.alert(
      "Confirm Submission",
      `Are you sure you want to submit feedback for ${agency}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Submit",
          onPress: async () => {
            try {
              setProcessing(true);
              const response = await axios.post(
                // process.env.EXPO_PUBLIC_BACKEND_API_URL + "/api/feedback",
                `https://andam.onrender.com/api/feedback`,
                {
                  agency,
                  feedbackDetail: feedback,
                  residentId: userId,
                }
              );

              console.log("Feedback response:", response.data);

              setFeedback("");

              Alert.alert("Success", "Feedback submitted successfully!");
            } catch (error) {
              console.error("Error submitting feedback:", error);

              Alert.alert(
                "Error",
                "Failed to submit feedback. Please try again later."
              );
            } finally {
              setProcessing(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Give Feedback</Text>
      <Text style={styles.purpose}>
        Your feedback is valuable to us! It helps us improve our services and
        better serve our community Carigara, Leyte.
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
        placeholder="Select an agency"
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        dropDownStyle={styles.dropdownMenu}
      />
      <TextInput
        placeholder="Enter your feedback"
        style={styles.feedbackInput}
        multiline
        value={feedback}
        onChangeText={(text) => setFeedback(text)}
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmitFeedback}
        disabled={processing}
      >
        {processing ? (
          <View style={styles.submitLoadingContainer}>
            <ActivityIndicator size="small" color="yellow" />
            <Text style={styles.submitButtonText}>Submitting...</Text>
          </View>
        ) : (
          <Text style={styles.submitButtonText}>Submit Feedback</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  purpose: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: "#fafafa",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownMenu: {
    backgroundColor: "#fafafa",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
  },
  feedbackInput: {
    height: 150,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  submitLoadingContainer: {
    flexDirection: "row",
    alignItems: "center",

    gap: 5,
  },
});

export default Feedback;
