import React from 'react';
import { View } from 'react-native';

import UserPayment from '../../components/UserPayment';

import styles from './styles';

function Payment(props) {
	return (
		<View style={ styles.container }>
			<UserPayment { ...props } />
		</View>
	);
}

export default Payment;
