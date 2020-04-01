import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

function Question(props) {
	const { navigation } = props;
	return (
		<View>
			<View style={ styles.container }>
				<View style={ styles.headerContainer }>
					<Text style={ styles.headerText }>your recent question</Text>
				</View>
				<View style={ styles.mapContainer }>
					<View style={ styles.map1 }>
						<Text style={ styles.headerStyle }>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text
						</Text>
					</View>
					<View style={ styles.map2 }>
						<Text>map</Text>
					</View>
				</View>
			</View>

			<TouchableOpacity
				style={ styles.signupButton }
				onPress={ () => navigation.navigate('AddQuestion') }>
				<Text style={ styles.loginText }>ask a question</Text>
			</TouchableOpacity>
		</View>
	);
}

export default Question;
