import { View, Text, StyleSheet } from "react-native";
import Announcement from "../../components/Announcement";

export default function Tab() {
  return (
    <View style={styles.container}>
      <Announcement agency="PNP" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 540,
    justifyContent: "center",
    alignItems: "center",
  },
});
