import React, { useState, useContext } from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import MainScreenComponent from "../components/MainScreenComponent";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { useTranslation } from "react-i18next";
import { passwordValidator } from "../helpers/passwordValidator";
import { UserContext } from '../contexts/userContext';
import { BACKEND_USER_URL, API_KEY } from '@env';

export default function LoginScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [errorKey, setErrorKey] = useState();
  const { setJWT } = useContext(UserContext);
  const loginURL = `${BACKEND_USER_URL}/login`;

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    // Validate the login with the backend
    fetch(loginURL, {
      method: 'POST',
      headers: {
        "api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      })
    }).then((res) => res.json()).then((res) => {
      console.log('res', res);
      if ( res?.token ) {
        setJWT(res.token);
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
    
  };

  return (
    <MainScreenComponent goBack={() => navigation.goBack()}>
      <TextInput
        label={t(`loginScreen.email`)}
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label={t(`loginScreen.password`)}
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      { errorKey && <Text>{t(`errors.${errorKey}`)}</Text> }
      <Button iconName="login" mode="contained" onPress={onLoginPressed}>
        {t(`startScreen.login`)}
      </Button>
      <View>
        <TouchableOpacity
          style={i18n.dir()==="rtl" && Platform.OS === "android" ? styles.forgotPasswordRTL : styles.forgotPassword}
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <MaterialIcons
            name="settings-backup-restore"
            size={24}
            color="black"
          />
          <Text style={styles.forgot}>{t(`loginScreen.forgot`)}</Text>
        </TouchableOpacity>
      </View>
    </MainScreenComponent>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "7%",
  },
  forgotPasswordRTL: {
    justifyContent: "center",
    flexDirection: "row-reverse",
    alignItems: "center",
    marginTop: "7%",
  },
  forgot: {
    marginHorizontal: 7,
    fontFamily: "regularFont",
    fontSize: 20,
    color: theme.colors.secondary,
  },
  errorText: {
    color: theme.colors.error,
    fontFamily: 'regularFont',
    fontSize: 20,
    textAlign: "center",
  }
});
