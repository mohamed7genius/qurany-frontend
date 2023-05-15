import React, { useContext } from "react";
import {Image, StyleSheet, View, Text} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import BackButton from "./BackButton";
import { UserContext } from '../contexts/userContext';

export default function Header({ goBack }) {
  const { score, level } = useContext(UserContext);
  return (
    <View style={Platform.OS === "android" ? styles.androidHeader : styles.headerBar}>
      {goBack && <View style={styles.itemContainer}>
        <BackButton goBack={goBack} iconColor="black" extraStyle={{color: '#181818'}} />
      </View>}
      <View style={styles.itemContainer}>
        <Image
          source={require("../assets/images/hassant.png")}
          style={styles.hasanatImage}
        ></Image>
        <Text style={styles.score}>{score}</Text>
      </View>
      <View style={styles.itemContainer}>
        <MaterialIcons name="leaderboard" size={30} color="#181818" />
        <Text style={styles.level}>{Math.floor(level)}</Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    paddingHorizontal: 10,
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  androidHeader: {
    paddingTop: 25,
    width: "100%",
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  itemContainer: {
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
  level: {
    marginHorizontal: 5,
    fontFamily: "regularFont",
    color: "#181818",
    fontSize: 20,
  },
});
