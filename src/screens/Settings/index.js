import React, { useLayoutEffect, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import Icon from '../../components/global/Icon';
import globalStyles from '../../globalStyles';

import { getLogOut, setLogOut } from '../../state/actions/user';
import localStorage from '../../state/localstorage';
import { getCards } from '../../state/actions/payment';
import { useIsFocused } from '@react-navigation/native';
import FlashMessage from '../../components/global/FlashMessage';

function Settings(props) {
	const { getLogOut, navigation, user, upgraded, getCards, cards } = props;
	const isFocused = useIsFocused();

	useLayoutEffect(() => {
		if (
			user &&
			(user.user_type === 'PRIMARY_PATIENT' ||
				user.user_type === 'PRIMARY-PATIENT')
		) {
			navigation.setOptions({ headerShown: false });
		}
	}, [ navigation ]);

	const onSuccess = () => {
		localStorage.clearAll();
		localStorage.removeItem('accessToken');
		navigation.navigate('OnBoarding', { screen: 'Login' });
	};

	const logoutHandler = () => {
		getLogOut({ navigation, onSuccess });
	};

	useEffect(
		function() {
			if (user.user_type !== 'DOCTOR') {
				getCards();
			}
		},
		[ isFocused ]
	);

	const handleUpgrade = () => {
		if (cards !== null && cards.length === 0) {
			FlashMessage.message(
				'Alert',
				'Please add your debit card / credit card details',
				'#33b5e5'
			);
		} else {
			navigation.navigate('ChangeCard', { source: 'settings' });
		}
	};
	return (
		<View style={ styles.container }>
			<ScrollView showsVerticalScrollIndicator={ false }>
				{user &&
					(user.user_type === 'PRIMARY_PATIENT' ||
						user.user_type === 'PRIMARY-PATIENT') && (
						<LinearGradient
							locations={ [ 0.1, 0.5, 0.8 ] }
							colors={ [ '#0A8A7B', '#33D197', '#00C57D' ] }
							style={ styles.upgradeContainer }>
							<Text style={ styles.header }>Settings</Text>
							<Text style={ styles.planText }>
								{user.upgraded || upgraded
									? 'you are in upgraded app'
									: 'you are using the basic plan !'}
							</Text>
							<Text style={ styles.paymentText1 }>
								{user.upgraded || upgraded
									? 'Now you can store all the data permanently.'
									: 'Upgrade Your App with Just $10'}
							</Text>
							<Text style={ styles.paymentText2 }>
								{user.upgraded || upgraded
									? ''
									: 'and store all the data permanently in the app'}
							</Text>
							{user.upgraded || upgraded ? (
								<Text />
							) : (
								<View style={ styles.buttonWrap }>
									<TouchableOpacity
										style={ globalStyles.tertiaryButton }
										onPress={ handleUpgrade }>
										<Text style={ globalStyles.tertiaryButtonText }>
											upgrade app
										</Text>
									</TouchableOpacity>
								</View>
							)}
						</LinearGradient>
					)}
				<TouchableOpacity
					style={ styles.linkContainer }
					onPress={ () => navigation.navigate('Profile') }>
					<View style={ styles.imageContainer }>
						<Icon
							type={ 'FontAwesome' }
							name={ 'user' }
							size={ 22 }
							color={ '#b8b8b8' }
						/>
					</View>
					<View style={ styles.buttonTextContainer }>
						<Text style={ styles.buttonText }>Profile</Text>
					</View>
				</TouchableOpacity>
				{user && user.user_type !== 'DOCTOR' && (
					<TouchableOpacity
						style={ styles.linkContainer }
						onPress={ () => navigation.navigate('AddMembers') }>
						<View style={ styles.imageContainer }>
							<Icon
								type={ 'FontAwesome5' }
								name={ 'users' }
								size={ 22 }
								color={ '#b8b8b8' }
							/>
						</View>
						<View style={ styles.buttonTextContainer }>
							<Text style={ styles.buttonText }>Manage Family Members</Text>
						</View>
					</TouchableOpacity>
				)}
				{user &&
					(user.user_type === 'PRIMARY_PATIENT' ||
						user.user_type === 'PRIMARY-PATIENT' ||
						user.user_type === 'DOCTOR') && (
						<TouchableOpacity
							style={ styles.linkContainer }
							onPress={ () => navigation.navigate('Payment') }>
							<View style={ styles.imageContainer }>
								<Icon
									type={ 'FontAwesome5' }
									name={ 'credit-card' }
									size={ 22 }
									color={ '#b8b8b8' }
								/>
							</View>
							<View style={ styles.buttonTextContainer }>
								<Text style={ styles.buttonText }>Payment</Text>
							</View>
						</TouchableOpacity>
					)}
				<TouchableOpacity
					style={ styles.linkContainer }
					onPress={ () => 
						(user && user.user_type === 'DOCTOR' ?
						navigation.navigate('History', {
								screen: 'DoctorHistory' }) : navigation.navigate('History'))
						}>					
					<View style={ styles.imageContainer }>
						<Icon
							type={ 'FontAwesome5' }
							name={ 'clock' }
							size={ 22 }
							color={ '#b8b8b8' }
						/>
					</View>
					<View style={ styles.buttonTextContainer }>
						<Text style={ styles.buttonText }>History</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					style={ styles.linkContainer }
					onPress={ () => navigation.navigate('AboutUs') }>
					<View style={ styles.imageContainer }>
						<Icon
							type={ 'FontAwesome5' }
							name={ 'info' }
							size={ 22 }
							color={ '#b8b8b8' }
						/>
					</View>
					<View style={ styles.buttonTextContainer }>
						<Text style={ styles.buttonText }>About Us</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					style={ styles.linkContainer }
					onPress={ () => navigation.navigate('ContactUs') }>
					<View style={ styles.imageContainer }>
						<Icon
							type={ 'FontAwesome5' }
							name={ 'map-marker-alt' }
							size={ 22 }
							color={ '#b8b8b8' }
							style={ styles.profileIcon }
						/>
					</View>
					<View style={ styles.buttonTextContainer }>
						<Text style={ styles.buttonText }>Contact Us</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={ styles.linkContainer } onPress={ logoutHandler }>
					<View style={ styles.imageContainer }>
						<Icon
							type={ 'FontAwesome5' }
							name={ 'power-off' }
							size={ 22 }
							color={ '#b8b8b8' }
							style={ styles.profileIcon }
						/>
					</View>
					<View style={ styles.buttonTextContainer }>
						<Text style={ styles.buttonText }>Logout</Text>
					</View>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
}

function mapStateToProps(state) {
	return {
		user: state.user.user,
		upgraded: state.payment.upgraded,
		cards: state.payment.cards
	};
}

export default connect(
	mapStateToProps,
	{
		getLogOut,
		setLogOut,
		getCards
	}
)(Settings);
