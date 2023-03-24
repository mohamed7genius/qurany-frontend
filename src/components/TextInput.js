import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "../core/theme";
import { useTranslation } from "react-i18next";

export default function TextInput({
  errorText,
  description,
  errorStyle,
  ...props
}) {
  const { i18n, t } = useTranslation();

  return (
    <View style={styles.container}>
      <Input
        textColor="black"
        activeUnderlineColor="#606060"
        style={styles.input}
        contentStyle={{fontFamily: "regularFont",}}
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? (
        <Text
          style={errorStyle ? { ...styles.error, errorStyle } : styles.error}
        >
          {t(errorText)}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 10,
    borderRadius: 10,
    borderColor: "#606060",
    borderStyle: "solid",
    background: "#F0F0F0",
    fontFamily: "regularFont",
  },
  error: {
    fontSize: 13,
    textAlign: "center",
    color: theme.colors.error,
    paddingLeft: 15,
    fontFamily: "regularFont",
  },
});
