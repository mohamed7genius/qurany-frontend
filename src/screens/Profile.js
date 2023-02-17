import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Background from "../components/Background";
import MainBar from "../components/MainBar";
import Hasanat from "../components/Hasanat";
export default function Profile() {
  return (
    <Background>
      <Hasanat />
      <Text style={{ fontSize: 25, color: "white" }}>Profile</Text>
      <MainBar />
    </Background>
  );
}

const styles = StyleSheet.create({});
