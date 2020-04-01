import React from 'react';
import { View } from 'react-native';

import ResetPasswordBlock from '../../components/ResetPasswordBlock';
import styles from './styles';

function ResetPassword(props) {
	return (
		<View style={ styles.container }>
			<ResetPasswordBlock { ...props } />
		</View>
	);
}

export default ResetPassword;
