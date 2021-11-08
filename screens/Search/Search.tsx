import * as React from 'react';
//@ts-ignore
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import AppLoading from 'expo-app-loading';
import {
	useFonts,
	Oswald_300Light,
	Oswald_400Regular,
	Oswald_500Medium,
	Oswald_600SemiBold,
	Oswald_700Bold,
} from '@expo-google-fonts/oswald';
import SearchBar from '../../components/SearchBar';
var axios = require('axios');
import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';

interface Props {
	navigation: any;
}

//@ts-ignore
const Home: React.FC<Props> = ({ navigation }) => {
	let [fontsLoaded] = useFonts({
		Oswald_300Light,
		Oswald_400Regular,
		Oswald_500Medium,
		Oswald_600SemiBold,
		Oswald_700Bold,
	});

	const [items, setItems] = useState<any>([]);
	const [map, showMap] = useState<boolean>(false);
	const [latitude, setLatitude] = useState<number>(0);
	const [longitude, setLongitude] = useState<number>(0);
	const [locationLoaded, setLocationLoaded] = useState<boolean>(false);
	const [errorMsg, setErrorMsg] = useState<object | string>({});

	useEffect(() => {
		axios
			.get('http://192.168.86.193:5001/items/all')
			.then(async (res: any) => {
				setItems(res.data);
			})
			.catch(async (err: any) => {
				console.error('Error', err);
				showMap(false);
			});
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}

			let location1: any = 0;
			location1 = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.Lowest,
			});
			if (location1 !== 0) {
				setLatitude(location1.coords.latitude);
				setLongitude(location1.coords.longitude);
			} else {
				console.log(location1);
			}
		})();
	}, []);

	useEffect(() => {
		if (latitude !== 0 && longitude !== 0) {
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
				axios.get('http://192.168.86.166:5001/items/all').then(async (res: any) => {
					setItems(res.data);
				});
			}, 10000);
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
							navigation.navigate('Search Bar');
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
						}}>
						{items
							? items.map((item: any) => (
									<Marker key={item._id} coordinate={item.coordinate}>
										<FontAwesome name="map-marker" size={24} color="#0096FF" />
										<Callout
											style={{
												flex: -1,
												position: 'absolute',
												width: 60,
											}}>
											<Text>{item.name}</Text>
										</Callout>
									</Marker>
							  ))
							: console.log('No items')}
					</MapView>
				</View>
			);
		} else {
			return (
				<View style={styles.errorContainer}>
					<AppLoading />
					<ActivityIndicator size="large" color="#0096FF" />
					<Text style={{ fontFamily: 'Oswald_500Medium' }}>Loading...</Text>
				</View>
			);
		}
	}
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	map: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	errorContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Home;
