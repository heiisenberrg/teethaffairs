import React from 'react';
import { View, Text, Picker } from 'react-native';

import styles from './styles';

function History() {
	return (
		<View>
			<Text>history block</Text>
			<View style={ styles.pickerWrapper }>
				<Picker style={ styles.pickerHeader }>
					<Picker.Item label="Select Doctor" value="" />
					<Picker.Item label="User" value="User" />
					<Picker.Item label="Doctor" value="User" />
					<Picker.Item label="Doctor" value="User" />
					<Picker.Item label="Doctor" value="User" />
					<Picker.Item label="Doctor" value="User" />
				</Picker>
			</View>
		</View>
	);
}

export default History;
