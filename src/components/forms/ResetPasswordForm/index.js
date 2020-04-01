import React, { useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
	KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import * as yup from 'yup';

import { getPassword, setPassword } from '../../../state/actions/user';
import TextInputField from '../../textInputs/TextInputField';

import styles from './styles';
import globalStyles from '../../../globalStyles';

const resetPinSchema = yup.object({
	password: yup
		.string()
		.min(8)
		.required(),
	reset_code: yup.string().required()
});

function ResetPasswordForm(props) {
	const { navigation, getPassword, reset } = props;

	const handleSubmit = data => {
		getPassword(data, onGetResetPasswordSuccess, onGetResetPasswordFailure);
		// navigation.navigate('EmailVerification')
	};
	const onGetResetPasswordSuccess = data => {
		console.log('api success', data);
	};
	const onGetResetPasswordFailure = error => {
		return alert(error.data.detail);
	};
	useEffect(
		function storeLoginResponse() {
			storeResponseData();
		},
		[ reset ]
	);

	const storeResponseData = () => {
		if (reset !== undefined && reset !== '') {
			reset === '';
			navigation.navigate('Login');
		}
	};

	return (
		<SafeAreaView style={ styles.container }>
			<KeyboardAvoidingView enabled>
				<ScrollView style={ styles.scrollView }>
					<Text style={ styles.header }>Change Password</Text>
					<Formik
						initialValues={ { password: '', reset_code: '' } }
						validationSchema={ resetPinSchema }
						onSubmit={ (values, actions) => {
							actions.resetForm();
							handleSubmit(values);
						} }>
						{props => (
							<View>
								<TextInputField
									lable="Type New Password"
									placeholder="Enter Your New Password"
									onChangeText={ props.handleChange('password') }
									value={ props.values.password }
									onBlur={ props.handleBlur('password') }
									error={ props.touched.password && props.errors.password }
									secureTextEntry={ false }
									passwordIcon={ true }
								/>
								<TextInputField
									lable="Reset Code"
									placeholder="Enter reset code"
									onChangeText={ props.handleChange('reset_code') }
									value={ props.values.reset_code }
									onBlur={ props.handleBlur('reset_code') }
									error={ props.touched.reset_code && props.errors.reset_code }
									secureTextEntry={ false }
									passwordIcon={ true }
								/>
								<TouchableOpacity
									style={ globalStyles.secondaryButton }
									onPress={ props.handleSubmit }>
									<Text style={ globalStyles.buttonText }>Reset</Text>
								</TouchableOpacity>
							</View>
						)}
					</Formik>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

function mapStateToProps(state) {
	return {
		reset: state.user.detail
	};
}

export default connect(mapStateToProps, {
	getPassword,
	setPassword
})(ResetPasswordForm);
