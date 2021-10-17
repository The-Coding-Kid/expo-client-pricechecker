import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Oswald_300Light,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
} from "@expo-google-fonts/oswald";

const Home: React.FC = () => {
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
      <View style={styles.container}>
        <Text style={{ fontFamily: "Oswald_300Light", fontSize: 20 }}>
          Home Screen
        </Text>
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

export default Home;
