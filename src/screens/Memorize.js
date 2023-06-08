import { useEffect, useRef, useContext } from "react";
import {Dimensions} from 'react-native';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import Background from "../components/Background";
import MainBar from "../components/MainBar";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { surMeta } from '../helpers/quran';
import { useTranslation } from "react-i18next";
import { UserContext } from '../contexts/userContext';

export default function Memorize() {
  const navigation = useNavigation();
  const { i18n } = useTranslation();

  useEffect(() => {
    console.log('Remove loading screen after .5s');
  }, [])
  
  return (
    <Background>
      <Header />
        <FlatList
          data={surMeta}
          renderItem={(sura) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("MemoSura", { suraIndex: sura.item.number - 1, startAyaNumber: 0 })}
                style={styles.sura}
                key={`memorize_sur_${sura.item.englishName}`}
              >
                <View style={styles.suraTextContainer}>
                  { i18n.language != 'ar' && <Text style={styles.suraName}>{sura.item.englishName}</Text>}
                  <Text style={styles.suraName}>{sura.item.name}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, i) => `score_${item.name}_${i}`}
          style={{ flex: 1, display: 'flex'}}
        />    
      <MainBar />
    </Background>
  );
}

const styles = StyleSheet.create({
  sura: {
    display: 'flex',
    marginHorizontal: '5%',
    height: 80,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  suraTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  suraName: {
    fontFamily: "regularFont",
    fontSize: 18,
  },
});
