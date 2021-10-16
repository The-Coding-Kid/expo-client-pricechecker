import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import * as Font from 'expo-font';
var axios = require('axios');
import AppLoading from 'expo-app-loading';
import LoginForm from './LoginForm';

interface Props {
	navigation: any;
}

const fetchFonts = () => {
	return Font.loadAsync({
		'oswald-bold': require('../../assets/fonts/Oswald/static/Oswald-Bold.ttf'),
		'oswald-extralight': require('../../assets/fonts/Oswald/static/Oswald-ExtraLight.ttf'),
		'oswald-light': require('../../assets/fonts/Oswald/static/Oswald-Light.ttf'),
		'oswald-medium': require('../../assets/fonts/Oswald/static/Oswald-Medium.ttf'),
		'oswald-regular': require('../../assets/fonts/Oswald/static/Oswald-Regular.ttf'),
		'oswald-semibold': require('../../assets/fonts/Oswald/static/Oswald-SemiBold.ttf'),
	});
};

const DismissKeyboard = (props: {
	children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
}) => {
	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			{props.children}
		</TouchableWithoutFeedback>
	);
};

const Login: React.FC<Props> = (props) => {
	const [loaded, setLoaded] = useState<Boolean>(false);

	if (!loaded) {
		return (
			<AppLoading startAsync={fetchFonts} onFinish={() => setLoaded(true)} onError={(err) => {}} />
		);
	}

	return (
		<DismissKeyboard>
			<View style={styles.container}>
				<Text style={{ fontFamily: 'oswald-regular', fontSize: 40 }}>Log In</Text>
				<LoginForm navigation={props.navigation} />
				<StatusBar style="auto" />
			</View>
		</DismissKeyboard>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		paddingTop: 50,
	},
	textInput: {
		borderColor: 'black',
		borderWidth: 1,
		width: 200,
		marginTop: 40,
		height: 45,
	},
});

export default Login;
