import React, { useState, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
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
import { BACKEND_USER_URL, API_KEY } from '@env';
import { theme } from "../core/theme";

export default function Profile({ navigation }) {
  const { t } = useTranslation();
  const { loggingOut, name: currentName, email: currentEmail, jwt, setJWT, setName: setCurrentName, setEmail: setCurrentEmail } = useContext(UserContext);
  const [name, setName] = useState({ value: currentName || "", error: "" });
  const [email, setEmail] = useState({ value: currentEmail || "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState();
  const registerGuestURL = `${BACKEND_USER_URL}/register-guest`;
  const updateUserData = `${BACKEND_USER_URL}/update-account`;
  const [errorKey, setErrorKey] = useState();

  const updateUserDetails = () => {
    const nameError = nameValidator(name.value);
    const passwordError = passwordValidator(password.value);
    if (passwordError || nameError) {
      setName({ ...name, error: nameError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    setLoading(true);
    // Validate the login with the backend
    fetch(updateUserData, {
      method: 'PUT',
      headers: {
        "api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        name: name.value,
        token: jwt,
      })
    }).then((res) => res.json()).then((res) => {
      if ( res?.errorMessage ) {
        // There's an error with the backend
        setErrorKey(res?.errorMessage || 'somethingWrong')
      } else {
        setCurrentName(name.value);
        setLoading(false);
        // Move to main screen
        navigation.reset({
          index: 0,
          routes: [{ name: "Battery" }],
        });
      }
    }).catch((err) => {
      console.log('Error from backend', err);
      setErrorKey(err?.errorMessage || 'somethingWrong')
    });
    setLoading(false);
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
    // Validate the login with the backend
    fetch(registerGuestURL, {
      method: 'PUT',
      headers: {
        "api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        name: name.value,
      })
    }).then((res) => res.json()).then((res) => {
      console.log('res', res);
      if ( res?.token ) {
        setJWT(res.token);
        setCurrentName(res.name);
        setCurrentEmail(res.email);
        // Move to main screen
        navigation.reset({
          index: 0,
          routes: [{ name: "Battery" }],
        });
      } else {
        // There's an error with the backend
        setErrorKey(res?.errorMessage || 'somethingWrong')
      }
    }).catch((err) => {
      console.log('Error from backend', err);
      setErrorKey(err?.errorMessage || 'somethingWrong')
    });
    setLoading(false);
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
          onChangeText={(text) => {
            if ( jwt == 'guest' ) {
              setEmail({
                value: text,
                error: "",
              })
            }
          }}
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
        { errorKey && <Text style={styles.errorText}>{t(`errors.${errorKey}`)}</Text>}
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
  errorText: {
    color: theme.colors.error,
    fontFamily: 'regularFont',
    fontSize: 20,
    textAlign: "center",
  }
});
