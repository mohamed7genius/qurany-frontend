import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import MainScreenComponent from "../components/MainScreenComponent";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { emailValidator } from "../helpers/emailValidator";
import { useTranslation } from "react-i18next";
import { View } from "react-native-web";

export default function ResetPasswordScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState({ value: "", error: "" });

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }
    navigation.navigate("LoginScreen");
  };

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
});
