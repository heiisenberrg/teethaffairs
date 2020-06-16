import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import Icon from '../../components/global/Icon';
import globalStyles from '../../globalStyles';

import history from '../../assets/history.png';
import payment from '../../assets/payment.png';
import aboutUs from '../../assets/aboutus-icon.png';
import contactUs from '../../assets/contactus.png';
import logout from '../../assets/logout.png';

import { getLogOut, setLogOut } from '../../state/actions/user';

function Settings(props) {
	const { getLogOut, navigation, user } = props;

	useLayoutEffect(() => {
		if(user && (user.user_type === 'PRIMARY_PATIENT' || user.user_type === 'PRIMARY-PATIENT')) {
			navigation.setOptions({ headerShown: false });
		}
	}, [ navigation ]);

	const onSuccess = () => {
		navigation.navigate('OnBoarding', { screen: 'Login' });
	};

	const logoutHandler = () => {
		getLogOut({ navigation, onSuccess });
	};

	return (
		<View style={ styles.container }>
			<ScrollView>
				{
					user && (user.user_type === 'PRIMARY_PATIENT' || user.user_type === 'PRIMARY-PATIENT') &&
					<LinearGradient
						locations={ [ 0.1, 0.5, 0.8 ] }
						colors={ [ '#0A8A7B', '#33D197', '#00C57D' ] }
						style={ styles.upgradeContainer }>
						<Text style={ styles.header }>Settings</Text>
						<Text style={ styles.planText }>
						{user.upgraded ? 'you are in upgraded app' : 'you are using the basic plan !'}</Text>
						<Text style={ styles.paymentText1 }>
							{user.upgraded ? 'Now you can store all the data permanently.' : 'Upgrade Your App with Just $10'}
						</Text>
						<Text style={ styles.paymentText2 }>
							{user.upgraded ? '' : 
							'and store all the data permanently in the app'}
						</Text>
						{user.upgraded ? <Text></Text> : 
							<View style={ styles.buttonWrap }>
							<TouchableOpacity
								style={ globalStyles.tertiaryButton }
								onPress={ () => navigation.navigate('ChangeCard', { source: 'settings' }) }>
								<Text style={ globalStyles.tertiaryButtonText }>upgrade app</Text>
							</TouchableOpacity>
						</View>}

					</LinearGradient>
				}
				<TouchableOpacity
					style={ styles.linkContainer }
					onPress={ () => navigation.navigate('Profile') }>
					<View style={ styles.imageContainer }>
						<Icon type={ 'FontAwesome' }
							name={ 'user' }
							size={ 22 }
							color={ '#b8b8b8' }
							style={ styles.profileIcon }
						/>
					</View>
					<View style={ styles.buttonTextContainer }>
						<Text style={ styles.buttonText }>Profile</Text>
					</View>
				</TouchableOpacity>
				{
					user && user.user_type !== 'DOCTOR' &&
					<TouchableOpacity
						style={ styles.linkContainer }
						onPress={ () => navigation.navigate('AddMembers') }>
						<View style={ styles.imageContainer }>
							<Image source={ history } style={ styles.icons } />
						</View>
						<View style={ styles.buttonTextContainer }>
							<Text style={ styles.buttonText }>Manage Family Members</Text>
						</View>
					</TouchableOpacity>
				}
				{
					user && (user.user_type === 'PRIMARY_PATIENT' || user.user_type === 'PRIMARY-PATIENT') &&
					<TouchableOpacity
						style={ styles.linkContainer }
						onPress={ () => navigation.navigate('Payment') }>
						<View style={ styles.imageContainer }>
							<Image source={ payment } style={ styles.icons } />
						</View>
						<View style={ styles.buttonTextContainer }>
							<Text style={ styles.buttonText }>Payment</Text>
						</View>
					</TouchableOpacity>
				}
				<TouchableOpacity
					style={ styles.linkContainer }
					onPress={ () => navigation.navigate('History') }>
					<View style={ styles.imageContainer }>
						<Image source={ history } style={ styles.icons } />
					</View>
					<View style={ styles.buttonTextContainer }>
						<Text style={ styles.buttonText }>History</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					style={ styles.linkContainer }
					onPress={ () => navigation.navigate('AboutUs') }>
					<View style={ styles.imageContainer }>
						<Image source={ aboutUs } style={ styles.icons } />
					</View>
					<View style={ styles.buttonTextContainer }>
						<Text style={ styles.buttonText }>About Us</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					style={ styles.linkContainer }
					onPress={ () => navigation.navigate('ContactUs') }>
					<View style={ styles.imageContainer }>
						<Image source={ contactUs } style={ styles.icons } />
					</View>
					<View style={ styles.buttonTextContainer }>
						<Text style={ styles.buttonText }>Contact Us</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={ styles.linkContainer } onPress={ logoutHandler }>
					<View style={ styles.imageContainer }>
						<Image source={ logout } style={ styles.icons } />
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
		user: state.user.user
	};
}

export default connect(mapStateToProps, {
	getLogOut,
	setLogOut
})(Settings);
