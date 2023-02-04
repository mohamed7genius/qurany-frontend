import React from "react";

import { View, StyleSheet, SafeAreaView } from "react-native";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";

export default function Dashboard({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.entireApp}>
        <Paragraph>our App is start there you are a logged in User</Paragraph>
        <Button
          mode="outlined"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "StartScreen" }],
            })
          }
        >
          Logout
        </Button>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  header: {
    display: "flex",
    flex: 1,
  },
  container: {
    width: "100%",
    height: "100%",
  },
  entireApp: {
    flex: 1,
  },
});
