import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from '../global/Icon';

import styles from './styles';

function DentalVisitBlock(props) {
	const { navigation } = props;
	return (
		<TouchableOpacity
			onPress={ () => navigation.navigate('DentalVisits') }
			activeOpacity={ 0.8 }
		>
			<View style={ styles.dentalBlock }>
				{/* <View style={ styles.journalNotification }>
					<Text style={ styles.journalNotificationText }>2</Text>
				</View> */}
				<View style={ styles.dentalHeaderWrapper }>
					<Icon 
						type={ 'FontAwesome5' }
						name={ 'notes-medical' }
						size={ 36 }
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
		</TouchableOpacity>
	);
}

export default DentalVisitBlock;
