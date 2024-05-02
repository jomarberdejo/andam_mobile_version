import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import React from "react";
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
    width: 130,
    height: 130,
    alignSelf: "center",
    borderRadius: 50,
    marginTop: 35,
  },
  sidebarContainer: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  sidebarTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    color: "gray",
    paddingVertical: 20,
  },
  footerContainer: {
    borderTopWidth: 1,
    borderColor: "#ccc",
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  footerContent: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  agencyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  agencyLogo: {
    width: 40,
    height: 40,
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
