import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

export default function BackButton({ goBack, extraStyle={}, iconColor="white" }) {
  const { t, i18n } = useTranslation();
  return (
    <TouchableOpacity
      onPress={goBack}
      style={i18n.dir()==="rtl" ? styles.containerRTL : styles.container}      
      >
      <Text style={extraStyle ? [styles.backText, extraStyle] : styles.backText}>{t(`startScreen.back`)}</Text>
      <MaterialIcons
        name={i18n.dir() == "rtl" ? "east" : "west"}
        size={30}
        color={iconColor}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerRTL: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  container: {
    flexDirection: "row-reverse",
    alignItems: "center",
    margin: 5,
  },
  backText: {
    marginHorizontal: 7,
    fontSize: 20,
    color: "#fff",
    fontFamily: "regularFont",
  },
});
