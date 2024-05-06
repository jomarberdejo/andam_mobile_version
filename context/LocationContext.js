import React, { createContext, useState, useContext, useEffect } from "react";
import { Alert, Platform, Linking } from "react-native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  Accuracy,
} from "expo-location";
import axios from "axios";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLoading(false);
        Alert.alert(
          "Location permission not granted",
          "Please allow location permission for better user experience.",
          [
            {
              text: "OK",
              onPress: () => {
                if (Platform.OS === "android") {
                  Linking.openSettings();
                } else {
                  Alert.alert(
                    "Enable Location Services",
                    "Please go to Settings > Privacy > Location Services and enable location for this app."
                  );
                }
              },
            },
          ]
        );
        return null;
      }
      const options = {
        accuracy: Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 10,
      };

      const location = await getCurrentPositionAsync(options);
      const { latitude, longitude } = location?.coords;

      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en&zoom=18`
      );

      const address = await response?.data;
      console.log(address);

      // const formattedAddress = [
      //   address?.neighbourhood,
      //   address?.road,
      //   address?.village,
      //   address?.town,
      //   address?.region,
      //   address?.state,
      //   address?.postcode,
      //   address?.country,
      // ]
      //   ?.filter(Boolean)
      //   ?.join(", ");

      setLocation(address);
      setLoading(false);
    } catch (error) {
      console.log(JSON.stringify(error));

      setError(error);
      setLoading(false);

      if (error.code === "E_LOCATION_SERVICES_DISABLED") {
        Alert.alert(
          "Location services disabled",
          "Please enable location services to use this app."
        );
      } else if (error.code === "E_LOCATION_TIMEOUT") {
        Alert.alert(
          "Location fetch timeout",
          "Failed to fetch location. Please try again later."
        );
      } else if (error.code === "E_LOCATION_SETTINGS_UNSATISFIED") {
        throw new Error(
          "Error Reporting, Please make sure to turn on your location to continue reporting."
        );
      } else {
        Alert.alert("Error", "Failed to fetch location.");
      }
    }
  };

  return (
    <LocationContext.Provider value={{ location, loading, error }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  // if (!context) {
  //   throw new Error("Location TEST ERROR");
  // }
  return context;
};
