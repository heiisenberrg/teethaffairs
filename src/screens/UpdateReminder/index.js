import React from 'react';
import { View } from 'react-native';

import UpdateUserReminder from '../../components/UpdateUserReminder';

import styles from './styles';

function UpdateReminder(props) {
	return (
		<View style={ styles.container }>
			<UpdateUserReminder { ...props } />
		</View>
	);
}

export default UpdateReminder;
