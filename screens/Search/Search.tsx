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
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";

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
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [locationLoaded, setLocationLoaded] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<object | string>({});

  useEffect(() => {
    axios.get("http://192.168.86.162:5000/items/all").then(async (res: any) => {
      setItems(res.data);
    });
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location1: any = 0;
      location1 = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Lowest,
      });
      if (location1 !== 0) {
        console.log(location1);
        setLatitude(location1.coords.latitude);
        setLongitude(location1.coords.longitude);
      } else {
        console.log(location1);
      }
    })();
  }, []);

  useEffect(() => {
    if (latitude !== 0 && longitude !== 0) {
      console.log(latitude, longitude);
      setLocationLoaded(true);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (items.length > 0 && latitude !== 0 && longitude !== 0) {
      showMap(true);
      setLocationLoaded(true);
    }
  }, [items, latitude, longitude]);

  useEffect(() => {
    if (map == true && locationLoaded == true) {
      const interval = setInterval(() => {
        axios
          .get("http://192.168.86.162:5000/items/all")
          .then(async (res: any) => {
            setItems(res.data);
          });
      }, 100000);
      return () => clearInterval(interval);
    }
  }, [map, locationLoaded]);

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
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.05,
            }}
          >
            {items
              ? items.map((item: any) => (
                  <Marker key={item._id} coordinate={item.coordinate}>
                    <FontAwesome name="map-marker" size={24} color="#0096FF" />
                  </Marker>
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
