import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	SafeAreaView,
	Image,
	TextInput
} from 'react-native';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import * as yup from 'yup';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { getLogin, getLogOut, setLogOut } from '../../state/actions/user';

import loginStyles from './styles';
import styles from '../SignUpForm/styles';
import globalStyles from '../../globalStyles';
import FlashMessage from '../global/FlashMessage';
import localStorage from '../../state/localstorage';

/* eslint-disable no-undef */

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

const loginSchema = yup.object({
	username: yup
		.string()
		.required('Required')
		.test('Email', 'Provide a valid email ID', function(value) {
			const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/;
			if (!this.parent.isPatient) return emailPattern.test(value);
			return true;
		}),
	password: yup.string().required('Required'),
	isPatient: yup.boolean()
});

function LoginForm(props) {
	const { getLogin, navigation, user, deviceToken } = props;
	const [ showEye, setShowEye ] = useState(true);
	const [ isPatient, handleIspatient ] = useState(true);
	const [ errorMessage ] = useState('');

	useEffect(() => {
		if (user && Object.keys(user).length > 0) {
			if (user.approved_doctor === false && user.user_type === 'DOCTOR') {
				getLogOut({ navigation, onSuccess });
				FlashMessage.message(
					'Alert',
					'Your account is pending for the admin approval!',
					'red'
				);
			} else {
				navigation.navigate('AppTabs');
			}
		}
	}, [ user ]);

	const handleSubmit = data => {
		const userData = {
			username: data.username.toLowerCase(),
			password: data.password
		};
		getLogin(userData, deviceToken);
	};

	const handleForgetPwd = () => {
		navigation.navigate('ForgetPassword');
	};

	const passwordHandler = () => {
		setShowEye(!showEye);
	};

	const onSuccess = () => {
		localStorage.clearAll();
		localStorage.removeItem('accessToken');
		navigation.navigate('OnBoarding', { screen: 'Login' });
	};

	return (
		<>
			<View style={ styles.logoHeader }>
				<TouchableOpacity style={ styles.filter }>
					<View style={ styles.filterWrapper }>
						<Image
							style={ styles.avatar }
							source={ require('../../assets/logo/logo.png') }
						/>
					</View>
				</TouchableOpacity>
			</View>
			<SafeAreaView style={ styles.container }>
				<ScrollView>
					<View style={ loginStyles.groupButtonContainer }>
						<TouchableOpacity
							activeOpacity={ 0.8 }
							onPress={ () => handleIspatient(true) }>
							<Text
								style={ {
									...loginStyles.buttonLeftCorner,
									...(isPatient && loginStyles.activeGroupButton)
								} }>
								Patient
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={ 0.8 }
							onPress={ () => handleIspatient(false) }>
							<Text
								style={ {
									...loginStyles.buttonRightCorner,
									...(!isPatient && loginStyles.activeGroupButton)
								} }>
								Doctor
							</Text>
						</TouchableOpacity>
					</View>
					<Text style={ loginStyles.header }>Login</Text>
					<Formik
						initialValues={ {
							username: isPatient ? '' : '',
							password: '',
							isPatient
						} }
						enableReinitialize
						validationSchema={ loginSchema }
						onSubmit={ (values, actions) => {
							actions.resetForm();
							handleSubmit(values);
						} }>
						{props => (
							<View style={ styles.signupContainer }>
								<KeyboardAvoidingView
									behavior="absolute"
									keyboardVerticalOffset={ keyboardVerticalOffset }>
									<View style={ loginStyles.textInputContainer }>
										<View style={ loginStyles.labelContainer }>
											<Text style={ loginStyles.label }>
												{isPatient ? 'User ID' : 'Email ID'}
											</Text>
										</View>
										<TextInput
											style={ loginStyles.textInput }
											placeholder={ `Enter Your ${
												isPatient ? 'User' : 'Email'
											} ID` }
											onChangeText={ props.handleChange('username') }
											value={ props.values.username }
											onBlur={ props.handleBlur('username') }
											autoCapitalize="none"
											error={ props.touched.username && props.errors.username }
											secureTextEntry={ false }
										/>
										{props.touched.username && props.errors.username ? (
											<Text style={ loginStyles.errorText }>
												{props.errors.username}
											</Text>
										) : (
											<Text style={ loginStyles.errorText } />
										)}
									</View>
									<View style={ loginStyles.textInputContainer }>
										<View style={ loginStyles.labelContainer }>
											<Text style={ loginStyles.label }>Password</Text>
										</View>

										<TextInput
											style={ loginStyles.textInput }
											placeholder="Enter Your Password"
											onChangeText={ props.handleChange('password') }
											value={ props.values.password }
											onBlur={ props.handleBlur('password') }
											secureTextEntry={ showEye ? true : false }
										/>
										<TouchableOpacity
											onPress={ passwordHandler }
											style={ loginStyles.eyeIcon }>
											{showEye ? (
												<AntDesignIcon name="eye" size={ 17 } color="#5C5C5C" />
											) : (
												<AntDesignIcon name="eyeo" size={ 17 } color="#5C5C5C" />
											)}
										</TouchableOpacity>
										{props.touched.password && props.errors.password ? (
											<Text style={ loginStyles.errorText }>
												{props.errors.password}
											</Text>
										) : (
											<Text style={ loginStyles.errorText } />
										)}
									</View>
									<View style={ loginStyles.responseWrap }>
										{errorMessage !== undefined ? (
											<Text style={ loginStyles.failedResponse }>
												{errorMessage}
											</Text>
										) : (
											<Text style={ loginStyles.failedResponse }>
												Something went wrong!
											</Text>
										)}
									</View>
									<TouchableOpacity
										style={ globalStyles.primaryButton }
										onPress={ props.handleSubmit }>
										<Text style={ globalStyles.buttonText }>login</Text>
									</TouchableOpacity>
									{isPatient && (
										<TouchableOpacity
											style={ globalStyles.secondaryButton }
											onPress={ () => navigation.navigate('SignUp') }>
											<Text style={ globalStyles.buttonText }>sign up</Text>
										</TouchableOpacity>
									)}
									<View style={ styles.loginTermsWrapper }>
										<Text
											style={ loginStyles.forgetPassword }
											onPress={ handleForgetPwd }>
											Forget Password ?
										</Text>
									</View>
								</KeyboardAvoidingView>
							</View>
						)}
					</Formik>
				</ScrollView>
			</SafeAreaView>
		</>
	);
}

const mapStateToProps = state => ({
	user: state.user.user,
	loading: state.user.loading,
	deviceToken: state.user.deviceToken
});

const mapDispatchToProps = dispatch => ({
	getLogin: (data, token) => dispatch(getLogin(data, token)),
	getLogOut,
	setLogOut
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginForm);
