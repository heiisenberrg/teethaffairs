import React from 'react';
import { View, Image } from 'react-native';

// import LinearGradient from 'react-native-linear-gradient';
// import firebase from 'react-native-firebase';

import styles from './styles';

function Splash() {
	// useEffect(() => {
	// 	const enabled = firebase.messaging().hasPermission();
	// 	if (enabled) {
	// 		firebase.notifications().onNotification(() => {
	// 			alert('got a notification');
	// 		});
	// 	} else {
	// 		try {
	// 			firebase.messaging().requestPermission();
	// 		} catch (e) {
	// 			alert('user rejected the permissions');
	// 		}
	// 	}
	// }
	// , []);

	return (
		<View style={ styles.container }>
			<View style={ styles.logoTextWrap }>
				<Image source={ require('../../assets/logo-white.png') } />
				<Image source={ require('../../assets/company-text.png') } />
			</View>
		</View>
	);
}

export default Splash;
