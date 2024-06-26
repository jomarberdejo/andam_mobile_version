import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export const useAuth = (setCurrentUserName) => {
  const router = useRouter();

  const getIsAuthenticated = async () => {
    try {
      const userDataJson = await AsyncStorage.getItem("userData");
      const userData = JSON.parse(userDataJson);
      const firstTwoLetters = userData?.fullName.slice(0, 2).toUpperCase();
      setCurrentUserName(firstTwoLetters);
      if (userData) {
        router.push("reports");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error retrieving isAuthenticated:", error);
    }
  };

  return getIsAuthenticated;
};
