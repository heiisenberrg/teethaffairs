import React from 'react';
import { View, Button, Text } from 'react-native';

import styles from './styles';

function DentalNoteBlock(props) {
	const { navigation } = props;
	return (
		<View style={ styles.dentalBlock }>
			<View style={ styles.dentalHeaderWrapper }>
				<Button
					color="green"
					title="note"
					onPress={ () => navigation.navigate('AddDentalNote') }
				/>
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
	);
}

export default DentalNoteBlock;
