import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require("../assets/images/main.png")}
      style={styles.background}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
