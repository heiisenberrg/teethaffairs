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
import RemoteConsultation from '../screens/RemoteConsultation';
import ListReminder from '../screens/Reminder/List';
import CreateReminder from '../screens/Reminder/Create';
import AddDentalNote from '../screens/AddDentalNote';
import NotePreview from '../screens/Preview';
import RemoteConsultationRequest from '../screens/RemoteConsultationRequest';

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
			screenOptions={ () => ({
				gestureEnabled: false,
				headerTintColor: 'white'
			}) }
			initialRouteName="Home"
		>
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
						height: 90,
						shadowOpacity: 2,
						shadowOffset: { height: 2, width: 2 },
						shadowRadius: 2,
						elevation: 10
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
					},
					headerBackTitleVisible: false
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
					},
					headerBackTitleVisible: false
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
					},
					headerBackTitleVisible: false
				} }
			/>
			<Stack.Screen
				name="CreateReminder"
				component={ CreateReminder }
				options={ {
					headerTitle: 'Brush/Floss Reminder',
					headerTitleAlign: 'center',
					headerTitleContainerStyle: {
						alignItems: 'center'
					},
					headerStyle: {
						backgroundColor: '#108E79',
						height: 80
					},
					headerTitleStyle: {
						color: 'white',
						fontWeight: 'bold',
						fontSize: 16
					},
					headerBackTitleVisible: false
				} }
			/>
			<Stack.Screen
				name="ListReminder"
				component={ ListReminder }
				options={ {
					headerTitle: 'Brush/Floss Reminder',
					headerTitleAlign: 'center',
					headerTitleContainerStyle: {
						alignItems: 'center'
					},
					headerStyle: {
						backgroundColor: '#108E79',
						height: 80,
						shadowOpacity: 0,
						shadowOffset: { height: 0, width: 0 },
						shadowRadius: 0,
						elevation: 0
					},
					headerTitleStyle: {
						color: 'white',
						fontWeight: 'bold',
						fontSize: 16
					},
					headerBackTitleVisible: false
				} }
			/>
			<Stack.Screen name="UpdateReminder" component={ UpdateReminder } />
			<Stack.Screen name="Payment" component={ Payment } />
			<Stack.Screen name="ConfirmPay" component={ ConfirmPay } />
			<Stack.Screen
				name="RemoteConsultation"
				component={ RemoteConsultation }
				options={ {
					headerTitle: 'Start Remote Consultation',
					headerTitleAlign: 'center',
					headerTitleContainerStyle: {
						alignItems: 'center'
					},
					headerStyle: {
						backgroundColor: '#129079',
						height: 85
					},
					headerTitleStyle: {
						color: '#FFFFFF',
						fontSize: 20,
						alignSelf: 'center',
						alignItems: 'center'
					},
					headerBackTitleVisible: false
				} }
			/>
			<Stack.Screen
				name="RemoteConsultationRequest"
				component={ RemoteConsultationRequest }
				options={ {
					headerTitle: 'Remote Consultation Request',
					headerTitleAlign: 'center',
					headerTitleContainerStyle: {
						alignItems: 'center'
					},
					headerStyle: {
						backgroundColor: '#129079',
						height: 85
					},
					headerTitleStyle: {
						color: '#FFFFFF',
						fontSize: 20,
						alignSelf: 'center',
						alignItems: 'center'
					},
					headerBackTitleVisible: false
				} }
			/>
			<Stack.Screen
				name="AddDentalNote"
				component={ AddDentalNote }
				options={ {
					headerTitle: 'Notes',
					headerTitleAlign: 'center',
					headerTitleContainerStyle: {
						alignItems: 'center'
					},
					headerStyle: {
						backgroundColor: '#108E79',
						height: 80,
						shadowOpacity: 0,
						shadowOffset: { height: 0, width: 0 },
						shadowRadius: 0,
						elevation: 0
					},
					headerTitleStyle: {
						color: 'white',
						fontWeight: 'bold',
						fontSize: 16
					},
					headerBackTitleVisible: false
				} }
			/>
			<Stack.Screen
				name="Note Preview"
				component={ NotePreview }
				options={ {
					headerTitle: props => (
						<Text style={ styles.noteTitle }>{props.children}</Text>
					),
					headerTitleAlign: 'center',
					headerTitleContainerStyle: {
						alignItems: 'center'
					},
					headerStyle: {
						backgroundColor: '#129079',
						height: 85
					},
					headerTitleStyle: {
						color: '#FFFFFF',
						fontSize: 20,
						alignSelf: 'center',
						alignItems: 'center'
					},
					headerBackTitleVisible: false
				} }
			/>
		</Stack.Navigator>
	);
}

export default DashboardStack;
