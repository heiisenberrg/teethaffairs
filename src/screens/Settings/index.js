import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import globalStyles from '../../globalStyles';

import history from '../../assets/history.png';
import payment from '../../assets/payment.png';
import aboutUs from '../../assets/aboutus-icon.png';
import contactUs from '../../assets/contactus.png';
import logout from '../../assets/logout.png';

import { getLogOut, setLogOut } from '../../state/actions/user';

function Settings(props) {
	const { getLogOut, navigation, is_verified } = props;

	const logoutHandler = () => {
		getLogOut(onGetLogOutSuccess, onGetLogOutFailure);
	};

	const onGetLogOutSuccess = data => {
		console.log('api success', data);
	};
	const onGetLogOutFailure = error => {
		console.log('fail', error.data.detail);
	};

	useEffect(
		function storeLoginResponse() {
			storeResponseData();
		},
		[ is_verified ]
	);

	const storeResponseData = () => {
		if (is_verified === false) {
			navigation.navigate('Login');
		}
	};
	return (
		<View style={ styles.container }>
			<ScrollView>
				<LinearGradient
					locations={ [ 0.1, 0.5, 0.8 ] }
					colors={ [ '#0A8A7B', '#33D197', '#00C57D' ] }
					style={ styles.upgradeContainer }>
					<Text style={ styles.header }>Settings</Text>
					<Text style={ styles.planText }>you are using the basic plan !</Text>
					<Text style={ styles.paymentText1 }>
						Upgrade Your App with Just $10
					</Text>
					<Text style={ styles.paymentText2 }>
						and store all the data permanently in the app
					</Text>
					<View style={ styles.buttonWrap }>
						<TouchableOpacity
							style={ globalStyles.tertiaryButton }
							onPress={ () => navigation.navigate('SignUp') }>
							<Text style={ globalStyles.tertiaryButtonText }>upgrade app</Text>
						</TouchableOpacity>
					</View>
				</LinearGradient>
				<TouchableOpacity
					style={ styles.linkContainer }
					onPress={ () => navigation.navigate('AddMembers') }>
					<View style={ styles.imageContainer }>
						<Image source={ history } style={ styles.icons } />
					</View>
					<View style={ styles.buttonTextContainer }>
						<Text style={ styles.buttonText }>Profile</Text>
					</View>
				</TouchableOpacity>
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
		is_verified: state.user.is_verified
	};
}

export default connect(mapStateToProps, {
	getLogOut,
	setLogOut
})(Settings);