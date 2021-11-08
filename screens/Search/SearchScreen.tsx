// @ts-ignore
import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TextInput,
	Keyboard,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import {
	useFonts,
	Oswald_300Light,
	Oswald_400Regular,
	Oswald_500Medium,
	Oswald_600SemiBold,
	Oswald_700Bold,
} from '@expo-google-fonts/oswald';
import AppLoading from 'expo-app-loading';
import { FontAwesome } from '@expo/vector-icons';
import Categories from '../../data/categories/Categories';
import { SafeAreaView } from 'react-native-safe-area-context';
var axios = require('axios');

interface Props {
	navigation: any;
}

const DismissKeyboard = (props: {
	children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
}) => {
	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			{props.children}
		</TouchableWithoutFeedback>
	);
};

const SearchScreen: React.FC<Props> = ({ navigation }) => {
	const [query, setQuery] = useState('');
	const [data, setData] = useState<CategoryQuery[]>([]);
	const [original, setOriginal] = useState<CategoryQuery[]>([]);
	useEffect(() => {
		const getCategories = async () => {
			let result = await axios.get('http://192.168.86.166:5001/category/all');
			setOriginal(result.data);
			setData(result.data.slice());
		};
		getCategories();
	}, []);

	const updateQuery = (input: any) => {
		setQuery(input);
		setData(original.slice());
		console.log(query);
	};

	interface CategoryQuery {
		_id: any;
		id: number;
		name: string;
		__v: any;
	}

	const filterCategories = (category: CategoryQuery) => {
		// 1.
		let search = query;
		//2.
		if (category.name.startsWith(search)) {
			return category.name;
		} else {
			data.splice(data.indexOf(category), 1);
			return null;
		}
	};
	let [fontsLoaded] = useFonts({
		Oswald_300Light,
		Oswald_400Regular,
		Oswald_500Medium,
		Oswald_600SemiBold,
		Oswald_700Bold,
	});

	useEffect(() => {
		setQuery('');
		return () => {
			setQuery('');
		};
	}, []);

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return (
			<DismissKeyboard>
				<SafeAreaView>
					<View
						style={{
							marginTop: 0,
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<FontAwesome name="search" size={24} color="#0096FF" style={{ marginBottom: 20 }} />
						<TextInput
							placeholder={'What Would You Like to Buy?'}
							style={styles.textInput}
							onChangeText={updateQuery}>
							{query}
						</TextInput>
					</View>
					<FlatList
						data={data}
						extraData={query}
						keyExtractor={(item) => {
							return item.id.toString();
						}}
						renderItem={({ item }) => (
							<TouchableOpacity onPress={() => {}}>
								<Text style={styles.flatList}>{filterCategories(item)}</Text>
							</TouchableOpacity>
						)}
					/>
				</SafeAreaView>
			</DismissKeyboard>
		);
	}
};

const styles = StyleSheet.create({
	searchBar: {
		marginTop: 50,
		height: '15%',
	},
	textInput: {
		height: 40,
		borderWidth: 1,
		padding: 10,
		width: Dimensions.get('window').width - 100,
		borderRadius: 15,
		margin: 10,
		marginBottom: 30,
		fontFamily: 'Oswald_500Medium',
		textAlign: 'center',
	},
	flatList: {
		paddingLeft: '40%',
		padding: 20,
		fontSize: 20,
		fontFamily: 'Oswald_500Medium',
	},
});

export default SearchScreen;
