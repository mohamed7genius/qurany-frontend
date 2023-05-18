import React, { useState, useRef, useContext } from "react";
import { StyleSheet, View } from "react-native";
import Background from "../components/Background";
import MainBar from "../components/MainBar";
import Header from "../components/Header";
import SettingsDropdown from "../components/SettingsDropdown";
import { qariData } from '../helpers/quran';
import { useTranslation } from "react-i18next";
import { UserContext } from '../contexts/userContext';
import { currentLanguages } from "../helpers/languages";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { qariName, setQariName } = useContext(UserContext);
  const [quraNames, setQuraNames] = useState([...Object.keys(qariData).map((qari) => {
    return { label: t(`qari.${qari}`), value: qari};
  })]);
  const [languages, setLanguages] = useState([...currentLanguages.map((lang) => {
    return { label: t(`languages.${lang}`), value: lang}
  })]);

  return (
    <Background>
      <Header />
      <View style={styles.container}>
        <SettingsDropdown
          titleTransKey='settings.qariName'
          defaultValue={qariName}
          items={quraNames}
          setItems={setQuraNames}
          onChange={setQariName}
          containerStyle={{ zIndex:100 }}
        />
        <SettingsDropdown
          titleTransKey='settings.language'
          defaultValue={i18n.language}
          items={languages}
          setItems={setLanguages}
          onChange={(e) => {
            i18n.changeLanguage(e);
          }}
          containerStyle={{ zIndex:99 }}
        />
      </View>
      <MainBar />
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
