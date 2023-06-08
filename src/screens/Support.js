import React,{useState} from "react";
import { StyleSheet, Text, View ,TextInput} from "react-native";
import Background from "../components/Background";
import MainBar from "../components/MainBar";
import Header from "../components/Header";
import Button from "../components/Button";

import { useTranslation } from "react-i18next";

export default function Support() {
  const { t, i18n } = useTranslation();
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
     console.log("Feedback submitted:", feedback);
     setFeedback("");
  };

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
});
