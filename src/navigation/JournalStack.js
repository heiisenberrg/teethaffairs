import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Text } from 'react-native';

import Journal from '../screens/Journal';
import AddDentalNote from '../screens/AddDentalNote';
import DentalVisits from '../screens/DentalVisits';
import CreateDentalVisit from '../screens/CreateDentalVisit';
import DentalHistory from '../screens/DentalHistory';
import NotePreview from '../screens/Preview';
import AddQuestion from '../screens/AddQuestion';
import DentistResponse from '../screens/DentistResponse';

import styles from './styles';

const Stack = createStackNavigator();

function JournalStack() {
	return (
		<Stack.Navigator
			screenOptions={ () => ({
				gestureEnabled: false,
				headerTintColor: 'white'
			}) }
			initialRouteName="Journal"
			>
			<Stack.Screen
				name="Journal"
				component={ Journal }
				options={ {
					headerTitle: 'Journal',
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
					}
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
				name="DentalVisits"
				component={ DentalVisits }
				options={ {
					headerTitle: 'Dental Visits',
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
				name="CreateDentalVisit"
				component={ CreateDentalVisit }
				options={ {
					headerTitle: 'Add Dental Visits',
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
				name="DentistResponse"
				component={ DentistResponse }
				options={ {
					headerTitle: 'Dentist Response',
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
				name="DentalHistory" 
				component={ DentalHistory } 
				options={ {
					headerTitle: 'Remote Consultation',
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
		</Stack.Navigator>
	);
}

export default JournalStack;
