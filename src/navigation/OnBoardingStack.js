import React from 'react';
import { Image, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import AppIntro from '../screens/AppIntro';
import ForgetPassword from '../screens/ForgetPassword';
import ResetPassword from '../screens/ResetPassword';
import EmailVerification from '../screens/EmailVerification';
import globalStyles from '../globalStyles';

const Stack = createStackNavigator();

function LogoTitle() {
	return (
		<View>
			<Image
				source={ require('../assets/header-logo.png') }
				style={ globalStyles.con }
			/>
		</View>
	);
}

function OnBoarding() {
	return (
		<Stack.Navigator
			screenOptions={ {
				headerTintColor: 'white'
			} }>
			<Stack.Screen
				name="AppIntro"
				component={ AppIntro }
				options={ {
					headerShown: false
				} }
			/>

			<Stack.Screen
				name="Login"
				component={ Login }
				options={ {
					headerLeft: null,
					headerTitle: props => <LogoTitle { ...props } />,
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontWeight: 'bold',
						color: 'white'
					},
					headerTitleContainerStyle: {
						marginTop: 70,
						alignItems: 'center'
					},
					headerStyle: {
						backgroundColor: '#129079',
						height: 83
					}
				} }
			/>
			<Stack.Screen
				name="SignUp"
				component={ SignUp }
				options={ {
					headerLeft: null,
					headerTitle: props => <LogoTitle { ...props } />,
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontWeight: 'bold',
						color: 'white'
					},
					headerTitleContainerStyle: {
						marginTop: 70,
						alignItems: 'center'
					},
					headerStyle: {
						backgroundColor: '#129079',
						height: 83
					}
				} }
			/>
			<Stack.Screen
				name="ForgetPassword"
				component={ ForgetPassword }
				options={ {
					headerShown: false
					// header: null
					// headerTitle: props => <LogoTitle {...props} />,
					// headerTitleAlign: 'center',
					// headerTitleContainerStyle: {
					// 	marginTop: 40,
					// 	alignItems: 'center'
					// },
					// headerStyle: {
					// 	backgroundColor: '#14DF94',
					// 	height: 100
					// }
				} }
			/>
			<Stack.Screen
				name="EmailVerification"
				component={ EmailVerification }
				options={ {
					headerTitle: props => <LogoTitle { ...props } />,
					headerTitleAlign: 'center',
					headerTitleContainerStyle: {
						marginTop: 70,
						alignItems: 'center'
					},
					headerStyle: {
						backgroundColor: '#129079',
						height: 83
					}
				} }
			/>
			<Stack.Screen
				name="ResetPassword"
				component={ ResetPassword }
				options={ {
					headerTitle: props => <LogoTitle { ...props } />,
					headerTitleAlign: 'center',
					headerTitleContainerStyle: {
						marginTop: 70,
						alignItems: 'center'
					},
					headerStyle: {
						backgroundColor: '#129079',
						height: 83
					}
				} }
			/>
		</Stack.Navigator>
	);
}

export default OnBoarding;
