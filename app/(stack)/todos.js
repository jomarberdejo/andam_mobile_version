import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { whatToDo } from "../../constants";

const Todos = () => {
  return (
    <ScrollView style={{ marginVertical: 10, marginLeft: 5 }}>
      {whatToDo.content.map((todo, index) => (
        <View key={index} style={styles.todoContent}>
          <Text style={styles.todoTitle}>{todo.title}</Text>
          {todo.steps.map((step, index) => (
            <View key={index} style={styles.todoStep}>
              <Text>{step}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default Todos;

const styles = StyleSheet.create({
  todoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  todoStep: {
    display: "block",
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
