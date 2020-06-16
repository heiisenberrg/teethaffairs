import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Notification from '../screens/Notification';

const Stack = createStackNavigator();

function NotificationStack() {
	return (
		<Stack.Navigator
			screenOptions={ () => ({
				gestureEnabled: false,
				headerTintColor: 'white'
			}) }
			initialRouteName="Notification"
		>
			<Stack.Screen
				name="Notification"
				component={ Notification }
				options={ {
					headerTitle: 'Notifications',
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

export default NotificationStack;
