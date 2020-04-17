import React from 'react';
import { View, Image , Text, TouchableOpacity, ScrollView } from 'react-native';

import styles from './styles';
import globalStyles from '../../globalStyles';

function AccountSuccess(props) {
	const { navigation } = props;
	return (
		<View style={ styles.container }>
				<ScrollView>
				<Image source={ require('../../assets/success.png') } style={ styles.logo }/>
				<Text style={ styles.content1 }>account created!</Text>
				<Text style={ styles.content2 }>You will receive a verification email to your </Text>
				<Text style={ styles.content3 }>Registered email ID</Text>
				<View style={ styles.buttonWrap }>
				<TouchableOpacity
						style={ globalStyles.normalButton }
						onPress={ () => navigation.navigate('Login') }
						>
						<Text style={ globalStyles.buttonText }>back</Text>
					</TouchableOpacity>
				</View>
				</ScrollView>
		</View>
	);
}

export default AccountSuccess;
