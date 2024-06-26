import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { whatToDo } from "../../constants";

// Dummy images for demonstration
const dummyImages = {
  General: [
    { url: require("../../assets/images/pnp-cover.jpg") },
    { url: require("../../assets/images/pnp-cover.jpg") },
    { url: require("../../assets/images/pnp-cover.jpg") },
  ],
  Earthquake: [
    { url: require("../../assets/images/pnp-cover.jpg") },
    { url: require("../../assets/images/pnp-cover.jpg") },
    { url: require("../../assets/images/pnp-cover.jpg") },
  ],
  Fire: [
    { url: require("../../assets/images/pnp-cover.jpg") },
    { url: require("../../assets/images/pnp-cover.jpg") },
    { url: require("../../assets/images/pnp-cover.jpg") },
  ],
  Flood: [
    { url: require("../../assets/images/pnp-cover.jpg") },
    { url: require("../../assets/images/pnp-cover.jpg") },
    { url: require("../../assets/images/pnp-cover.jpg") },
  ],
};

const Todos = () => {
  const width = Dimensions.get("window").width;

  return (
    <ScrollView style={styles.container}>
      {whatToDo.content.map((todo, index) => (
        <View key={index} style={styles.todoContainer}>
          <Text style={styles.todoTitle}>{todo.title}</Text>

          <Carousel
            loop
            width={width}
            height={200}
            autoPlay={true}
            scrollAnimationDuration={2000}
            data={dummyImages[todo.title]}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={styles.carouselItem}>
                <Image source={item.url} style={styles.carouselImage} />
              </TouchableOpacity>
            )}
          />

          <View style={styles.stepsContainer}>
            {todo.steps.map((step, stepIndex) => (
              <View key={stepIndex} style={styles.todoStep}>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  todoContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
  todoTitle: {
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: "#007AFF",
    color: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  stepsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  todoStep: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
  },
  stepText: {
    fontSize: 16,
    color: "#333",
  },
  carouselItem: {
    flex: 1,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    elevation: 3,
    overflow: "hidden",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default Todos;
