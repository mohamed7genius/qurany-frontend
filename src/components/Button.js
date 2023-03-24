import React from "react";
import { StyleSheet, View } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

export default function Button({ mode, style, iconName, ...props }) {
  const { i18n } = useTranslation();

  return (
    <View style={styles.button}>
      {iconName && (
        <MaterialIcons
          style={styles.icon}
          name={iconName}
          size={90}
          color="rgba(255,255,255,0.5)"
        />
      )}
      <PaperButton
        style={[styles.innerButton, mode === "outlined", style]}
        labelStyle={styles.text}
        mode={mode}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "relative",
    marginTop: 10,
  },
  icon: {
    zIndex: 3,
    position: "absolute",
    bottom: -13,
    left: -7,
  },
  innerButton: {
    backgroundColor: "#181818",
    marginTop: 15,
    borderRadius: 0,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    width: 300,
    height: 50,
  },
  text: {
    fontFamily: "regularFont",
    fontSize: 20,
    lineHeight: 26,
  },
});
