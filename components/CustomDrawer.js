import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import sidebarLogo from "../assets/images/carigara-logo.png";
import lgulogo from "../assets/images/lgu-cover.jpg";
import mdrrmologo from "../assets/images/mdrr-cover.jpg";
import pnplogo from "../assets/images/pnp-cover.jpg";
import bfplogo from "../assets/images/bfp-cover.png";

const CustomDrawer = (props) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchCurrUserName = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("userData");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          if (userData.newUserData && userData.newUserData.fullName) {
            setUserName(userData.newUserData.fullName);
          }
        }
      } catch (error) {
        console.error("Error fetching name:", error);
      }
    };

    fetchCurrUserName();
  }, []);

  const openFacebookPage = (url) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <View>
          <Image source={sidebarLogo} style={styles.drawerLogo} />
        </View>
        <View style={styles.sidebarContainer}>
          <Text style={styles.sidebarTitle}>ANDAM</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.footerContainer}>
        <Text style={styles.footerContent}>
          Hi there,{" "}
          <Text style={styles.currUserName}>
            {userName ? `${userName}` : "Guest"}!
          </Text>
        </Text>
        <Text style={styles.footerInfo}>
          For more information, please visit:
        </Text>
        <View style={styles.agencyContainer}>
          <TouchableOpacity
            onPress={() =>
              openFacebookPage("https://www.facebook.com/lgucarigara/")
            }
          >
            <Image source={lgulogo} style={styles.agencyLogo} />
          </TouchableOpacity>
          <Text style={styles.agencyInfo}>
            LGU:
            <Text
              style={styles.facebookLink}
              onPress={() =>
                openFacebookPage("https://www.facebook.com/lgucarigara/")
              }
            >
              Facebook
            </Text>
          </Text>
        </View>
        <View style={styles.agencyContainer}>
          <TouchableOpacity
            onPress={() =>
              openFacebookPage("https://www.facebook.com/mdrrmocarigara/")
            }
          >
            <Image source={mdrrmologo} style={styles.agencyLogo} />
          </TouchableOpacity>
          <Text style={styles.agencyInfo}>
            MDRRMO:
            <Text
              style={styles.facebookLink}
              onPress={() =>
                openFacebookPage("https://www.facebook.com/mdrrmocarigara/")
              }
            >
              Facebook
            </Text>
          </Text>
        </View>
        <View style={styles.agencyContainer}>
          <TouchableOpacity
            onPress={() =>
              openFacebookPage("https://www.facebook.com/PNPCarigara/")
            }
          >
            <Image source={pnplogo} style={styles.agencyLogo} />
          </TouchableOpacity>
          <Text style={styles.agencyInfo}>
            PNP:
            <Text
              style={styles.facebookLink}
              onPress={() =>
                openFacebookPage("https://www.facebook.com/PNPCarigara/")
              }
            >
              Facebook
            </Text>
          </Text>
        </View>
        <View style={styles.agencyContainer}>
          <TouchableOpacity
            onPress={() =>
              openFacebookPage("https://www.facebook.com/BFPCarigara/")
            }
          >
            <Image source={bfplogo} style={styles.agencyLogo} />
          </TouchableOpacity>
          <Text style={styles.agencyInfo}>
            BFP:
            <Text
              style={styles.facebookLink}
              onPress={() =>
                openFacebookPage("https://www.facebook.com/BFPCarigara/")
              }
            >
              Facebook
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  drawerLogo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    borderRadius: 50,
    marginTop: 15,
  },
  sidebarContainer: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 5,
  },
  sidebarTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    color: "green",
    paddingVertical: 20,
  },
  footerContainer: {
    borderTopWidth: 1,
    borderColor: "#ccc",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  footerContent: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 5,
    paddingVertical: 2,
  },
  footerInfo: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 20,
    paddingVertical: 2,
  },
  currUserName: {
    fontWeight: "thin",
    fontSize: 18,
    color: "green",
    fontStyle: "italic",
  },
  agencyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  agencyLogo: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  agencyInfo: {
    fontSize: 16,
  },
  facebookLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default CustomDrawer;
