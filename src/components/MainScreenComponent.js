import React from "react";
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  Image,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import LangugeChanger from "./LangugeChanger";
import BackButton from "./BackButton";
import Background from "./Background";

export default function MainScreenComponent({ goBack, children }) {
  return (
    <SafeAreaView style={styles.container}>
      <Background>
        <View style={styles.buttonsContainer}>
          <View>{goBack && <BackButton goBack={goBack} />}</View>
          <LangugeChanger />
        </View>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../assets/Images/logo.png")}
          />
          <Text style={styles.qurany}>Qurany</Text>
        </View>
        <KeyboardAvoidingView style={styles.keyBoardContainer} behavior="padding">
          <View style={styles.childContainer}>{children}</View>
        </KeyboardAvoidingView>
      </Background>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  container: {
    paddingHorizontal: "1%",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  keyBoardContainer: {
    backgroundColor: "#ffff",
    flex: 1.3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
    borderTopRightRadius: 250,
    borderTopLeftRadius: 250,
    paddingVertical: "25%",
    paddingHorizontal: "5%",
  },
  buttonsContainer: {
    paddingTop: StatusBar.currentHeight + 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  childContainer: {
    justifyContent: "center",
    paddingTop: "10%",
    marginTop: -50,
    paddingHorizontal: "10%",
    width: "100%",
  },
  logo: {
    width: 145,
    height: 71,
  },
  qurany: {
    fontSize: 60,
    color: "#F5F5F5",
  },
});