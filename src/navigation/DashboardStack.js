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

const Stack = createStackNavigator();

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
					headerTitleAlign: 'center',
					headerTitleContainerStyle: {
						alignItems: 'center'
					},
					headerStyle: {
						backgroundColor: '#14DF94',
						height: 170
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
					headerTitle: 'Ask Your Dental Question',
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
						fontWeight: 'bold'
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
