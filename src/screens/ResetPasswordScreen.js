import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import MainScreenComponent from "../components/MainScreenComponent";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { emailValidator } from "../helpers/emailValidator";
import { useTranslation } from "react-i18next";
import { BACKEND_USER_URL, API_KEY } from '@env';
import LoadingScreen from "../components/LoadingScreen";
import { theme } from "../core/theme";

export default function ResetPasswordScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [errorKey, setErrorKey] = useState();
  const [loading, setLoading] = useState();
  const resetPasswordURL = `${BACKEND_USER_URL}/forgot-password`;

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }
    // setLoading(true);
    // Validate the login with the backend
    fetch(resetPasswordURL, {
      method: 'PUT',
      headers: {
        "api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
      })
    }).then((res) => res.json()).then((res) => {
      if ( res?.errorMessage ) {
        // There's an error with the backend
        setErrorKey(res?.errorMessage || 'somethingWrong')
      } else {
        setLoading(false);
        navigation.navigate("LoginScreen");
      }
    }).catch((err) => {
      console.log('Error from backend', err);
      setErrorKey(err?.errorMessage || 'somethingWrong')
    });
  };

  if ( loading ) {
    return <LoadingScreen />;
  }

  return (
    <MainScreenComponent goBack={navigation.goBack}>
      <Text style={styles.restoreText}>
        {t(`resetPasswordScreen.restoreText`)}
      </Text>
      <TextInput
        label={t(`resetPasswordScreen.emailAddress`)}
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description={t(`resetPasswordScreen.sentEmail`)}
      />
      { errorKey && <Text style={styles.errorText}>{t(`errors.${errorKey}`)}</Text>}
      <Button
        iconName="settings-backup-restore"
        mode="contained"
        onPress={sendResetPasswordEmail}
      >
        {t(`resetPasswordScreen.restoreButton`)}
      </Button>
    </MainScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  header: {
    flex: 1,
  },
  inputText: {
    fontSize: 19,
  },
  restoreText: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "regularFont",
  },
  description: {
    fontSize: 30,
    fontFamily: "regularFont",
  },
  resetContainer: {
    flex: 1,
    justifyContent: "center",
    fontFamily: "regularFont",
  },
  errorText: {
    color: theme.colors.error,
    fontFamily: 'regularFont',
    fontSize: 20,
    textAlign: "center",
  }
});
