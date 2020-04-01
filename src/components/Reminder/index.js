import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';

function Reminder() {
	return (
		<View style={ styles.container }>
			<View style={ styles.headerContainer }>
				<Text style={ styles.headerText }>your recent dental visit</Text>
				<Image
					style={ styles.iconStyle }
					source={ require('../../assets/more.png') }
				/>
			</View>
			<View style={ styles.mapContainer }>
				<View style={ styles.map }>
					<Text>map</Text>
				</View>
				<View style={ styles.map1 }>
					<Text style={ styles.headerStyle }>Dr. John</Text>
					<Text>dental care clinic, new york, usa</Text>
					<Text>8 am, 02/25/20202</Text>
				</View>
				<View style={ styles.map2 }>
					<Text style={ styles.headerStyle }>$20</Text>
					<Text>Paid</Text>
				</View>
			</View>
		</View>
	);
}

export default Reminder;
