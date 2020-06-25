import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

import OnBoardingStack from './OnBoardingStack';
import AppTabs from './AppTabs';
import ReminderNotification from '../screens/Reminder/Notification';
import firebase from 'react-native-firebase';
import * as RootNavigation from './RootNavigation.js';
import store from '../state/store';

import { connect } from 'react-redux';

import { getLoginSuccess, setDeviceToken } from '../state/actions/user';

const Stack = createStackNavigator();

function MainStack(props) {
	const { isAuth, user, setDeviceToken } = props;

	if (user && Object.keys(user).length > 0) {
		store.dispatch(getLoginSuccess(user));
	}

	useEffect(() => {
		checkPermission();
		messageListener();
	}, []);

	const checkPermission = async () => {
		const enabled = await firebase.messaging().hasPermission();
		if (enabled) {
			getFcmToken();
		} else {
			requestPermission();
		}
	};

	const getFcmToken = async () => {
		const fcmToken = await firebase.messaging().getToken();
		if (fcmToken) {
			setDeviceToken(fcmToken);
		}
		await firebase
			.messaging()
			.ios.registerForRemoteNotifications()
			.then(async () => {
				await firebase
					.messaging()
					.ios.getAPNSToken()
					/* eslint-disable no-unused-vars */
					.then(apns => {})
					.catch(() => {});
			})
			.catch(err => {});
			/* eslint-enable no-unused-vars */
	};

	const requestPermission = async () => {
		try {
			await firebase.messaging().requestPermission();
			getFcmToken();
		} catch (error) {
			// User has rejected permissions
		}
	};

	const messageListener = async () => {
		const channel = new firebase.notifications.Android.Channel(
			'channelId',
			'Channel Name',
			firebase.notifications.Android.Importance.Max
		).setDescription('A natural description of the channel');
		firebase.notifications().android.createChannel(channel);

		this.notificationListener = firebase
			.notifications()
			.onNotification(notification => {
				const { title, body } = notification;
				if (Platform.OS === 'android') {
					const localNotification = new firebase.notifications.Notification({
						sound: 'default',
						show_in_foreground: true,
						alert: true
					})
						.setNotificationId(notification.notificationId)
						.setTitle(title)
						.setSubtitle(notification.subtitle)
						.setBody(body)
						.setData(notification.data)
						.android.setChannelId('channelId')
						.android.setColor('#000000') // you can set a color here
						.android.setPriority(firebase.notifications.Android.Priority.High);

					firebase
						.notifications()
						.displayNotification(localNotification)
						.catch(err => console.error(err));
				} else if (Platform.OS === 'ios') {
					const localNotification = new firebase.notifications.Notification()
						.setNotificationId(notification.notificationId)
						.setTitle(notification.title)
						.setSubtitle(notification.subtitle)
						.setBody(notification.body)
						.setData(notification.data)
						.ios.setBadge(notification.ios.badge);

					firebase
						.notifications()
						.displayNotification(localNotification)
						.catch(err => console.error(err));
				}
			});

		this.notificationOpenedListener = firebase
			.notifications()
			.onNotificationOpened(notificationOpen => {
				if (notificationOpen.notification._data.type === 'reminder') {
					RootNavigation.navigate('ReminderNotification', {
						id: notificationOpen.notification._data.id
					});
				}
			});

		const notificationOpen = await firebase
			.notifications()
			.getInitialNotification();
		if (notificationOpen) {
			if (notificationOpen.notification._data.type === 'reminder') {
				RootNavigation.navigate('ReminderNotification', {
					id: notificationOpen.notification._data.id
				});
			}
		}
		/* eslint-disable no-unused-vars */
		this.messageListener = firebase.messaging().onMessage(message => {});
		/* eslint-enable no-unused-vars */
	};

	return (
		<Stack.Navigator
			screenOptions={ () => ({
				gestureEnabled: false
			}) }
			headerMode="none">
			{isAuth ? (
				<>
					<Stack.Screen
						name="AppTabs"
						component={ AppTabs }
						options={ {
							gestureEnabled: false
						} }
					/>
					<Stack.Screen name="OnBoarding" component={ OnBoardingStack } />
					<Stack.Screen
						name="ReminderNotification"
						component={ ReminderNotification }
					/>
				</>
			) : (
				<>
					<Stack.Screen name="OnBoarding" component={ OnBoardingStack } />
					<Stack.Screen name="AppTabs" component={ AppTabs } />
					<Stack.Screen
						name="ReminderNotification"
						component={ ReminderNotification }
					/>
				</>
			)}
		</Stack.Navigator>
	);
}

const mapDispatchToProps = dispatch => ({
	setDeviceToken: token => dispatch(setDeviceToken(token))
});

export default connect(
	null,
	mapDispatchToProps
)(MainStack);
