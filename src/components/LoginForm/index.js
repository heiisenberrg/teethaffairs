import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-community/async-storage';

import TextInputField from '../textInputs/TextInputField';
import { getLogin, setLogin } from '../../state/actions/user';

import styles from './styles';
import globalStyles from '../../globalStyles';

const loginSchema = yup.object({
	username: yup
		.string()
		.required()
		.min(4),
	password: yup.string().required()
});

function LoginForm(props) {
	const { getLogin, navigation, is_verified, user_type, access } = props;
	const [ errorMessage, setErrorMessage ] = useState('');

	const onGetLoginSuccess = data => {
		console.log('api success', data);
	};
	const onGetLoginFailure = error => {
		console.log('fail', error.data.detail);

		setErrorMessage(error.data.detail);
	};

	const handleSubmit = data => {
		getLogin(data, onGetLoginSuccess, onGetLoginFailure);
	};

	useEffect(
		function storeLoginResponse() {
			storeResponseData();
		},
		[ is_verified ]
	);

	const storeResponseData = async () => {
		if (is_verified !== undefined) {
			await AsyncStorage.setItem('accessToken', access);

			if (is_verified && user_type === 'PRIMARY-PATIENT') {
				navigation.navigate('AppTabs');
			}
		}
	};

	const handleForgetPwd = () => {
		navigation.navigate('ForgetPassword');
	};

	return (
		<SafeAreaView style={ styles.container }>
			<KeyboardAvoidingView enabled>
				<ScrollView style={ styles.scrollView }>
					<Text style={ styles.header }>login</Text>
					<Formik
						initialValues={ { username: '', password: '' } }
						validationSchema={ loginSchema }
						onSubmit={ (values, actions) => {
							actions.resetForm();
							handleSubmit(values);
						} }>
						{props => (
							<View style={ styles.loginContainer }>
								<TextInputField
									lable="User ID"
									placeholder="Enter Your User ID"
									onChangeText={ props.handleChange('username') }
									value={ props.values.username }
									onBlur={ props.handleBlur('username') }
									error={ props.touched.username && props.errors.username }
									secureTextEntry={ false }
								/>
								<TextInputField
									lable="Password"
									placeholder="Enter Your Password"
									onChangeText={ props.handleChange('password') }
									value={ props.values.password }
									onBlur={ props.handleBlur('password') }
									error={ props.touched.password && props.errors.password }
									secureTextEntry={ true }
									passwordIcon={ true }
								/>
								<TouchableOpacity
									style={ globalStyles.primaryButton }
									onPress={ props.handleSubmit }>
									<Text style={ globalStyles.buttonText }>login</Text>
								</TouchableOpacity>
							</View>
						)}
					</Formik>
					<TouchableOpacity
						style={ globalStyles.secondaryButton }
						onPress={ () => navigation.navigate('SignUp') }>
						<Text style={ globalStyles.buttonText }>sign up</Text>
					</TouchableOpacity>
					{errorMessage !== '' && errorMessage !== undefined ? (
						<Text style={ styles.failedResponse }>{errorMessage}</Text>
					) : (
						<Text></Text>
					)}
					<Text style={ styles.forgetPassword } onPress={ handleForgetPwd }>
						Forget Password ?
					</Text>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

function mapStateToProps(state) {
	return {
		is_verified: state.user.is_verified,
		user_type: state.user.user_type,
		access: state.user.access
	};
}

export default connect(mapStateToProps, {
	getLogin,
	setLogin
})(LoginForm);
