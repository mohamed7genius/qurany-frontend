import React, { useState } from "react";
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

export default function Profile({ navigation }) {
  const { t, i18n } = useTranslation();
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
      routes: [{ name: "Battery" }],
    });
  };

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
        onPress={onSignUpPressed}
      >
        {t(`updateScreen.updateButton`)}
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

  }
});
