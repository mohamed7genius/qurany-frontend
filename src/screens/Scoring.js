import React from "react";
import { StyleSheet, Text, View, StatusBar, FlatList } from "react-native";
import Background from "../components/Background";
import MainBar from "../components/MainBar";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import { BACKEND_URL } from '@env';

export default function Scoring() {
  const { t, i18n } = useTranslation();
  const usersData = [
    { name: 'AM', score: 6080},
    { name: 'AM', score: 6080},
    { name: 'PO', score: 5880},
    { name: 'PO', score: 5880},
    { name: 'MA', score: 2380},
    { name: 'MA', score: 2380},
    { name: 'MO', score: 2080},
    { name: 'MO', score: 2080},
    { name: 'MA', score: 100, currentUser: true},
    { name: 'MO', score: 10},
  ]
  return (
    <Background>
      <Header />
        <View style={styles.container}>
          <View style={styles.itemHeader}>
            <Text style={styles.headerText}>{t(`scoring.name`)}</Text>
            <Text style={styles.headerText}>{t(`scoring.score`)}</Text>
          </View>
          <FlatList
            data={usersData}
            renderItem={(e) => {
              return (
                <View style={e.item?.currentUser ? [styles.item, styles.currentUser] : styles.item}>
                  <Text style={styles.text}>{e.item.name}</Text>
                  <Text style={styles.text}>{e.item.score}</Text>
                </View>
              );
            }}
            keyExtractor={(item, i) => `score_${item.name}_${i}`}
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
  itemHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#ddd',
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  headerText: {
    fontFamily: 'boldFont',
    fontSize: 18,
  },
  text: {
    fontFamily: 'regularFont',
    fontSize: 18,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  itemRTL: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  currentUser: {
    backgroundColor: '#eee',
  },
});
