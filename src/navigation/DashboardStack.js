import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import AddMembers from '../screens/AddMembers';
import AddQuestion from '../screens/AddQuestion';
import SetReminder from '../screens/SetReminder';
import Journal from '../screens/Journal';
import Dashboard from '../screens/Dashboard';
import UpdateMembers from '../screens/UpdateMembers';
import UpdateReminder from '../screens/UpdateReminder';
import Payment from '../screens/Payment';
import ConfirmPay from '../screens/ConfirmPay';

import { Image, Text, View } from 'react-native';

import styles from './styles';

const Stack = createStackNavigator();

function LogoTitle() {
	return (
		<View style={ styles.container }>
			<Image style={ styles.icon } source={ require('../assets/logo-color.png') } />
			<View style={ styles.companyTextWrap }>
				<Text style={ styles.companyText1 }>teeth</Text>
				<Text style={ styles.companyText2 }>affairs</Text>
			</View>
		</View>
	);
}

function DashboardStack() {
	return (
		<Stack.Navigator
			screenOptions={ {
				headerTintColor: 'white'
			} }>
			<Stack.Screen
				name="Home"
				component={ Dashboard }
				options={ {
					headerTitle: props => <LogoTitle { ...props } />,
					headerTitleAlign: 'center',
					headerTitleContainerStyle: {
						alignItems: 'center',
						justifyContent: 'center',
						alignContent: 'center',
						alignSelf: 'center'
					},
					headerStyle: {
						backgroundColor: 'white',
						height: 93
					}
				} }
			/>
			<Stack.Screen
				name="AddMembers"
				component={ AddMembers }
				options={ {
					headerTitle: 'Members',
					headerTitleAlign: 'center',
					headerTitleContainerStyle: {
						alignItems: 'center'
					},
					headerStyle: {
						backgroundColor: '#0A8A7B',
						height: 80
					},
					headerTitleStyle: {
						color: 'white',
						fontSize: 20
					}
				} }
			/>
			<Stack.Screen
				name="AddQuestion"
				component={ AddQuestion }
				options={ {
					headerTitle: 'What the issue?',
					headerTitleAlign: 'center',
					headerTitleContainerStyle: {
						alignItems: 'center'
					},
					headerStyle: {
						backgroundColor: '#129079',
						height: 83
					},
					headerTitleStyle: {
						color: 'white',
						fontSize: 25,
						fontWeight: 'bold',
						alignSelf: 'center'
					}
				} }
			/>
			<Stack.Screen name="SetReminder" component={ SetReminder } />
			<Stack.Screen name="Journal" component={ Journal } />
			<Stack.Screen
				name="UpdateMembers"
				component={ UpdateMembers }
				options={ {
					headerTitle: 'New members',
					headerTitleAlign: 'center',
					headerTitleContainerStyle: {
						alignItems: 'center'
					},
					headerStyle: {
						backgroundColor: '#0A8A7B',
						height: 80
					},
					headerTitleStyle: {
						color: 'white',
						fontSize: 20
					}
				} }
			/>
			<Stack.Screen name="UpdateReminder" component={ UpdateReminder } />
			<Stack.Screen name="Payment" component={ Payment } />
			<Stack.Screen name="ConfirmPay" component={ ConfirmPay } />
		</Stack.Navigator>
	);
}

export default DashboardStack;
