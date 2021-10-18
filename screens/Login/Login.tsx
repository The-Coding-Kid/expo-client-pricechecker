import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import * as Font from "expo-font";
var axios = require("axios");
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Oswald_300Light,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
} from "@expo-google-fonts/oswald";
import LoginForm from "./LoginForm";
import globalStyles from "../../styles/globalStyles";

interface Props {
  navigation: any;
}

const DismissKeyboard = (props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {props.children}
    </TouchableWithoutFeedback>
  );
};

const Login: React.FC<Props> = (props) => {
  let [loaded] = useFonts({
    Oswald_300Light,
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold,
  });

  if (!loaded) {
    return (
      <View style={globalStyles.centerContainer}>
        <AppLoading />
        <ActivityIndicator size="large" color="#0096FF" />
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <Text style={{ fontFamily: "Oswald_400Regular", fontSize: 40 }}>
            Log In
          </Text>
          <LoginForm navigation={props.navigation} />
          <StatusBar style="auto" />
        </View>
      </DismissKeyboard>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 50,
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    width: 200,
    marginTop: 40,
    height: 45,
  },
});

export default Login;
