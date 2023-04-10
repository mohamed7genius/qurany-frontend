import "react-native-gesture-handler";
import * as React from "react";
import useFont from "./hooks/useFont";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./src/core/theme";
import RNRestart from 'react-native-restart';

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
  Sura
} from "./src/screens";
import "./src/i18n/i18n";
import { I18nManager } from "react-native";

 const Stack = createStackNavigator();
 if(!I18nManager.isRTL){
  I18nManager.forceRTL(true);
  RNRestart.Restart();
}
 
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
          <Stack.Screen name="Sura" component={Sura} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
