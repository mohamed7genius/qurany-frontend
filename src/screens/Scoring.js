import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import Background from "../components/Background";
import MainBar from "../components/MainBar";
import Header from "../components/Header";
export default function Scoring() {
  return (
    <Background>
      <View style={styles.header}>
        <Header />
      </View>
      <Text style={{ fontSize: 25, color: "white", fontFamily: "regularFont" }}>Scoring</Text>
      <MainBar />
    </Background>
  );
}

const styles = StyleSheet.create({
  header: {},
});
