import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const About = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>About ANDAM</Text>
        <Text style={styles.paragraph}>
          Welcome to our app! Here you can report emergencies and access
          important contact information for various agencies, and also resources
          for the safety of the community in Carigara, Leyte. Below are some
          guidelines on how to use the app effectively:
        </Text>
        <Text style={styles.subHeading}>
          <FontAwesome name="info-circle" size={20} color="black" /> How to Use
          the App
        </Text>
        <Text style={styles.paragraph}>
          1. Select the relevant agency from the dropdown menu.
        </Text>
        <Text style={styles.paragraph}>
          2. Your name and contact number are collected automatically and stored
          securely for future use. Please note that this information will be
          lost if you uninstall the app or clear its data.
        </Text>
        <Text style={styles.paragraph}>
          3. Check your location on the map before reporting to ensure accuracy.
          If the location is not accurate, include the location of the incident
          in the report details.
        </Text>
        <Text style={styles.paragraph}>
          4. Fill in the report details, including the nature of the emergency
          and any additional information required.
        </Text>
        <Text style={styles.paragraph}>
          5. Ensure location services are enabled on your device for accurate
          reporting. It's recommended to turn on location services before using
          the app.
        </Text>
        <Text style={styles.paragraph}>
          6. An active internet connection is required to submit reports through
          the app. If you do not have internet access, please call the selected
          agency directly using the provided number below.
        </Text>
        <Text style={styles.paragraph}>
          7. Once you've filled in all the necessary information, tap the
          "Submit Report" button.
        </Text>
        <Text style={styles.paragraph}>
          8. Confirm your submission when prompted.
        </Text>

        <Text style={styles.subHeading}>
          <FontAwesome name="map-marker" size={20} color="black" /> Navigating
          the App
        </Text>
        <Text style={styles.paragraph}>
          - Use the dropdown menu to switch between different agencies.
        </Text>
        <Text style={styles.paragraph}>
          - Input fields are provided for report details. Your name, contact
          number, current location, current date and time are automatically
          filled when reporting.
        </Text>
        <Text style={styles.paragraph}>
          - The "Submit Report" button is located at the bottom of the screen.
        </Text>
        <Text style={styles.subHeading}>
          <FontAwesome name="exclamation-circle" size={20} color="black" />{" "}
          Things to Consider
        </Text>
        <Text style={styles.paragraph}>
          - Make sure to provide accurate information in your report to ensure
          timely response from the concerned authorities.
        </Text>
        <Text style={styles.paragraph}>
          - If location service is on, your current location is automatically
          collected when you submit a report to provide accurate information to
          authorities. Rest assured that your privacy is our priority, and this
          location data is used solely for the purpose of your report.
        </Text>
        <Text style={styles.paragraph}>
          - If the location appears inaccurate, it may be due to factors such as
          slow internet connection or other environmental conditions. In such
          cases, please manually input the location of the incident in the
          report details to ensure accurate reporting
        </Text>
        <Text style={styles.paragraph}>
          - If something goes wrong during the reporting process or while
          obtaining location, try restarting the app for a smoother experience.
        </Text>
        <Text style={styles.paragraph}>
          - Please note that your registered information will be lost if you
          uninstall the app or clear its data.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    marginBottom: 10,
    lineHeight: 20,
    fontSize: 16,
  },
});

export default About;
