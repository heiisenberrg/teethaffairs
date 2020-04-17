import React from 'react';
import { View, Image , Text, TouchableOpacity } from 'react-native';

import styles from './styles';
import globalStyles from '../../globalStyles';

function VerificationSuccess(props) {
	const { navigation } = props;
	return (
		<View style={ styles.container }>
				<Image source={ require('../../assets/success.png') } style={ styles.logo }/>
				<Text style={ styles.content1 }>password reset sucesss</Text>
				<View style={ styles.buttonWrap }>
				<TouchableOpacity
						style={ globalStyles.normalButton }
						onPress={ () => navigation.navigate('Login') }
						>
						<Text style={ globalStyles.buttonText }>Login</Text>
					</TouchableOpacity>
				</View>
		</View>
	);
}

export default VerificationSuccess;
