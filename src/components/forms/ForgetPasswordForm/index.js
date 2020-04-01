import React, { useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	SafeAreaView,
	Image
} from 'react-native';
import { connect } from 'react-redux';

import { getForgetEmail, setForgetPassword } from '../../../state/actions/user';
import { Formik } from 'formik';
import * as yup from 'yup';

import lock from '../../../assets/lock.png';
import questionIcon from '../../../assets/question-icon.png';
import emailIcon from '../../../assets/email.png';
import styles from './styles';
import { TextInput } from 'react-native-gesture-handler';
import globalStyles from '../../../globalStyles';
const loginSchema = yup.object({
	email: yup
		.string()
		.email()
		.matches(
			/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
			'Is not in correct format'
		)
		.required()
});

function ForgetPasswordForm(props) {
	const { navigation, getForgetEmail, message } = props;

	const onGetForgetPasswordSuccess = data => {
		console.log('api success', data);
	};
	const onGetForgetPasswordFailure = error => {
		return alert(error.data.detail);
	};
	const handleSubmit = data => {
		getForgetEmail(
			data,
			onGetForgetPasswordSuccess,
			onGetForgetPasswordFailure
		);
	};

	useEffect(
		function storeLoginResponse() {
			storeResponseData();
		},
		[ message ]
	);

	const storeResponseData = () => {
		if (message !== '' && message !== undefined) {
			navigation.navigate('ResetPassword');
		}
	};

	return (
		<SafeAreaView style={ styles.container }>
			<View style={ styles.resetContainer }>
				<Image source={ lock } style={ styles.lock } />
				<Image source={ questionIcon } style={ styles.questionIcon } />
			</View>
			<KeyboardAvoidingView enabled>
				<ScrollView style={ styles.scrollView }>
					<Text style={ styles.header }>Reset password</Text>
					<Formik
						initialValues={ { email: '' } }
						validationSchema={ loginSchema }
						onSubmit={ (values, actions) => {
							actions.resetForm();
							handleSubmit(values);
						} }>
						{props => (
							<View>
								<TextInput
									placeholder="Enter User ID"
									placeholderTextColor="white"
									style={ styles.textInput }
									onChangeText={ props.handleChange('email') }
									value={ props.values.email }
									onBlur={ props.handleBlur('email') }
									error={ props.touched.email && props.errors.email }
									secureTextEntry={ false }
								/>
								<View style={ styles.emailContainer }>
									<Image source={ emailIcon } />
									<Text style={ styles.dummyEmailText }>*****276@gmail.com</Text>
								</View>
								<TouchableOpacity
									style={ globalStyles.tertiaryButton }
									onPress={ props.handleSubmit }>
									<Text style={ globalStyles.tertiaryButtonText }>Submit</Text>
								</TouchableOpacity>
							</View>
						)}
					</Formik>
					<Text style={ styles.newUserText }>New User?</Text>
					<TouchableOpacity
						style={ globalStyles.normalButton }
						onPress={ props.handleSubmit }>
						<Text
							style={ globalStyles.buttonText }
							onPress={ () => navigation.navigate('SignUp') }>
							Sign Up
						</Text>
					</TouchableOpacity>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

function mapStateToProps(state) {
	return {
		message: state.user.detail
	};
}

export default connect(mapStateToProps, {
	getForgetEmail,
	setForgetPassword
})(ForgetPasswordForm);
