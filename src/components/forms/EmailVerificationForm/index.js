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

import {
	getOneTimePassword,
	setOneTimePassword
} from '../../../state/actions/user';
import TextInputField from '../../textInputs/TextInputField';

import { Formik } from 'formik';
import * as yup from 'yup';

import styles from './styles';
import globalStyles from '../../../globalStyles';
const emailVerifySchema = yup.object({
	email: yup
		.string()
		.email()
		.matches(
			/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
			'Is not in correct format'
		)
		.required(),
	otp: yup.string().required()
});

function EmailVerificationForm(props) {
	const { navigation, getOneTimePassword, is_verified } = props;

	const handleSubmit = data => {
		getOneTimePassword(data);
	};

	useEffect(
		function storeLoginResponse() {
			storeResponseData();
		},
		[ is_verified ]
	);

	const storeResponseData = () => {
		if (is_verified) {
			navigation.navigate('Login');
		}
	};

	return (
		<SafeAreaView style={ styles.container }>
			<KeyboardAvoidingView enabled>
				<ScrollView style={ styles.scrollView }>
					<Text style={ styles.header }>One Time Password</Text>
					<Formik
						initialValues={ {
							email: props.route.params.email,
							otp: ''
						} }
						validationSchema={ emailVerifySchema }
						onSubmit={ (values, actions) => {
							actions.resetForm();
							handleSubmit(values);
						} }>
						{props => (
							<View>
								<TextInputField
									lable="Email"
									placeholder="Enter Your Email"
									onChangeText={ props.handleChange('email') }
									value={ props.values.email }
									onBlur={ props.handleBlur('email') }
									error={ props.touched.email && props.errors.email }
									secureTextEntry={ false }
								/>
								<TextInputField
									lable="OTP"
									placeholder="OTP"
									onChangeText={ props.handleChange('otp') }
									value={ props.values.otp }
									onBlur={ props.handleBlur('otp') }
									error={ props.touched.otp && props.errors.otp }
									secureTextEntry={ true }
								/>
								<TouchableOpacity
									style={ globalStyles.secondaryButton }
									onPress={ props.handleSubmit }>
									<Text style={ globalStyles.buttonText }>Continue</Text>
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
		is_verified: state.user.is_verified
	};
}

export default connect(
	mapStateToProps,
	{
		getOneTimePassword,
		setOneTimePassword
	}
)(EmailVerificationForm);
