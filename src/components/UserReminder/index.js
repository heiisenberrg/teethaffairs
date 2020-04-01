import React from 'react';
import { View, Text, Button, Picker, TextInput } from 'react-native';

import styles from './styles';

function UserReminder(props) {
	const { navigation } = props;
	return (
		<View>
			<Text style={ styles.reminderHeaderText }>add a reminder</Text>
			<View style={ styles.remainderWrap }>
				<View>
					<Text style={ styles.dropDown }>User</Text>
					<View style={ styles.pickerWrap }>
						<Picker style={ styles.pickerHeader }>
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
					<Text style={ styles.descText }>Description</Text>

					<View style={ styles.descWrap }>
						<TextInput
							style={ styles.descInput }
							underlineColorAndroid="transparent"
							placeholderTextColor="grey"
							numberOfLines={ 10 }
							multiline={ true }
						/>
					</View>
				</View>
				<View style={ styles.buttonWrap }>
					<Button
						title="save"
						onPress={ () => navigation.navigate('UpdateReminder') }
						color="#0080ff"
					/>
				</View>
			</View>
		</View>
	);
}

export default UserReminder;
