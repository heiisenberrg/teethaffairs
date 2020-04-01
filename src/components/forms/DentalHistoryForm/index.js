import React from 'react';
import { View, Button, Text, Picker } from 'react-native';

import styles from './styles';

function DentalHistoryForm(props) {
	const { navigation } = props;
	return (
		<View>
			<Text style={ styles.title }>History</Text>
			<View>
				<Text style={ styles.title }>reason for visit</Text>
				<View style={ styles.pickerWrapper }>
					<Picker style={ styles.pickerContainer }>
						<Picker.Item label="select" value="" />
						<Picker.Item label="Family member1" value="User" />
						<Picker.Item label="Family member2" value="User" />
						<Picker.Item label="Family member3" value="User" />
						<Picker.Item label="Family member4" value="User" />
						<Picker.Item label="Family member5" value="User" />
					</Picker>
				</View>
			</View>
			<View styles={ styles.buttonWrap }>
				<Button
					title="save"
					onPress={ () => {
						navigation.navigate('Journal');
					} }
					color="#0080ff"
				/>
			</View>
		</View>
	);
}

export default DentalHistoryForm;
