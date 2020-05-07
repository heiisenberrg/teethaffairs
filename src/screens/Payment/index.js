import React from 'react';
import { View } from 'react-native';

import PaymentList from '../../components/UserPayment/List';

import styles from './styles';

function Payment(props) {
	return (
		<View style={ styles.container }>
			<PaymentList { ...props } />
		</View>
	);
}

export default Payment;
