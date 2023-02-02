import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require("../assets/Images/main.png")}
      style={styles.background}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
  },
});
