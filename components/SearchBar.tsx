import React from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import {
  useFonts,
  Oswald_300Light,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
} from "@expo-google-fonts/oswald";
import AppLoading from "expo-app-loading";
import { Fontisto } from "@expo/vector-icons";

const SearchBar = () => {
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
      <Pressable style={styles.searchButton}>
        <View style={{ marginRight: 10 }}>
          <Fontisto name="search" size={24} color="#f15454" />
        </View>
        <Text style={styles.text}>Search</Text>
      </Pressable>
    );
  }
};

const styles = StyleSheet.create({
  searchButton: {
    backgroundColor: "#fff",
    height: 60,
    width: Dimensions.get("screen").width - 30,
    borderRadius: 30,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 50,
    zIndex: 100,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Oswald_400Regular",
  },
});

export default SearchBar;
