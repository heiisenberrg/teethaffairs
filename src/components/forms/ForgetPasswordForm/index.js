import React from 'react';
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
		).required()
});

function ForgetPasswordForm(props) {
	const { navigation, getForgetEmail } =props;

	const onGetForgetPasswordSuccess = () => {
		navigation.navigate('PasswordResetVerify');
	};
	const onGetForgetPasswordFailure = () => {
		return alert('Something went wrong!');
	};
	const handleSubmit = data => {
		getForgetEmail(
			data,
			onGetForgetPasswordSuccess,
			onGetForgetPasswordFailure
		);
	};
	return (
		<SafeAreaView style={ styles.container }>
		<ScrollView >
			<View style={ styles.resetContainer }>
				<Image source={ lock } style={ styles.lock } />
				<Image source={ questionIcon } style={ styles.questionIcon } />
			</View>
					<Text style={ styles.header }>Reset password</Text>
					<Formik
						initialValues={ { email: '' } }
						validationSchema={ loginSchema }
						onSubmit={ (values, actions) => {
							actions.resetForm();
							handleSubmit(values);
						} }>
						{props => (
							<View style={ styles.resetContainer1 }>
								<KeyboardAvoidingView enabled>

								<TextInput
									placeholder="Enter Email Address"
									placeholderTextColor="white"
									style={ styles.textInput }
									onChangeText={ props.handleChange('email') }
									value={ props.values.email }
									onBlur={ props.handleBlur('email') }
									secureTextEntry={ false }
								/>
								{ props.touched.email && props.errors.email  ?
								<Text style={ styles.errorText }>{props.errors.email}</Text>: <Text></Text>}
									</KeyboardAvoidingView>

								<View style={ styles.buttonWrapper }>
								<TouchableOpacity
									style={ globalStyles.tertiaryButton }
									onPress={ props.handleSubmit }>
									<Text style={ globalStyles.tertiaryButtonText }>Submit</Text>
								</TouchableOpacity>
								</View>

							</View>
						)}
					</Formik>
					<Text style={ styles.newUserText }>New User?</Text>
					<View style={ styles.buttonWrapper }>

					<TouchableOpacity
						style={ globalStyles.normalButton }
						onPress={ () => navigation.navigate('SignUp') }>
						<Text
							style={ globalStyles.buttonText }>
							Sign Up
						</Text>
					</TouchableOpacity>
					</View>
				</ScrollView>
		</SafeAreaView>
	);
}

function mapStateToProps() {
	return {
	};
}

export default connect(mapStateToProps, {
	getForgetEmail,
	setForgetPassword
})(ForgetPasswordForm);
