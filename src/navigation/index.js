import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import { Alert, Platform } from 'react-native';
import MainStack from './MainStack';
import store from '../state/store';
import { getLoginSuccess, setDeviceToken } from '../state/actions/user';
import firebase from 'react-native-firebase';

function MainNavigation(props) {
	const { user, setDeviceToken, navigation } = props;
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

		await firebase.messaging().ios.registerForRemoteNotifications().then(async () => {
			await firebase.messaging().ios.getAPNSToken().then(() => {
			}).catch(() => {});
        }).catch(() => {
        });
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

		this.notificationListener = firebase.notifications().onNotification((notification) => {
			const { title, body } = notification;
			if (Platform.OS === 'android') {

				const localNotification = new firebase.notifications.Notification({
					sound: 'default',
					show_in_foreground: true
					})
					.setNotificationId(notification.notificationId)
					.setTitle(title)
					.setSubtitle(notification.subtitle)
					.setBody(body)
					.setData(notification.data)
					.android.setChannelId('channelId')
					.android.setColor('#000000') // you can set a color here
					.android.setPriority(firebase.notifications.Android.Priority.High);
		
				firebase.notifications()
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
		
				firebase.notifications()
					.displayNotification(localNotification)
					.catch(err => console.error(err));
			}
		});
		
		this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
			const { title, body } = notificationOpen.notification;
			Alert.alert(title, body);
			if (body.reminder) {
				navigation.navigate('ReminderNotification');
			}
		});
		
		const notificationOpen = await firebase.notifications().getInitialNotification();
		if (notificationOpen) {
			const { title, body } = notificationOpen.notification;
			Alert.alert(title, body);
		}
		
		this.messageListener = firebase.messaging().onMessage(() => {
		});
	};

	return (
		<NavigationContainer>
			<MainStack isAuth={ props.isAuth } />
		</NavigationContainer>
	);
}

const mapDispatchToProps = dispatch => ({
	setDeviceToken: (token) => dispatch(setDeviceToken(token))
});

export default connect(null, mapDispatchToProps)(MainNavigation);
