import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import History from '../screens/History';
import DentistResponse from '../screens/DentistResponse';


const Stack = createStackNavigator();

function HistoryStack() {
	return (
		<Stack.Navigator
			screenOptions={ () => ({
				gestureEnabled: false,
				headerTintColor: 'white'
			}) }
			initialRouteName="DoctorHistory"
		>
			<Stack.Screen
				name="DoctorHistory"
				component={ History }
				options={ {
					headerTitle: 'History',
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
		</Stack.Navigator>
	);
}

export default HistoryStack;
