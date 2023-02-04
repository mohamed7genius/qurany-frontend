import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

export default function BackButton({ goBack }) {
  const { t, i18n } = useTranslation();
  return (
    <TouchableOpacity onPress={goBack} style={ i18n.dir() == 'rtl' ? styles.containerRTL : styles.container}>
      <MaterialIcons name={i18n.dir() == 'rtl' ? 'east' : 'west'} size={30} color="white" />
      <Text style={styles.backText}>{t(`startScreen.back`)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerRTL: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  backText: {
    marginHorizontal: 7,
    fontSize: 20,
    color: "#fff",
    fontFamily: "regularFont",
  },
});
