import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "../core/theme";

export default function TextInput({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        textColor="black"
        activeUnderlineColor="#606060"
        style={styles.input}
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
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
    justifyContent: "center",
  },
  description: {
    fontSize: 13,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingLeft: 15,
    fontFamily: "regularFont",
  },
});
