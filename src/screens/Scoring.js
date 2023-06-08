import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Background from "../components/Background";
import MainBar from "../components/MainBar";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import { BACKEND_USER_URL, API_KEY } from '@env';
import LoadingScreen from "../components/LoadingScreen";
import { UserContext } from '../contexts/userContext';

export default function Scoring() {
  const { t } = useTranslation();
  const [usersData, setUsersData] = useState([]);
  const updateURL = `${BACKEND_USER_URL}/update`;
  const usersDataURL = `${BACKEND_USER_URL}/scores`;
  const { score, level, email, jwt } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [errorKey, setErrorKey] = useState();

  useEffect(() => {
    // Send user score to backend
    if ( jwt == 'guest' ) {
      setErrorKey('guest')
      setLoading(false);
      return;
    }
    fetch(updateURL, {
      method: 'PUT',
      headers: {
        "api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        score,
        level,
        token: jwt,
      })
    }).then((res) => res.json()).then((res) => {
      if ( res?.errorMessage ) {
        // There's an error with the backend
        setErrorKey(res?.errorMessage || 'somethingWrong')
      } else {
        // Get users data
        fetch(usersDataURL, {
          method: 'POST',
          headers: {
            "api-key": API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            token: jwt,
          })
        }).then((res) => res.json()).then((res) => {
          if ( res?.scores ) {
            // Get users data
            setUsersData(res.scores);
            setLoading(false);
          } else {
            // There's an error with the backend
            setErrorKey(res?.errorMessage || 'somethingWrong')
          }
      
        }).catch((err) => {
          setErrorKey(err?.errorMessage || 'somethingWrong')
        });
      }
  
    }).catch((err) => {
      setErrorKey(err?.errorMessage || 'somethingWrong')
    });
  }, []);

  if ( loading ) {
    return <LoadingScreen />;
  }

  return (
    <Background>
      <Header />
        <View style={styles.container}>
          {usersData && <View style={styles.itemHeader}>
            <Text style={styles.headerText}>{t(`scoring.name`)}</Text>
            <Text style={styles.headerText}>{t(`scoring.score`)}</Text>
          </View>}
          {errorKey && <Text style={styles.error}>{t(`errors.${errorKey}`)}</Text>}
          {usersData && <FlatList
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
          />}
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
  error: {
    fontFamily: 'regularFont',
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: 10,
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
