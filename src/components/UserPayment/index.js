import React from 'react';
import { View, Text, Button } from 'react-native';

function UserPayment(props) {
	const { navigation } = props;

	return (
		<View>
			<Text>Payment</Text>
			<View>
				<Text>Bank Name</Text>
				<Button
					title="confirm pay"
					onPress={ () => navigation.navigate('ConfirmPay') }
				/>
			</View>
		</View>
	);
}

export default UserPayment;
