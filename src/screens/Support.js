import React,{useState, useContext} from "react";
import { StyleSheet, Text, View ,TextInput} from "react-native";
import Background from "../components/Background";
import MainBar from "../components/MainBar";
import Header from "../components/Header";
import Button from "../components/Button";
import { UserContext } from '../contexts/userContext';
import LoadingScreen from "../components/LoadingScreen";
import { BACKEND_USER_URL, API_KEY } from '@env';
import { theme } from "../core/theme";
import { useTranslation } from "react-i18next";

export default function Support() {
  const { t, i18n } = useTranslation();
  const [feedback, setFeedback] = useState("");
  const [errorKey, setErrorKey] = useState("");
  const [loading, setLoading] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { jwt, email } = useContext(UserContext);
  const url = `${BACKEND_USER_URL}/send-email`;

  const handleSubmit = () => {
     fetch(url, {
      method: 'POST',
      headers: {
        "api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        message: feedback,
        token: jwt
      })
    }).then((res) => res.json()).then((res) => {
      if ( res?.errorMessage ) {
        // There's an error with the backend
        setErrorKey(res?.errorMessage || 'somethingWrong')
      } else {
        setLoading(false);
        setSuccessMessage(true);
        setFeedback("");
      }
    }).catch((err) => {
      console.log('Error from backend', err);
      setErrorKey(err?.errorMessage || 'somethingWrong')
    });
    setLoading(false);
  };

  if ( loading ) {
    return <LoadingScreen />;
  }

  return (
    <Background>
      <Header />
      <View style={styles.container}>
      <Text style={styles.title}>{t(`supportScreen.feedbackTitle`)}
      </Text>
      <Text style={styles.label}>{t(`supportScreen.feedbackLabel`)}</Text>
      <TextInput
        placeholder={t(`supportScreen.feedback`)}
        style={styles.input}
        multiline
        numberOfLines={4}
        value={feedback}
        onChangeText={setFeedback}
      />
       <Button
         mode="contained"
        onPress={handleSubmit}
      >
        {t(`supportScreen.sendFeedback`)}
      </Button>
      {errorKey && <Text style={styles.errorText}>{t(`errors.${errorKey}`)}</Text>}
      {successMessage && <Text style={styles.successMessage}>{t(`supportScreen.successMessage`)}</Text>}
      </View>
      <MainBar />
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
  },
  title: {
    flex:0.4,
    color:"white",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign:'center',
  },
  label: {
    color:"white",
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    textAlignVertical: "top",
  },
  errorText: {
    color: theme.colors.error,
    fontFamily: 'regularFont',
    fontSize: 20,
    textAlign: "center",
  },
  successMessage: {
    fontFamily: 'regularFont',
    fontSize: 20,
    textAlign: "center",
  }
});
