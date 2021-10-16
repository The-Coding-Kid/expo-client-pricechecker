import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
interface Props {
	onPress: any;
	text: string;
}

// @ts-ignore
const LoginButton: React.FC<Props> = ({ onPress, text }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.button}>
				<Text style={styles.buttonText}>{text}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		borderRadius: 8,
		paddingVertical: 14,
		paddingHorizontal: 10,
		marginTop: 20,
		backgroundColor: '#0c1ec7',
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		fontSize: 16,
		textAlign: 'center',
	},
});

export default LoginButton;
