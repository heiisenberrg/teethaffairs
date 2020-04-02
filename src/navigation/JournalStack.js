import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Journal from '../screens/Journal';
import AddDentalNote from '../screens/AddDentalNote';
import AddDentalVisit from '../screens/AddDentalVisit';
import DentalHistory from '../screens/DentalHistory';

const Stack = createStackNavigator();

function JournalStack() {
	return (
		<Stack.Navigator
			screenOptions={ {
				headerTintColor: 'white'
			} }>
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
						fontSize: 25
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
			<Stack.Screen name="AddDentalVisit" component={ AddDentalVisit } />
			<Stack.Screen name="DentalHistory" component={ DentalHistory } />
		</Stack.Navigator>
	);
}

export default JournalStack;
