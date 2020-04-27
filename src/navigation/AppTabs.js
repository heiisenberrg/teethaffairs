import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';

import Dashboard from './DashboardStack';
import Journal from './JournalStack';
import History from './HistoryStack';
import Settings from './SettingsStack';
import Reminder from '../screens/Reminder';

import HomeIcon from '../assets/logo-color.png';
import HistoryIcon from '../assets/history.png';
import JournalIcon from '../assets/journal.png';
import SettingsIcon from '../assets/settings.png';
import NotificationIcon from '../assets/notification.png';

import styles from './styles';
const Tab = createBottomTabNavigator();

function AppTabs(props) {
	const { user_type } = props;
	console.warn('inside navigator', user_type);
	// if (user_type === 'DOCTOR') {
	// 	navigation.jumpTo('Teledental');
	// }
	return (
		<Tab.Navigator
			tabBarOptions={ {
				activeTintColor: '#00C57D'
			} }
			initialRouteName={ user_type === 'DOCTOR' ? 'Teledental' : 'Home' }>
			<Tab.Screen
				name="History"
				component={ History }
				options={ {
					tabBarLabel: 'History',
					tabBarIcon: ({ color }) => {
						return <Image source={ HistoryIcon } color={ color } />;
					}
				} }
			/>
			<Tab.Screen
				name= { user_type === 'DOCTOR' ? 'Teledental' : 'Journal' }
				component={ user_type === 'DOCTOR' ? Dashboard : Journal }
				options={ {
					tabBarLabel: user_type === 'DOCTOR' ? 'Teledental' : 'Journal',
					tabBarIcon: ({ color }) => {
						return <Image source={ JournalIcon } color={ color } />;
					}
				} }
			/>
			<Tab.Screen
				name="Home"
				component={ Dashboard }
				options={ {
					tabBarLabel: '',
					tabBarIcon: ({ color }) => {
						return (
							<Image source={ HomeIcon } color={ color } style={ styles.homeIcon } />
						);
					}
				} }
			/>
			<Tab.Screen
				name="Reminder"
				component={ Reminder }
				options={ {
					tabBarLabel: 'Notification',
					tabBarIcon: ({ color }) => {
						return <Image source={ NotificationIcon } color={ color } />;
					}
				} }
			/>

			<Tab.Screen
				name="Settings"
				component={ Settings }
				options={ {
					tabBarLabel: 'Settings',
					tabBarIcon: ({ color }) => {
						return <Image source={ SettingsIcon } color={ color } />;
					}
				} }
			/>
		</Tab.Navigator>
	);
}

const mapStateToProps = state => ({
	user_type: state.user.user_type
});

export default connect(mapStateToProps, null)(AppTabs);
