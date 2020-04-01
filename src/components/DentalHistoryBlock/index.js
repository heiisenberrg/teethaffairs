import React from 'react';
import { View, Button, Text } from 'react-native';

import styles from './styles';

function DentalHistoryBlock(props) {
	const { navigation } = props;
	return (
		<View style={ styles.dentalBlock }>
			<View style={ styles.dentalHeaderWrapper }>
				<Button
					color="green"
					title="histi"
					onPress={ () => navigation.navigate('DentalHistory') }
				/>
				<View style={ styles.dentalHeaderContainer }>
					<Text style={ styles.dentalHeaderText1 }>
						dental questions and answers
					</Text>
					<Text style={ styles.dentalHeaderText2 }>
						create your full dental history and
					</Text>
					<Text style={ styles.dentalHeaderText3 }>share in e-mail</Text>
				</View>
			</View>
		</View>
	);
}

export default DentalHistoryBlock;
