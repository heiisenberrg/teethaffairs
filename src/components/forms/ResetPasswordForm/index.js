import React, { useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
	KeyboardAvoidingView,
	Image,
	Platform
} from 'react-native';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import * as yup from 'yup';

import { getPassword, setPassword } from '../../../state/actions/user';
import TextInputField from '../../textInputs/TextInputField';

import styles from './styles';
import globalStyles from '../../../globalStyles';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

const resetPinSchema = yup.object({
	password: yup
		.string()
		.min(8)
		.required(),
	reset_code: yup.string().required()
});

function ResetPasswordForm(props) {
	const { navigation, getPassword } = props;
	const [ errorMessage, setErrorMessage ] = useState('');

	const handleSubmit = data => {
		getPassword(data, onGetResetPasswordSuccess, onGetResetPasswordFailure);
	};

	const onGetResetPasswordSuccess = () => {
		navigation.navigate('VerificationSuccess');
	};

	const onGetResetPasswordFailure = error => {
		if (error.data.detail !== undefined) {
			setErrorMessage(JSON.stringify(error.data.detail));
		} else {
			setErrorMessage('Something went wrong!');
		}
	};

	return (
		<>
			<View style={ styles.logoHeader }>
				<TouchableOpacity style={ styles.filter }>
					<View style={ styles.filterWrapper }>
						<Image
							style={ styles.avatar }
							source={ require('../../../assets/logo-color.png') }
						/>
					</View>
				</TouchableOpacity>
			</View>
			<SafeAreaView style={ styles.container }>
				<ScrollView>
					<Text style={ styles.header }>Change Password</Text>
					<Formik
						initialValues={ { password: '', reset_code: '' } }
						validationSchema={ resetPinSchema }
						onSubmit={ (values, actions) => {
							actions.resetForm();
							handleSubmit(values);
						} }>
						{props => (
							<View style={ styles.loginContainer }>
								<KeyboardAvoidingView
									behavior="absolute"
									keyboardVerticalOffset={ keyboardVerticalOffset }>
									<TextInputField
										lable="Type New Password"
										placeholder="Enter Your New Password"
										onChangeText={ props.handleChange('password') }
										value={ props.values.password }
										onBlur={ props.handleBlur('password') }
										error={ props.touched.password && props.errors.password }
										secureTextEntry={ false }
									/>
									<TextInputField
										lable="Confirm Password"
										placeholder="Retype New Password"
										onChangeText={ props.handleChange('reset_code') }
										value={ props.values.reset_code }
										onBlur={ props.handleBlur('reset_code') }
										error={ props.touched.reset_code && props.errors.reset_code }
										secureTextEntry={ true }
										passwordIcon={ true }
									/>
									<View style={ styles.responseWrap }>
										{errorMessage !== undefined ? (
											<Text style={ styles.failedResponse }>{errorMessage}</Text>
										) : (
											<Text style={ styles.failedResponse }>
												Something went wrong!
											</Text>
										)}
									</View>
									<TouchableOpacity
										style={ globalStyles.secondaryButton }
										onPress={ props.handleSubmit }>
										<Text style={ globalStyles.buttonText }>Reset</Text>
									</TouchableOpacity>
								</KeyboardAvoidingView>
							</View>
						)}
					</Formik>
				</ScrollView>
			</SafeAreaView>
		</>
	);
}

function mapStateToProps() {
	return {};
}

export default connect(
	mapStateToProps,
	{
		getPassword,
		setPassword
	}
)(ResetPasswordForm);
