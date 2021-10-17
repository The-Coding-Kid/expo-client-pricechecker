import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Oswald_300Light,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
} from "@expo-google-fonts/oswald";
import SearchBar from "../../components/SearchBar";
var axios = require("axios");

const Home: React.FC = () => {
  let [fontsLoaded] = useFonts({
    Oswald_300Light,
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold,
  });

  const [items, setItems] = useState<any>([]);
  const [map, showMap] = useState(false);

  useEffect(() => {
    axios.get("http://192.168.86.162:5000/items/all").then(async (res: any) => {
      setItems(res.data);
    });
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      showMap(true);
    }
  }, [items]);

  useEffect(() => {
    if (map == true) {
      const interval = setInterval(() => {
        axios
          .get("http://192.168.86.162:5000/items/all")
          .then(async (res: any) => {
            setItems(res.data);
          });
      }, 100000);
      return () => clearInterval(interval);
    }
  }, [map]);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    if (map) {
      return (
        <View style={styles.container}>
          <SearchBar
            onPress={() => {
              console.log("Pressed Search Bar");
            }}
          />
          <MapView
            showsUserLocation={true}
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {items
              ? items.map((item: any) => (
                  <Marker key={item._id} coordinate={item.coordinate}></Marker>
                ))
              : console.log("No items")}
          </MapView>
        </View>
      );
    } else {
      return <AppLoading />;
    }
  }
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Home;
