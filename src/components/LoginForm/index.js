import React, { useState } from 'react';
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
import { getLogin, setLogin } from '../../state/actions/user';

import loginStyles from './styles';
import styles from '../SignUpForm/styles';
import globalStyles from '../../globalStyles';

/* eslint-disable no-undef */

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

const loginSchema = yup.object({
	username: yup
		.string()
		.required()
		.min(4),
	password: yup.string().required()
});

function LoginForm(props) {
	const { getLogin, navigation, setLogin } = props;
	const [ showEye, setShowEye ] = useState(true);
	const [ errorMessage, setErrorMessage ] = useState('');

	const onGetLoginSuccess = userDetails => {
		navigation.navigate('AppTabs');
		setLogin(userDetails);
	};

	const onGetLoginFailure = error => {
		if (error.data.detail !== undefined) {
			setErrorMessage(error.data.detail);
		} else {
			setErrorMessage('Please check your password or username');
		}
	};

	const handleSubmit = data => {
		getLogin(data, onGetLoginSuccess, onGetLoginFailure);
	};

	const handleForgetPwd = () => {
		navigation.navigate('ForgetPassword');
	};

	const passwordHandler = () => {
		setShowEye(!showEye);
	};

	return (
		<>
			<View style={ styles.logoHeader }>
				<TouchableOpacity style={ styles.filter }>
					<View style={ styles.filterWrapper }>
						<Image
							style={ styles.avatar }
							source={ require('../../assets/logo-color.png') }
						/>
					</View>
				</TouchableOpacity>
			</View>
			<SafeAreaView style={ styles.container }>
				<ScrollView>
					<Text style={ loginStyles.header }>Login</Text>
					<Formik
						initialValues={ { username: 'doctordanny1', password: '123456' } }
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
											<Text style={ loginStyles.label }>User ID / Email ID</Text>
										</View>
										<TextInput
											style={ loginStyles.textInput }
											placeholder="Enter Your User ID / Email ID"
											onChangeText={ props.handleChange('username') }
											value={ props.values.username }
											onBlur={ props.handleBlur('username') }
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
									<Text style={ loginStyles.note }>
										If you are a doctor please enter your email ID
									</Text>
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
									<TouchableOpacity
										style={ globalStyles.secondaryButton }
										onPress={ () => navigation.navigate('SignUp') }>
										<Text style={ globalStyles.buttonText }>sign up</Text>
									</TouchableOpacity>
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

function mapStateToProps(state) {
	return {
		is_verified: state.user.is_verified,
		user_type: state.user.user_type,
		access: state.user.access
	};
}

export default connect(
	mapStateToProps,
	{
		getLogin,
		setLogin
	}
)(LoginForm);
