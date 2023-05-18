import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Background from "../components/Background";
import MainBar from "../components/MainBar";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

export default function Support() {
  const { t, i18n } = useTranslation();

  return (
    <Background>
      <Header />
        <View style={styles.container}>
          <Text style={styles.text}>
            {t(`support.notAvailable`)}
          </Text>
        </View>
      <MainBar />
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'regularFont',
    fontSize: 20,
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 10,
  }
});
