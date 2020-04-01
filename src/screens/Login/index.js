import React from 'react';
import { View } from 'react-native';

import LoginForm from '../../components/LoginForm';

import styles from './styles';

function Login(props) {
	return (
		<View style={ styles.container }>
			<LoginForm { ...props } />
		</View>
	);
}

export default Login;
