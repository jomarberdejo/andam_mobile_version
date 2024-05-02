import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { evacuationProcedure } from "../../constants";

const EvacuationProcedure = () => {
  return (
    <ScrollView style={{ marginVertical: 10, marginLeft: 5 }}>
      {evacuationProcedure.content.map((procedure, index) => (
        <View key={index} style={styles.procedureContent}>
          <Text style={styles.procedureTitle}>{procedure.title}</Text>
          {procedure.steps.map((step, index) => (
            <View key={index} style={styles.procedureStep}>
              <Text>{step}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default EvacuationProcedure;

const styles = StyleSheet.create({
  procedureTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  procedureStep: {
    display: "block",
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
