import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

export default function BackButton({ goBack }) {
  const { t, i18n } = useTranslation();
  return (
    <TouchableOpacity
      onPress={goBack}
      style={i18n.dir() == "ltr" ? styles.containerRTL : styles.container}
    >
      <Text style={styles.backText}>{t(`startScreen.back`)}</Text>
      <MaterialIcons
        name={i18n.dir() == "rtl" ? "east" : "west"}
        size={30}
        color="white"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  containerRTL: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    marginHorizontal: 7,
    fontSize: 20,
    color: "#fff",
    fontFamily: "regularFont",
  },
});
