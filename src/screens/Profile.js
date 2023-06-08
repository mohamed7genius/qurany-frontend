import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
 import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import Background from "../components/Background";
import MainBar from "../components/MainBar";
import Header from "../components/Header";
 import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import { UserContext } from '../contexts/userContext';
import LoadingScreen from "../components/LoadingScreen";

export default function Profile({ navigation }) {
  const { t } = useTranslation();
  const { loggingOut, name: currentName, email: currentEmail, jwt } = useContext(UserContext);
  const [name, setName] = useState({ value: currentName || "", error: "" });
  const [email, setEmail] = useState({ value: currentEmail || "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState();

  const updateUserDetails = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    setLoading(true);
    // To simulate fetch TODO: Add fetch
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Battery" }],
      });
    }, 5000);
  };

  const registerUser = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    setLoading(true);
    // To simulate fetch TODO: Add fetch
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Battery" }],
      });
    }, 5000);
  };

  const logOut = () => {
    setLoading(true);
    // Delete JWT
    loggingOut();
    // Redirect
    navigation.reset({
      index: 0,
      routes: [{ name: "StartScreen" }],
    });
  };

  if ( loading ) {
    return <LoadingScreen />;
  }

  return (
    <Background>
      <Header/>
      <View style={styles.inputText}>
        <TextInput
          label={t(`registerScreen.name`)}
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: "" })}
          error={!!name.error}
          errorText={t(name.error)}
        />
        <TextInput
          label={t(`loginScreen.email`)}
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) =>
            setEmail({
              value: text,
              error: "",
            })
          }
          error={!!email.error}
          errorText={t(email.error)}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label={t(`loginScreen.password`)}
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) =>
            setPassword({
              value: text,
              error: "",
            })
          }
          error={!!password.error}
          errorText={t(password.error)}
          secureTextEntry
        />
        <Button
          iconName="person-add-alt"
          mode="contained"
          onPress={jwt == 'guest' ? registerUser : updateUserDetails}
        >
          {t( jwt == 'guest' ? `startScreen.signUp` : `updateScreen.updateButton`)}
        </Button>
        <Button
          iconName="logout"
          mode="contained"
          onPress={logOut}
        >
          {t(`updateScreen.logout`)}
        </Button>
      </View>
     
      <MainBar/>
    </Background>
  );
}

const styles = StyleSheet.create({
  inputText:{
    flex:1,
    justifyContent:"center",
    alignSelf:"center"
  },
});
