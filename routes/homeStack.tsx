import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../screens/Register/Register';
import Login from '../screens/Login/Login';
import { NavigationContainer } from '@react-navigation/native';
import Profile from '../screens/Profile/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import { Ionicons } from '@expo/vector-icons';
import Search from '../screens/Search/Search';
import SearchScreen from '../screens/Search/SearchScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const SearchStack = createStackNavigator();

const SearchStackScreen = () => {
	return (
		<SearchStack.Navigator>
			<SearchStack.Screen
				name="Search"
				component={Search}
				options={{
					headerShown: false,
				}}
			/>
			<SearchStack.Group screenOptions={{ presentation: 'modal' }}>
				<SearchStack.Screen
					name="Search Bar"
					component={SearchScreen}
					options={{
						headerShown: false,
					}}
				/>
			</SearchStack.Group>
		</SearchStack.Navigator>
	);
};

const MainTabNavigator = () => {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'Home') {
						iconName = focused ? 'home' : 'home-outline';
					} else if (route.name === 'Profile') {
						iconName = focused ? 'person' : 'person-outline';
					} else if (route.name === 'Search') {
						iconName = focused ? 'search' : 'search-outline';
					}
					//@ts-ignore
					return <Ionicons name={iconName} size={size} color={color} />;
				},
			})}>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="Search"
				component={SearchStackScreen}
				options={{
					headerShown: false,
				}}
			/>
		</Tab.Navigator>
	);
};

const Navigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
				<Stack.Screen name="Register" options={{ headerShown: false }} component={Register} />
				<Stack.Screen name="Main" options={{ headerShown: false }} component={MainTabNavigator} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Navigator;
