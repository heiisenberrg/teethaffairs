import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

function DentalHistoryBlock(props) {
	const { navigation } = props;
	return (
		<TouchableOpacity
			onPress={ () => navigation.navigate('DentalHistory') }
			activeOpacity={ 0.8 }
		>
			<View style={ styles.dentalBlock }>
				<View style={ styles.journalNotification }>
					<Text style={ styles.journalNotificationText }>2</Text>
				</View>
				<View style={ styles.dentalHeaderWrapper }>
					<View style={ styles.dentalHeaderContainer }>
						<Text style={ styles.dentalHeaderText1 }>
							remote consultation
						</Text>
						<Text style={ styles.dentalHeaderText2 }>
							create your full dental history and
						</Text>
						<Text style={ styles.dentalHeaderText3 }>share in e-mail</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default DentalHistoryBlock;
