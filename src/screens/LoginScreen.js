import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import MainScreenComponent from "../components/MainScreenComponent";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
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
    <MainScreenComponent goBack={() => navigation.goBack()}>
      <TextInput
        label="Email"
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
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button 
      iconName="login"
      mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View>
        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <MaterialIcons
            name="settings-backup-restore"
            size={24}
            color="black"
          />
          <Text style={styles.forgot}>Forgot your password?</Text>
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

  forgot: {
    marginHorizontal: 7,
    fontFamily: "regularFont",
    fontSize: 20,
    color: theme.colors.secondary,
  },
});
