import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <MaterialIcons name="west" size={30} color="white" />
      <Text style={styles.backText}>Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    marginHorizontal: 7,
    fontSize: 20,
    color: "#fff",
    fontFamily: "regularFont",
  },
});
