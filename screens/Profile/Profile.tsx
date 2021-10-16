import React from "react";
import LoginButton from "../Login/LoginButton";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
var axios = require("axios");

const Profile = (props: any) => {
  const Logout = () => {
    AsyncStorage.removeItem("token");
    props.navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <LoginButton onPress={Logout} text="Log out" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;
