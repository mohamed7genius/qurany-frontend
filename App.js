import "react-native-gesture-handler";
import * as React from "react";
import useFont from "./hooks/useFont";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./src/core/theme";
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Settings,
  Battery,
  Support,
  Profile,
  Scoring,
} from "./src/screens";
import "./src/i18n/i18n";

const Stack = createStackNavigator();

export default function App() {
  const { state } = useFont();
  if (!state) {
    return <></>;
  }
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Battery" component={Battery} />
          <Stack.Screen name="Support" component={Support} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Scoring" component={Scoring} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
