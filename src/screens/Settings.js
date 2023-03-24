import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Background from "../components/Background";
import MainBar from "../components/MainBar";
import Header from "../components/Header";
export default function Settings() {
  return (
    <Background>
      <Header />

      <MainBar />
    </Background>
  );
}

const styles = StyleSheet.create({});
