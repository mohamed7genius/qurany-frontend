import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import MainScreenComponent from "../components/MainScreenComponent";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

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
    navigation.reset({
      index: 0,
      routes: [{ name: "Dashboard" }],
    });
  };

  return (
    <MainScreenComponent goBack={navigation.goBack}>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) =>
          setEmail({
            value: text,
            error: "",
          })
        }
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) =>
          setPassword({
            value: text,
            error: "",
          })
        }
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        iconName="person-add-alt"
        mode="contained"
        onPress={onSignUpPressed}
      >
        Sign Up
      </Button>
    </MainScreenComponent>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  container: {
    width: "100%",
    height: "90%",
  },
  InputsContainer: {
    display: "flex",
    flex: 1,
  },
  row: {
    alignItems: "center",
    marginTop: 15,
  },
  link: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});