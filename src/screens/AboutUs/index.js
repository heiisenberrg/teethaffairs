import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

function AboutUs() {
	return (
		<View style={ styles.container }>
			<Text  style={ styles.textStyle }>
			Teethaffairs is your mobile dentist app that is with you all the time to remind you it's time to brush and floss every night, keep track of your dental visits, a journal of dental issues for future reference and finally ask personalized dental questions that could potentially save a visit to the dentist or let you know that it's time to see one.
			</Text>
			<Text style={ styles.boldText }>
				We charge a one time fee of $10 to 
			</Text>
				<Text style={ styles.listText }> a) Add custom bruising reminder times and more features as the application evolves </Text>
				<Text style={ styles.listText }> b) Save questions , answers, </Text>
				<Text style={ styles.listText }> c) Dental notes, </Text>
				<Text style={ styles.listText }> d) Dental visit details   </Text>
		</View>
	);
}

export default AboutUs;
