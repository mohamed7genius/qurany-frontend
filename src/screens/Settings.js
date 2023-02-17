import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Background from "../components/Background";
import MainBar from "../components/MainBar";
import Hasanat from "../components/Hasanat";
export default function Settings() {
  return (
    <Background>
      <Hasanat />

      <MainBar />
    </Background>
  );
}

const styles = StyleSheet.create({});
