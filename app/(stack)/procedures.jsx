import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { evacuationProcedure } from "../../constants";

const dummyImages = {
  Routes: [
    require("../../assets/images/bfp-cover.png"),
    require("../../assets/images/bfp-cover.png"),
    require("../../assets/images/bfp-cover.png"),
  ],
  Meet: [
    require("../../assets/images/bfp-cover.png"),
    require("../../assets/images/bfp-cover.png"),
    require("../../assets/images/bfp-cover.png"),
  ],
  Communication: [
    require("../../assets/images/bfp-cover.png"),
    require("../../assets/images/bfp-cover.png"),
    require("../../assets/images/bfp-cover.png"),
  ],
};

const EvacuationProcedure = () => {
  const width = Dimensions.get("window").width;

  return (
    <ScrollView style={styles.container}>
      {evacuationProcedure.content.map((procedure, index) => (
        <View key={index} style={styles.procedureContainer}>
          <Text style={styles.procedureTitle}>{procedure.title}</Text>
          <Carousel
            loop
            width={width - 20}
            height={250}
            autoPlay={true}
            scrollAnimationDuration={3000}
            data={procedure.steps}
            renderItem={({ item, index }) => (
              <View style={styles.carouselItem}>
                <Image
                  source={dummyImages[procedure.title][index]}
                  style={styles.carouselImage}
                />
                <Text style={styles.stepText}>{item}</Text>
              </View>
            )}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default EvacuationProcedure;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  procedureContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
  procedureTitle: {
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: "#007AFF",
    color: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  carouselItem: {
    flex: 1,
    justifyContent: "start",
    alignItems: "start",
    backgroundColor: "#f0f0f0",

    elevation: 3,
    overflow: "hidden",
  },
  carouselImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  stepText: {
    fontSize: 16,
    color: "#333",
    padding: 10,
    textAlign: "center",
  },
});
