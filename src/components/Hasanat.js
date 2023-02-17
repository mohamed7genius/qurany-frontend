import React from "react";
import { Image, StyleSheet, View, StatusBar } from "react-native";

export default function Hasanat() {
  return (
    <View style={styles.container}>
      <View style={styles.hasanatBar}>
        <Image
          source={require("../assets/Images/hassant.png")}
          style={styles.background}
        ></Image>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  hasanatBar: {
    paddingTop: 5,
    width: "100%",
    height: "150%",
    flexDirection: "row-reverse",
    backgroundColor: "#181818",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  background: {
    marginLeft: 15,
  },
});
