import React from "react";
import MainScreenComponent from "../components/MainScreenComponent";
import { theme } from "../core/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";
export default function StartScreen({ navigation }) {
  return (
    <MainScreenComponent>
      <Button
        iconName="login"
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Login
      </Button>
      <Button
        iconName="person-add-alt"
        mode="contained"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Sign Up
      </Button>
      <TouchableOpacity
        style={styles.continueButtonContainer}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Dashboard" }],
          })
        }
      >
        <Text style={styles.continue}>Continue as a guest</Text>
        <MaterialIcons name="east" size={30} color="#000" />
      </TouchableOpacity>
    </MainScreenComponent>
  );
}
const styles = StyleSheet.create({
  continueButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "7%",
    flexDirection: "row",
  },
  continue: {
    marginHorizontal: 7,
    fontStyle: "regularFont",
    fontSize: 20,
    color: theme.colors.secondary,
  },
});
