import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Background from "../components/Background";
import MainBar from "../components/MainBar";
import Header from "../components/Header";
export default function Profile() {
  return (
    <Background>
      <Header />
      <Text style={{ fontSize: 25, color: "white", fontFamily: "regularFont" }}>Profile</Text>
      <MainBar />
    </Background>
  );
}

const styles = StyleSheet.create({});
