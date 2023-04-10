import React from "react";
import {Image, StyleSheet, View, Text} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.headerBar}>
      <View style={styles.hasanatContainer}>
        <Image
          source={require("../assets/images/hassant.png")}
          style={styles.hasanatImage}
        ></Image>
        <Text style={styles.score}>99</Text>
      </View>
      <View style={styles.levelContainer}>
        <MaterialIcons name="leaderboard" size={30} color="#181818" />
        <Text style={styles.level}>3</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    paddingTop: 5,
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  hasanatContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 10,
  },
  hasanatImage: {
    marginHorizontal: 10,
  },
  score: {
    fontFamily: "regularFont",
    color: "#181818",
    fontSize: 20,
  },
  levelContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 10,
  },
  level: {
    marginHorizontal: 5,
    fontFamily: "regularFont",
    color: "#181818",
    fontSize: 20,
  },
});
