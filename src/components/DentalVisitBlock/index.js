import React from 'react';
import { View, Button, Text } from 'react-native';

import styles from './styles';

function DentalVisitBlock(props) {
	const { navigation } = props;
	return (
		<View style={ styles.dentalBlock }>
			<View style={ styles.dentalHeaderWrapper }>
				<Button
					color="green"
					title="visit"
					onPress={ () => navigation.navigate('AddDentalVisit') }
				/>
				<View style={ styles.dentalHeaderContainer }>
					<Text style={ styles.dentalHeaderText1 }>dental visits</Text>
					<Text style={ styles.dentalHeaderText2 }>
						save your dental visit to keep track
					</Text>
					<Text style={ styles.dentalHeaderText3 }>of dental problems.</Text>
				</View>
			</View>
		</View>
	);
}

export default DentalVisitBlock;
