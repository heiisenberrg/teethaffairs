import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import EmailVerificationBlock from '../../components/EmailVerificationBlock';

function EmailVerification(props) {
	return (
		<View style={ styles.container }>
			<EmailVerificationBlock { ...props } />
		</View>
	);
}

export default EmailVerification;
