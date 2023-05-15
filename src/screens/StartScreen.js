import React from "react";
import MainScreenComponent from "../components/MainScreenComponent";
import { theme } from "../core/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";
export default function StartScreen({ navigation }) {
  const { t, i18n } = useTranslation();

  return (
    <MainScreenComponent>
      <Button
        iconName="login"
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        {t(`startScreen.login`)}
      </Button>
      <Button
        iconName="person-add-alt"
        mode="contained"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        {t(`startScreen.signUp`)}
      </Button>
      <TouchableOpacity
          style={i18n.dir()==="rtl" && Platform.OS === "android" ? styles.continueButtonContainerRTL : styles.continueButtonContainer}      
          onPress={() => {
            console.log('set loading screen!');
            navigation.reset({
              index: 0,
              routes: [{ name: "Battery" }],
            });
          }
        }
      >
        <Text style={styles.continue}>{t(`startScreen.guest`)}</Text>
        <MaterialIcons
          name={i18n.dir() == "ltr" ? "east" : "west"}
          size={30}
          color="#000"
        />
      </TouchableOpacity>
    </MainScreenComponent>
  );
}
const styles = StyleSheet.create({
  continueButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "7%",
    flexDirection: "row-reverse",
  },
  continueButtonContainerRTL: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "7%",
    flexDirection: "row",
  },
  continue: {
    marginHorizontal: 7,
    fontFamily: "regularFont",
    fontSize: 20,
    color: theme.colors.secondary,
  },
});
