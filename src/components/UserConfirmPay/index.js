import React from 'react';
import { View, Text, Button } from 'react-native';

import styles from './styles';

function UserConfirmPay(props) {
	const { navigation } = props;

	const onPressHandler = () => {
		navigation.navigate('Home');
	};
	return (
		<View style={ styles.container }>
			<Text>ConfirmPay</Text>
			<View>
				<Text>Bank Name</Text>
				<Button title="pay now" onPress={ onPressHandler } />
			</View>
		</View>
	);
}

export default UserConfirmPay;
