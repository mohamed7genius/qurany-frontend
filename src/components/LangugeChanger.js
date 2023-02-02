import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
export default function LangugeChanger() {
  return (
    <TouchableOpacity onPress={() => {}} style={styles.container}>
      <MaterialIcons name="language" size={30} color="white" />
      <Text style={styles.langugeChanger}>EN</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  langugeChanger: {
    marginHorizontal: 7,
    fontSize: 20,
    color: "#fff",
    fontFamily: "regularFont",
  },
});
