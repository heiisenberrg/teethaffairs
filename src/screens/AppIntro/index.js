import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';
import globalStyles from '../../globalStyles';
import styles from './styles';
import slider1 from '../../assets/slider-home.png';
import slider2 from '../../assets/slider-home2.png';
import slider3 from '../../assets/slider-home3.png';

const slides = [
	{
		key: 'key1',
		title: slider1,
		text: 'Teledentistry for Remote Consultation, Triage and Screening'
	},
	{
		key: 'key2',
		title: slider2,
		text:
			'Save money by improving your family dental and general health with Teathaffairs compliance builder and tracker'
	},
	{
		key: 'key3',
		title: slider3,
		text:
			'Teethaffairs app can help you to keep track of your family dental and oral issuses for future reference.',
		subText:
			'(A onetime upgrade fees $10.00 to store your data forever. Basic app stores data for a limited time.)'
	}
];

function AppIntro(props) {
	const { navigation } = props;
	const renderItem = ({ item }) => {
		return (
			<View style={ styles.container }>
				<View style={ styles.logoWrapper }>
					<Image
						source={ require('../../assets/logo.png') }
						style={ styles.logo }
					/>
					<View style={ styles.companyTextWrapper }>
						<Text style={ styles.companyText1 }>teeth</Text>
						<Text style={ styles.companyText2 }>affairs</Text>
					</View>
				</View>
				<View style={ styles.slidesHome }>
					{/* <Image source={item.title} style={styles.slideImage} /> */}
				</View>

				<Text style={ styles.decription }>{item.text}</Text>
				<Text style={ styles.decription1 }>{item.subText}</Text>
			</View>
		);
	};

	const renderNextButton = () => {
		return (
			<View style={ styles.buttonWrapper }>
				<TouchableOpacity
					style={ globalStyles.skipButton }
					onPress={ () => navigation.navigate('Login') }>
					<Text style={ globalStyles.tertiaryButtonText }>Skip Intro</Text>
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<AppIntroSlider
			slides={ slides }
			renderItem={ renderItem }
			dotStyle={ styles.dotStyle }
			activeDotStyle={ styles.activeDotStyle }
			renderNextButton={ renderNextButton }
			renderDoneButton={ renderNextButton }
			bottomButton
		/>
	);
}

export default AppIntro;
