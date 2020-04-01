import React from 'react';
import { View } from 'react-native';

import UserConfirmPay from '../../components/UserConfirmPay';

import styles from './styles';

function ConfirmPay(props) {
	return (
		<View style={ styles.container }>
			<UserConfirmPay { ...props } />
		</View>
	);
}

export default ConfirmPay;
