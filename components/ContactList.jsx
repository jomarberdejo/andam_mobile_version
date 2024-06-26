import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

export const ContactList = ({ selectedAgency }) => {
  const [contactNumbers, setContactNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(process.env.EXPO_PUBLIC_BACKEND_API_URL);
    const fetchContacts = async () => {
      try {
        setLoading(true);
        // const res = await axios.get(process.env.EXPO_PUBLIC_BACKEND_API_URL + "/api/contact");
        const res = await axios.get("https://andam.onrender.com/api/contact");

        const contactData = await res.data;
        const agencyMap = contactData?.reduce((acc, curr) => {
          acc[curr.agency] = curr.number;
          return acc;
        }, {});
        setContactNumbers(agencyMap);
      } catch (error) {
        console.error("Error fetching contacts:", error.message);

        setContactNumbers({
          BFP: ["09951486428"],
          LGU: ["09511840322"],
          PNP: ["09985986491"],
          MDRRMO: ["09498608899"],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  console.log(contactNumbers[selectedAgency]);

  const handleCall = (number) => {
    Alert.alert(
      "Confirm Call",
      `Are you sure you want to call ${number}?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Call",
          onPress: () => Linking.openURL(`tel:${number}`),
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View>
      <Text style={styles.contactListDescription}>
        Or you can call their number:
      </Text>

      <TouchableOpacity
        onPress={() => handleCall(contactNumbers[selectedAgency])}
        style={styles.contactItem}
        disabled={loading}
      >
        <Icon name="phone" size={16} color="white" />
        <Text style={styles.contactItemText}>
          {contactNumbers[selectedAgency]}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contactListDescription: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "medium",
    color: "white",
  },
  contactItem: {
    marginBottom: 5,
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  contactItemText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
