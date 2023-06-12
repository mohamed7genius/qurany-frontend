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
import { useTranslation } from "react-i18next";

export default function MainScreenComponent({ goBack, children }) {
  const { i18n, t } = useTranslation();
  return (
    <SafeAreaView style={{ ...styles.container, direction: i18n.dir() }}>
      <Background>
        <View style={i18n.dir()==="rtl" ? styles.buttonsContainerRTL : styles.buttonsContainer} >
          <View>{goBack && <BackButton goBack={goBack} />}</View>
          <LangugeChanger />
        </View>
         <View  style={i18n.dir()==="rtl" && Platform.OS === "android" ? styles.headerRTL : styles.header} >
          <Image
            style={styles.logo}
            source={require("../assets/images/logo.png")}
            resizeMode="contain"
          />
          <Text style={styles.qurany}>{t(`main.appName`)}</Text>
        </View>
        <KeyboardAvoidingView style={styles.keyBoardContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.childContainer}>{children}</View>
        </KeyboardAvoidingView>
      </Background>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  headerRTL: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row-reverse",
  },
  container: {
    paddingHorizontal: "1%",
    alignItems: "center",
    width: " 100%",
    height: "100%",
  },
  keyBoardContainer: {
    backgroundColor: "#ffff",
    flex: 1.4,
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
  buttonsContainerRTL: {
    paddingTop: StatusBar.currentHeight + 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row-reverse",
  },
  childContainer: {
    justifyContent: "center",
    paddingTop: "10%",
    marginTop: "-30%",
    paddingHorizontal: "10%",
    width: "100%",
  },
  logo: {
    width: 145,
    height: 145,
    flexDirection: "row",
  },
  qurany: {
    fontFamily: "regularFont",
    fontSize: 60,
    color: "#F5F5F5",
  },
});
