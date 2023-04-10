import React from "react";
import { TouchableOpacity, StyleSheet, Text, I18nManager } from "react-native";
import { useTranslation } from "react-i18next";
import { MaterialIcons } from "@expo/vector-icons";
 export default function LangugeChanger() {
  const { i18n} = useTranslation();
   return (
    <TouchableOpacity
    
      style={styles.container }
      onPress={() => {
        if (i18n.language == "en") {
          i18n.changeLanguage("ar");
           } else {
          i18n.changeLanguage("en");
        }
      }}
 
    >
      <MaterialIcons name="language" size={30} color="white" />
      <Text style={styles.langugeChanger}>{i18n.language == 'ar' ? 'EN' : 'AR'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
 
  langugeChanger: {
    marginHorizontal: 7,
    fontSize: 20,
    color: "#fff",
    fontFamily: "regularFont",
    marginTop: 5,
  },
});
