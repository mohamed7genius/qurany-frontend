import {useEffect, useRef, useState} from "react";
import { StyleSheet, Text, ScrollView, SafeAreaView, ImageBackground, View } from "react-native";
import {surMeta, ayatNumber, ayatText, cleanAyatText} from "../helpers/quran";
import Header from "../components/Header";
import SuraNav from "../components/SuraNav";
import { toArabicNumber } from '../helpers/format';
import { useTranslation } from "react-i18next";

const Sura = ({ navigation, ...props}) => {
  const {suraIndex, startAyaNumber} = props.route.params;
  const [suraAyat, setSuraAyat] = useState();
  const [cleanSuraAyat, setCleanSuraAyat] = useState();
  const [scrollViewer, setScrollViewer] = useState();
  const [ayatCordinates, setAyatCordinates] = useState([]);
  const wordPointer = useRef(0);
  const [ayaPointer, setAyaPointer] = useState(startAyaNumber || 0);
  const [wrongWordIndex, setWrongWordIndex] = useState();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    let skipAyat = 0;
    for (let i = 0; i < suraIndex; i++) {
      skipAyat += Number(ayatNumber[i]);
    }
    const ayat = ayatText.slice(skipAyat, skipAyat + ayatNumber[suraIndex]);
    const cleanAyat = cleanAyatText.slice(skipAyat, skipAyat + ayatNumber[suraIndex]);
    setSuraAyat(ayat);
    setCleanSuraAyat(cleanAyat);
  }, []);

  /* useEffect(() => {
    scrollTo(ayaPointer);
  }, [scrollViewer, suraAyat]);

  const scrollTo = (index) => {
    console.log('caled', index, ayatCordinates);
    if ( index < 1 || !scrollViewer ) {
      console.log('return');
      return
    }
    scrollViewer.scrollTo({
      x: 0,
      y: ayatCordinates[index - 1],
      animated: true,
    });
  }; */

  return (
    <SafeAreaView style={styles.container}>
      <Header goBack={() => navigation.goBack()} />
      <ImageBackground
        source={require("../assets/images/suraTitle.png")}
      >
        <Text style={styles.suraName}>{surMeta[suraIndex].name}</Text>
      </ImageBackground>
      <ScrollView
        contentContainerStyle={styles.scrollViewer}
        ref={(ref) => {
          setScrollViewer(ref);
        }}
      >
        { suraIndex > 0 && <Text style={styles.aya}>{ayatText[0]}</Text>}
        {suraAyat &&
          suraAyat.map((aya, i) => {
            return (
              <View key={`${surMeta[suraIndex].englishName}_${i}`} >
                <Text
                  style={i == ayaPointer ? [styles.aya, styles.currentAya] : styles.aya }
                >
                  { i == ayaPointer ?
                    aya.split(' ').map((word, wordIndex) => {
                      if ( wordIndex == wrongWordIndex ){
                        if ( word.split('').length < cleanSuraAyat[ayaPointer].split(' ')[wrongWordIndex].split('').length ) {
                          setWrongWordIndex(wrongWordIndex+1);
                          return <Text key={`${surMeta[suraIndex].englishName}_${i}_${wordIndex}`}>{word} </Text>;
                        }
                        return <Text key={`${surMeta[suraIndex].englishName}_${i}_${wordIndex}`} style={styles.wrongWord}>{word} </Text>;
                      }
                      return <Text key={`${surMeta[suraIndex].englishName}_${i}_${wordIndex}`}>{word} </Text>;
                    })
                  : aya }
                  <ImageBackground
                    source={require("../assets/images/ayah-end.png")}
                    style={styles.background}
                  >
                    <Text style={styles.ayaEnd}>{i18n.language == 'ar' ? toArabicNumber(i + 1) : i+1}</Text>
                  </ImageBackground>
                </Text>
              </View>
            );
          })}
      </ScrollView>
      <SuraNav
        ayat={cleanSuraAyat}
        wordPointer={wordPointer}
        suraIndex={suraIndex}
        ayaPointer={ayaPointer}
        setAyaPointer={setAyaPointer}
        setWrongWordIndex={setWrongWordIndex}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  suraName: {
    fontFamily: "quranFont",
    fontSize: 25,
    height: 50,
    color: "#000",
    textAlign: "center",
    padding: 5,
  },
  aya: {
    fontSize: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    fontFamily: "quranFont",
    paddingHorizontal: 10,
    textAlign: "center",
  },
  currentAya: {
    color: '#656D77',
    textDecorationLine: 'underline'
  },
  wrongWord: {
    color: '#C0392B',
  },
  ayaEnd: {
    fontFamily: 'regularFont',
  },
  background: {
    width: 30,
    height:30,
    paddingTop: 5,
    paddingLeft: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Sura;
