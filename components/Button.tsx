import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import {
  useFonts,
  Oswald_300Light,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
} from "@expo-google-fonts/oswald";
import AppLoading from "expo-app-loading";

interface Props {
  onPress: any;
  text: string;
}

// @ts-ignore
const LoginButton: React.FC<Props> = ({ onPress, text }) => {
  let [fontsLoaded] = useFonts({
    Oswald_300Light,
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginTop: 20,
    backgroundColor: "#0c1ec7",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Oswald_700Bold",
  },
});

export default LoginButton;
