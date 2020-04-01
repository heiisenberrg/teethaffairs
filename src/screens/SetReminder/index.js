import React from 'react';
import { View } from 'react-native';

import UserReminder from '../../components/UserReminder';

import styles from './styles';

function SetReminder(props) {
	return (
		<View style={ styles.container }>
			<UserReminder { ...props } />
		</View>
	);
}

export default SetReminder;
