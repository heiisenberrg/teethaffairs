import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Settings from '../screens/Settings';
import Payment from '../screens/Payment';
import ContactUs from '../screens/ContactUs';
import AboutUs from '../screens/AboutUs';
import Profile from '../screens/Profile';
import ChangeCard from '../components/UserPayment/ChangeCard';

const Stack = createStackNavigator();

function SettingStack() {
	return (
		<Stack.Navigator
			screenOptions={ {
				headerTintColor: 'white'
			} }
			initialRouteName="Settings"
			>
			<Stack.Screen
				name="Settings"
				component={ Settings }
				options={ {
					headerTitle: 'Settings',
					headerTitleAlign: 'center',
					headerTitleContainerStyle: {
						alignItems: 'center',
						justifyContent: 'center'
					},
					headerStyle: {
						backgroundColor: '#108E79',
						height: 100
					},
					headerTitleStyle: {
						color: 'white',
						fontSize: 20
					}
				}  }
			/>
			<Stack.Screen name="Payment" component={ Payment } options={ {
					headerTitle: 'My Cards',
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
				} }/>
				<Stack.Screen name="ChangeCard" component={ ChangeCard } options={ {
					headerTitle: 'Payment',
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
				} }/>

			<Stack.Screen
				name="Profile"
				component={ Profile }
				options={ {
					headerTitle: 'Profile',
					headerTitleAlign: 'center',
					headerTitleContainerStyle: {
						alignItems: 'center',
						justifyContent: 'center'
					},
					headerStyle: {
						backgroundColor: '#108E79',
						height: 100
					},
					headerTitleStyle: {
						color: 'white',
						fontSize: 20
					},
					headerBackTitleVisible: false
				} }
			/>
			<Stack.Screen
				name="ContactUs"
				component={ ContactUs }
				options={ {
					headerTitle: 'Contact Us',
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
						fontSize: 20
					}
				} }
			/>
			<Stack.Screen
				name="AboutUs"
				component={ AboutUs }
				options={ {
					headerTitle: 'About Us',
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

export default SettingStack;
