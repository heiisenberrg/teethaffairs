import React, { useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
	KeyboardAvoidingView,
	CheckBox
} from 'react-native';

import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';

import TextInputField from '../textInputs/TextInputField';
// import DatePicker from 'react-native-datepicker';
import { getSignUp, setSignUp } from '../../state/actions/user';

import styles from './styles';
import globalStyles from '../../globalStyles';

const registerSchema = yup.object({
	email: yup
		.string()
		.email()
		.matches(
			/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
			'Is not in correct format'
		)
		.required(),
	personal_email: yup
		.string()
		.email()
		.matches(
			/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
			'Is not in correct format'
		)
		.required(),
	first_name: yup.string().required(),
	last_name: yup.string().required(),
	username: yup.string().required(),

	password: yup
		.string()
		.label('Password')
		.required(),
	confirm_password: yup
		.string()
		.required()
		.test('passwords-match', 'Passwords does not match', function(value) {
			return this.parent.password === value;
		}),
	// dob: yup.string().required(),
	zipcode: yup.string().required(),
	pin: yup.string().required(),
	gender: yup
		.string()
		.uppercase()
		.required()
});

function SignUpForm(props) {
	const { getSignUp, navigation, email } = props;

	const onGetSignupSuccess = data => {
		console.log('api success', data);
	};
	const onGetSignupFailure = error => {
		return alert(error.data.detail);
	};

	const handleSubmit = data => {
		data.zipcode = data.zipcode.split();

		getSignUp(data, onGetSignupSuccess, onGetSignupFailure);
	};

	useEffect(
		function storeLoginResponse() {
			getRegisteredResponse();
		},
		[ email ]
	);

	const getRegisteredResponse = () => {
		if (email !== undefined && email !== '') {
			navigation.navigate('EmailVerification', { email: email });
		}
	};

	return (
		<SafeAreaView style={ styles.container }>
			<KeyboardAvoidingView enabled>
				<ScrollView style={ styles.scrollView }>
					<Text style={ styles.header }>Sign up</Text>
					<Formik
						initialValues={ {
							email: '',
							first_name: '',
							last_name: '',
							password: '',
							confirm_password: '',
							dob: '',
							zipcode: '',
							pin: '',
							gender: '',
							username: '',
							user_type: 'PRIMARY_PATIENT',
							profile: {
								relationship: 'SELF'
							},
							personal_email: ''
						} }
						validationSchema={ registerSchema }
						onSubmit={ (values, actions) => {
							actions.resetForm();
							handleSubmit(values);
						} }>
						{props => (
							<View>
								<TextInputField
									lable="User Name"
									placeholder="Enter Your User Name"
									onChangeText={ props.handleChange('username') }
									value={ props.values.username }
									onBlur={ props.handleBlur('username') }
									error={ props.touched.user_name && props.errors.user_name }
									secureTextEntry={ false }
								/>
								<TextInputField
									lable="Email"
									placeholder="Enter Your Email Id"
									onChangeText={ props.handleChange('email') }
									value={ props.values.email }
									onBlur={ props.handleBlur('email') }
									error={ props.touched.email && props.errors.email }
									secureTextEntry={ false }
								/>
								<TextInputField
									lable="Password"
									placeholder="Enter Password"
									onChangeText={ props.handleChange('password') }
									value={ props.values.password }
									onBlur={ props.handleBlur('password') }
									error={ props.touched.password && props.errors.password }
									secureTextEntry={ true }
									passwordIcon={ true }
								/>
								<TextInputField
									lable="Confirm Password"
									placeholder="Retype Password"
									onChangeText={ props.handleChange('confirm_password') }
									value={ props.values.confirm_password }
									onBlur={ props.handleBlur('confirm_password') }
									error={
										props.touched.confirm_password &&
										props.errors.confirm_password
									}
									secureTextEntry={ true }
									passwordIcon={ true }
								/>
								<TextInputField
									lable="First Name"
									placeholder="Enter Your First Name"
									onChangeText={ props.handleChange('first_name') }
									value={ props.values.first_name }
									onBlur={ props.handleBlur('first_name') }
									error={ props.touched.first_name && props.errors.first_name }
									secureTextEntry={ false }
								/>
								<TextInputField
									lable="Last Name"
									placeholder="Enter Your Last Name"
									onChangeText={ props.handleChange('last_name') }
									value={ props.values.last_name }
									onBlur={ props.handleBlur('last_name') }
									error={ props.touched.last_name && props.errors.last_name }
									secureTextEntry={ false }
								/>
								<TextInputField
									lable="Zipcode"
									onChangeText={ props.handleChange('zipcode') }
									value={ props.values.zipcode }
									keyboardType="numeric"
									onBlur={ props.handleBlur('zipcode') }
									error={ props.touched.zipcode && props.errors.zipcode }
									secureTextEntry={ false }
								/>
								<TextInputField
									lable="Gender"
									placeholder="Gender"
									onChangeText={ props.handleChange('gender') }
									value={ props.values.gender }
									onBlur={ props.handleBlur('gender') }
									error={ props.touched.gender && props.errors.gender }
									secureTextEntry={ false }
								/>
								<TextInputField
									lable="Pin"
									placeholder="Pin"
									onChangeText={ props.handleChange('pin') }
									value={ props.values.pin }
									keyboardType="numeric"
									onBlur={ props.handleBlur('pin') }
									secureTextEntry={ false }
								/>
								<TextInputField
									lable="Personal Email"
									placeholder="Enter Your Personal Email Id"
									onChangeText={ props.handleChange('personal_email') }
									value={ props.values.personal_email }
									onBlur={ props.handleBlur('personal_email') }
									error={
										props.touched.personal_email && props.errors.personal_email
									}
									secureTextEntry={ false }
								/>
								{/* <Text style={styles.lable}>Date of birth</Text>
						<DatePicker
							style={styles.dataPicker}
							date={props.values.dob}
							mode="date"
							placeholder="Year-Month-Date"
							androidMode="spinner"
							format="YYYY-MM-DD"
							minDate="1900-01-01"
							maxDate="3000-01-01"
							confirmBtnText="Confirm"
							cancelBtnText="Cancel"
							customStyles={{
								dateIcon: {
									position: 'absolute',
									right: 0,
									top: -4
								},
								dateInput: {
									// borderWidth: 1,
									// borderColor: '#ddd',
									// fontSize: 18,
									// borderRadius: 6
									borderWidth: 1,
									borderColor: 'grey',
									padding: 9,
									fontSize: 12,
									borderRadius: 20,
									marginTop: -8,
									marginBottom: 10,
									width: 340
								}
							}}
							onDateChange={props.handleChange('dob')}
							onBlur={props.handleBlur('dob')}
						/>
						<Text style={styles.errorText}>
							{props.touched.dob && props.errors.dob}
						</Text> */}
								<View style={ styles.checkBoxWrap }>
									<CheckBox />
									<View style={ styles.termsWrapper }>
										<Text style={ styles.termsText1 }>I agree to the</Text>
										<Text style={ styles.termsText2 }>Terms and Conditions</Text>
									</View>
								</View>

								<TouchableOpacity
									style={ globalStyles.secondaryButton }
									onPress={ props.handleSubmit }>
									<Text style={ globalStyles.buttonText }>create account</Text>
								</TouchableOpacity>
							</View>
						)}
					</Formik>
					<View style={ styles.termsWrapper }>
						<Text style={ styles.normalText }>Already have an Account? </Text>
						<Text
							style={ styles.loginLink }
							onPress={ () => navigation.navigate('Login') }>
							Login
						</Text>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

function mapStateToProps(state) {
	return {
		email: state.user.email
	};
}

export default connect(mapStateToProps, {
	getSignUp,
	setSignUp
})(SignUpForm);
