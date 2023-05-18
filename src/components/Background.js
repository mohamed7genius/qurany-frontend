import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require("../assets/images/main.png")}
      style={styles.background}
    >
      <View style={styles.backgroundColor}>
        {children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backgroundColor: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  }
});
