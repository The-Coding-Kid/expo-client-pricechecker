import React from "react";
import LoginButton from "../../components/Button";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

const Profile: React.FC = (props: any) => {
  let [fontsLoaded] = useFonts({
    Oswald_300Light,
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold,
  });

  const Logout = () => {
    AsyncStorage.removeItem("token");
    props.navigation.navigate("Login");
  };
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={{ fontFamily: "Oswald_300Light", fontSize: 20 }}>
          Profile
        </Text>
        <LoginButton
          text="Logout"
          onPress={() => {
            Logout();
          }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;
