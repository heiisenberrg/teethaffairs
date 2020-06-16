import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';

import Dashboard from './DashboardStack';
import Journal from './JournalStack';
import History from './HistoryStack';
import Settings from './SettingsStack';
import Notification from './NotificationStack';

import HomeIcon from '../assets/logo-color.png';
import Icon from '../components/global/Icon';

import styles from './styles';
const Tab = createBottomTabNavigator();

function AppTabs(props) {
	const { user, navigation } = props;

	const [ doesLoggedInUserDoctor, setDoesLoggedInUserDoctor ] = useState(false);

	useEffect(() => {
		setDoesLoggedInUserDoctor(user && user.user_type === 'DOCTOR');
	}, [ user ]);

	return (
		<Tab.Navigator
			tabBarOptions={ {
				activeTintColor: '#00C57D'
			} }
			initialRouteName={ doesLoggedInUserDoctor ? 'Teledental' : 'Home' }>
			<Tab.Screen
				name="History"
				component={ History }
				options={ {
					tabBarLabel: 'History',
					tabBarIcon: () => {
						return<Icon
						type={ 'FontAwesome5' }
						name={ 'clock' }
						size={ 22 }
						color={ '#b8b8b8' }
					/>;
					}
				} }
				listeners={ {
					tabPress: () => {
						navigation.dispatch(
							CommonActions.reset({
								index: 0,
								routes: [ { name: 'AppTabs', key: 'History' } ]
							})
						);
						navigation.navigate('History');
					}
				} }
				listeners={ {
					tabPress: () => {
						navigation.dispatch(
							CommonActions.reset({
								index: 0,
								routes: [ { name: 'AppTabs', key: 'History' } ]
							})
						);
						navigation.navigate('History');
					}
				} }
			/>
			<Tab.Screen
				name= { doesLoggedInUserDoctor ? 'Teledental' : 'Journal' }
				component={ doesLoggedInUserDoctor ? Dashboard : Journal }
				options={ {
					tabBarLabel: doesLoggedInUserDoctor ? 'Teledental' : 'Journal',
					tabBarIcon: () => {
						return<Icon
						type={ 'FontAwesome' }
						name={ 'folder' }
						size={ 22 }
						color={ '#b8b8b8' }
					/>;
					}
				} }
				listeners={ {
					tabPress: () => {
						navigation.dispatch(
							CommonActions.reset({
								index: 0,
								routes: [ { name: 'AppTabs', key: doesLoggedInUserDoctor ? 'Teledental' : 'Journal' } ]
							})
						);
						navigation.navigate(doesLoggedInUserDoctor ? 'Teledental' : 'Journal');
					}
				} }
				listeners={ {
					tabPress: () => {
						navigation.dispatch(
							CommonActions.reset({
								index: 0,
								routes: [ { name: 'AppTabs', key: doesLoggedInUserDoctor ? 'Teledental' : 'Journal' } ]
							})
						);
						navigation.navigate(doesLoggedInUserDoctor ? 'Teledental' : 'Journal');
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
				listeners={ {
					tabPress: () => {
						navigation.dispatch(
							CommonActions.reset({
								index: 0,
								routes: [ { name: 'AppTabs', key: 'Home' } ]
							})
						);
						navigation.navigate('Home');
					}
				} }
			/>
			<Tab.Screen
				name="Notification"
				component={ Notification }
				options={ {
					tabBarLabel: 'Notification',
					tabBarIcon: () => {
						return<Icon
						type={ 'FontAwesome' }
						name={ 'bell' }
						size={ 22 }
						color={ '#b8b8b8' }
					/>;
					}
				} }
				listeners={ {
					tabPress: () => {
						navigation.dispatch(
							CommonActions.reset({
								index: 0,
								routes: [ { name: 'AppTabs', key: 'Notification' } ]
							})
						);
						navigation.navigate('Notification');
					}
				} }
				listeners={ {
					tabPress: () => {
						navigation.dispatch(
							CommonActions.reset({
								index: 0,
								routes: [ { name: 'AppTabs', key: 'Notification' } ]
							})
						);
						navigation.navigate('Notification');
					}
				} }
			/>

			<Tab.Screen
				name="Settings"
				component={ Settings }
				options={ {
					tabBarLabel: 'Settings',
					tabBarIcon: () => {
						return	<Icon
						type={ 'FontAwesome' }
						name={ 'gear' }
						size={ 22 }
						color={ '#b8b8b8' }
					/>;
					}
				} }
				listeners={ {
					tabPress: () => {
						navigation.dispatch(
							CommonActions.reset({
								index: 0,
								routes: [ { name: 'AppTabs', key: 'Settings' } ]
							})
						);
						navigation.navigate('Settings');
					}
				} }
				listeners={ {
					tabPress: () => {
						navigation.dispatch(
							CommonActions.reset({
								index: 0,
								routes: [ { name: 'AppTabs', key: 'Settings' } ]
							})
						);
						navigation.navigate('Settings');
					}
				} }
			/>
		</Tab.Navigator>
	);
}

const mapStateToProps = state => ({
	user: state.user.user
});



export default connect(mapStateToProps,  null)(AppTabs);
