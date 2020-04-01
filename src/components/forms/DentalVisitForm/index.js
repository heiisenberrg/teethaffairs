import React from 'react';
import { View, Button, Text, TextInput, Picker } from 'react-native';

import styles from './styles';

function DentalVisitForm(props) {
	const { navigation } = props;
	return (
		<View>
			<Text style={ styles.headerStyle }>add dental visit</Text>
			<View style={ styles.dentalVisitWrapper }>
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
				<View>
					<Text style={ styles.note }>Notes</Text>

					<View style={ styles.noteWrapper }>
						<TextInput
							style={ styles.noteText }
							underlineColorAndroid="transparent"
							placeholderTextColor="grey"
							numberOfLines={ 10 }
							multiline={ true }
						/>
					</View>
				</View>
				<View>
					<Text style={ styles.feesText }>Fees Paid</Text>

					<View style={ styles.feesWrapper }>
						<TextInput
							style={ styles.feesInput }
							underlineColorAndroid="transparent"
							placeholderTextColor="grey"
							numberOfLines={ 10 }
							multiline={ true }
						/>
					</View>
				</View>
				<View style={ styles.buttonWrapper }>
					<Button
						title="save"
						onPress={ () => navigation.navigate('Journal') }
						color="#0080ff"
					/>
				</View>
			</View>
		</View>
	);
}

export default DentalVisitForm;
