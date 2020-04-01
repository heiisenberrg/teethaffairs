import React from 'react';
import { View, Text, Button } from 'react-native';

function UpdateUserReminder(props) {
	const { navigation } = props;

	return (
		<View>
			<Text>UPDATE REMINDER</Text>
			<Button title="Done" onPress={ () => navigation.navigate('Home') } />
		</View>
	);
}

export default UpdateUserReminder;
