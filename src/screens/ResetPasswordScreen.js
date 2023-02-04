import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import MainScreenComponent from "../components/MainScreenComponent";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { emailValidator } from "../helpers/emailValidator";

export default function ResetPasswordScreen({ navigation }) {
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
      <Text>Restore Password</Text>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive email with password reset link."
      />
      <Button
        iconName="settings-backup-restore"
        mode="contained"
        onPress={sendResetPasswordEmail}
      >
        Restore
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
  resetContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
