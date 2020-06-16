import React from 'react';
import { Image, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import AppIntro from '../screens/AppIntro';
import ForgetPassword from '../screens/ForgetPassword';
import ResetPassword from '../screens/ResetPassword';
import EmailVerification from '../screens/EmailVerification';
import AccountSuccess from '../screens/AccountSuccess';
import VerificationSuccess from '../screens/VerificationSuccess';
import PasswordResetVerify from '../screens/PasswordResetVerify';
import TermsAndConditions from '../screens/TermsAndConditions';

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
				headerTintColor: 'white',
				gestureEnabled: false
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
					headerTitleAlign: 'center',
					headerTitleContainerStyle: {
						alignItems: 'center'
					},
					headerStyle: {
						backgroundColor: '#108E79',
						height: 23,
						shadowOpacity: 0,
						shadowOffset: { height: 0, width: 0 },
						shadowRadius: 0,
						elevation: 0
					},
					headerTitleStyle: {
						color: '#129079'
					},
					headerBackTitleVisible: false
				} }
			/>
			<Stack.Screen
				name="SignUp"
				component={ SignUp }
				options={ {
					headerLeft: null,
					headerTitleAlign: 'center',
					headerTitleContainerStyle: {
						alignItems: 'center'
					},
					headerStyle: {
						backgroundColor: '#108E79',
						height: 23,
						shadowOpacity: 0,
						shadowOffset: { height: 0, width: 0 },
						shadowRadius: 0,
						elevation: 0
					},
					headerTitleStyle: {
						color: '#129079'
					},
					headerBackTitleVisible: false
				} }
			/>
				<Stack.Screen
				name="AccountSuccess"
				component={ AccountSuccess }
				options={ {
					headerShown: false
				} }
			/>
				<Stack.Screen
				name="VerificationSuccess"
				component={ VerificationSuccess }
				options={ {
					headerShown: false
				} }
			/>
			<Stack.Screen
				name="ForgetPassword"
				component={ ForgetPassword }
				options={ {
					headerShown: false
				} }
			/>
			<Stack.Screen
				name="PasswordResetVerify"
				component={ PasswordResetVerify }
				options={ {
					headerShown: false
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
					headerLeft: null,
					headerTitleAlign: 'center',
					headerTitleContainerStyle: {
						alignItems: 'center'
					},
					headerStyle: {
						backgroundColor: '#108E79',
						height: 23,
						shadowOpacity: 0,
						shadowOffset: { height: 0, width: 0 },
						shadowRadius: 0,
						elevation: 0
					},
					headerTitleStyle: {
						color: '#129079'
					},
					headerBackTitleVisible: false
				} }
			/>
			<Stack.Screen
				name="TermsAndConditions"
				component={ TermsAndConditions }
				options={ {
					headerBackTitleVisible: false,
					headerTitle: 'Terms & Conditions',
					headerTitleAlign: 'center',
					headerTitleContainerStyle: {
						alignItems: 'center'
					},
					headerStyle: {
						backgroundColor: '#129079',
						height: 80
					},
					headerTitleStyle: {
						color: 'white',
						fontSize: 20
					}
				} }
			/>
		</Stack.Navigator>
	);
}

export default OnBoarding;
