import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import Background from "../components/Background";
import MainBar from "../components/MainBar";
import Hasanat from "../components/Hasanat";
export default function Scoring() {
  return (
    <Background>
      <View style={styles.hasanat}>
        <Hasanat />
      </View>
      <Text style={{ fontSize: 25, color: "white" }}>Scoring</Text>
      <MainBar />
    </Background>
  );
}

const styles = StyleSheet.create({
  hasanat: {},
});
