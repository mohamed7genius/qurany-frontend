import React from "react";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function MainBar() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <TouchableOpacity onPress={() => navigation.navigate("Support")}>
          <MaterialIcons
            style={styles.support}
            name="support"
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <MaterialIcons name="settings" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Battery")}>
          <MaterialIcons name="battery-std" size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Scoring")}>
          <MaterialIcons name="leaderboard" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <MaterialIcons name="account-circle" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
  main: {
    width: "99%",
    height: 50,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#181818",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row-reverse",
    zIndex: 5,
  },
});
