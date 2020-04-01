import React from 'react';
import { View } from 'react-native';

import styles from './styles';
import ForgetPasswordBlock from '../../components/ForgetPasswordBlock';

function ForgetPassword(props) {
	return (
		<View style={ styles.container }>
			<ForgetPasswordBlock { ...props } />
		</View>
	);
}

export default ForgetPassword;
