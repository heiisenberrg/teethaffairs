import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import AppIntroSlider from 'react-native-app-intro-slider';

import globalStyles from '../../globalStyles';
import styles from './styles';

import slider1 from '../../assets/slider-home.png';
import slider2 from '../../assets/slider-home2.png';
import slider3 from '../../assets/slider-home3.png';
import { getLoginSuccess } from '../../state/actions/user';

const slides = [
	{
		key: 'one',
		title: slider1,
		text: 'Teledentistry for Remote Consultations, Triage and Screening.'
	},
	{
		key: 'two',
		title: slider2,
		text:
			'Save money by improving your family\'s dental and general health with Teathaffairs compliance builder and tracker.'
	},
	{
		key: 'three',
		title: slider3,
		text:
			'Teethaffairs app can help you to keep track of your family\'s dental and oral issuses for future reference.',
		subText:
			'(A onetime upgrade fees $10.00 to store your data forever. Basic app stores data for a limited time.)'
	}
];

function AppIntro(props) {
	const { navigation } = props;
	const renderItem = ({ item }) => {
		return (
			<View style={ styles.container }>
				<View style={ styles.subContainer }>
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
					{item.key === 'one' ? (
						<View style={ styles.slidesHome }>
							<Image source={ item.title } style={ styles.slideImage1 } />
						</View>
					) : item.key === 'two' ? (
						<View style={ styles.slidesHome }>
							<Image source={ item.title } style={ styles.slideImage2 } />
						</View>
					) : (
						<View style={ styles.slidesHome }>
							<Image source={ item.title } style={ styles.slideImage3 } />
						</View>
					)}

					<View style={ styles.contentWrap }>
						<Text style={ styles.decription }>{item.text}</Text>
						<Text style={ styles.decription1 }>{item.subText}</Text>
					</View>
				</View>
			</View>
		);
	};

	const handleSkipIntro = () => {
		navigation.navigate('Login');
	};

	const renderNextButton = () => {
		return (
			<View style={ styles.buttonWrapper }>
				<TouchableOpacity
					style={ globalStyles.skipButton }
					onPress={ handleSkipIntro }>
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

const mapStateToProps = state => ({
	user: state.user.user
});

const mapDispatchToProps = dispatch => ({
	loginSuccess: data => dispatch(getLoginSuccess(data))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AppIntro);
