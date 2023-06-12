import React, { useState, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import MainScreenComponent from "../components/MainScreenComponent";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import { UserContext } from '../contexts/userContext';
import { BACKEND_USER_URL, API_KEY } from '@env';
import LoadingScreen from "../components/LoadingScreen";

export default function RegisterScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [errorKey, setErrorKey] = useState();
  const { setJWT, setName: setCurrentName, setEmail: setCurrentEmail } = useContext(UserContext);
  const [loading, setLoading] = useState();

  const onSignUpPressed = () => {
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
    // Validate with the backend
    fetch(`${BACKEND_USER_URL}/register`, {
      method: 'POST',
      headers: {
        "api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
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

  if ( loading ) {
    return <LoadingScreen />;
  }

  return (
    <MainScreenComponent goBack={navigation.goBack}>
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
      </View>
      { errorKey && <Text style={styles.errorText}>{t(`errors.${errorKey}`)}</Text> }
      <Button
        iconName="person-add-alt"
        mode="contained"
        onPress={onSignUpPressed}
      >
        {t(`startScreen.signUp`)}
      </Button>
    </MainScreenComponent>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: theme.colors.error,
    fontFamily: 'regularFont',
    fontSize: 20,
    textAlign: "center",
  },
});
