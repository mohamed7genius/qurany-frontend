import {useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  View,
} from "react-native";
import {surMeta, ayatNumber, ayatText} from "../helpers/quran";
import Header from "../components/Header";
import Recording from "../components/Recording";
const Sura = ({...props}) => {
  const {suraIndex, startAyaNumber} = props.route.params;
  const [suraAyat, setSuraAyat] = useState();

  useEffect(() => {
    let skipAyat = 0;
    for (let i = 0; i < suraIndex; i++) {
      skipAyat += Number(ayatNumber[i]);
    }
    setSuraAyat(ayatText.slice(skipAyat, skipAyat + ayatNumber[suraIndex]));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ImageBackground
        source={require("../assets/images/suraTitle.png")}
        style={styles.background}
      >
        <Text style={styles.suraName}>{surMeta[suraIndex].name}</Text>
      </ImageBackground>
      <ScrollView contentContainerStyle={styles.scrollViewer}>
        {suraAyat &&
          suraAyat.map((aya, i) => {
            return (
              <Text
                style={styles.aya}
                key={`${surMeta[suraIndex].englishName}_${i}`}
              >
                {aya} <View style={styles.bg}></View>
                <Text style={styles.ayaEnd}>{i + 1}</Text>
              </Text>
            );
          })}
      </ScrollView>
      <Recording />
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
  ayaEnd: {},
  bg: {
    backgroundColor: "#ddd",
    width: 10,
    height: 10,
  },
});

export default Sura;
