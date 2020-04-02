import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import styles from './styles';

function DentalNoteBlock(props) {
	const { navigation } = props;
	return (
		<TouchableOpacity
			onPress={ () => navigation.navigate('AddDentalNote') }
			activeOpacity={ 0.8 }
		>
			<View style={ styles.dentalBlock }>
				<View style={ styles.journalNotification }>
					<Text style={ styles.journalNotificationText }>2</Text>
				</View>
				<View style={ styles.dentalHeaderWrapper }>
					<View style={ styles.dentalHeaderContainer }>
						<Text style={ styles.dentalHeaderText1 }>notes</Text>
						<Text style={ styles.dentalHeaderText2 }>
							save your dental queries as a note.
						</Text>
						<Text style={ styles.dentalHeaderText3 }>
							later you can ask as a question.
						</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default DentalNoteBlock;
