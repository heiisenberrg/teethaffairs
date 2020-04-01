import React from 'react';
import { View } from 'react-native';

import UserDentalHistory from '../../components/UserDentalHistory';

import styles from './styles';

function DentalHistory(props) {
	return (
		<View style={ styles.container }>
			<UserDentalHistory { ...props } />
		</View>
	);
}

export default DentalHistory;
