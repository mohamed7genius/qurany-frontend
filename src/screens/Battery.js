import { useEffect, useRef, useState } from "react";
import {Dimensions} from 'react-native';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import Background from "../components/Background";
import MainBar from "../components/MainBar";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import AnimatedCircularProgress from 'rn-conical-gradient-progress';
import { surMeta } from '../helpers/quran';
import { useTranslation } from "react-i18next";

export default function Battery() {
  const width = Dimensions.get('window').width;
  const level = 3.52; // must be replaced with user level from token, x.y, x means sura . y means % completed in this sura, 0 based
  const sign = useRef('+');
  const horizontalPos = useRef();
  const scrollViewRef = useRef();
  const navigation = useNavigation();
  const { i18n } = useTranslation();
  
  return (
    <Background>
      <Header />
        { width && surMeta && <ScrollView contentContainerStyle={styles.scrollViewer} ref={(e) => scrollViewRef.current = e}>
          { surMeta.map((sura, i) => {
            let left;
            if ( i === 0 ) {
              left = (width / 2) - 60;
              horizontalPos.current = left;
              sign.current = '+';
            } else {
              if ( sign.current === '+' ) {
                left = horizontalPos.current + 60;
                if ( width - 108 <= left ) {
                  sign.current = '-';
                  left = horizontalPos.current - 60;
                  }
                  horizontalPos.current = left;
                } else {
                  left = horizontalPos.current - 60;
                  if ( left <= 0 ) {
                    sign.current = '+';
                    left = horizontalPos.current + 60;
                  }
                  horizontalPos.current = left;
              }
            }

            // Calculate completion %
            let fill = 0;
            if ( i == Math.floor(level) && Math.floor(level) != level ) {
              let levelStr = String(level).split('.')[1];
              if ( levelStr.length == 1 ) {
                levelStr += '0';
              } else if ( levelStr.length > 2 ) {
                levelStr = levelStr.substring(0, 2);
              }
              fill = Number(levelStr);
            } else if ( i < level ) {
              fill = 100;
            } // else fill = 0 default
            return (
            <TouchableOpacity
              // we need to prevent the user from memorizing a later sura ( must go in order )
              onPress={() => navigation.navigate("Sura", { suraIndex: i, startAyaNumber: 1})}
              style={{...styles.sura, 
                left: left,
              }}
              key={`dashboard_${sura.englishName}`}
            >
            <AnimatedCircularProgress
            size={120}
            width={5}
            fill={ fill }
            prefill={0}
            beginColor="#1C8DCD"
            endColor="#009E5A"
            segments={100}
            backgroundColor="#ddd"
            linecap="round"
            style={styles.progressCircle}
          >
            {fill => (
              <View style={styles.suraTextContainer}>
                <Text style={styles.precentageText}>{fill.toFixed(0)}%</Text>
                { i18n.language != 'ar' && <Text style={styles.suraName}>{sura.englishName}</Text>}
                <Text style={styles.suraName}>{sura.name}</Text>
              </View>
            )}
          </AnimatedCircularProgress>
            </TouchableOpacity>
            );
          })}
        </ScrollView> }
        <MainBar />
      </Background>
  );
}

const styles = StyleSheet.create({
  scrollViewer: {
    paddingBottom: 20,
  },
  sura: {
    display: 'flex',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  suraTextContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suraName: {
    fontFamily: "regularFont",
    fontSize: 18,
  },
  precentageText: {
    fontFamily: "regularFont",
    fontStyle: 'normal',
    fontSize: 21,
    textAlign: 'center',
    color: '#000000',
  },
});
