import React, { useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
	KeyboardAvoidingView,
	Image,
	Platform,
	TextInput
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import CheckBox from 'react-native-check-box';

import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import TextInputField from '../textInputs/TextInputField';
import { getSignUp, setSignUp } from '../../state/actions/user';
import calender from '../../assets/calender.png';

import styles from './styles';
import globalStyles from '../../globalStyles';
import passwordStyle from '../textInputs/style';

/* eslint-disable no-undef */
/* eslint-disable no-mixed-spaces-and-tabs */

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

const options = [
	{
		key: 'MALE',
		text: 'Male'
	},
	{
		key: 'FEMALE',
		text: 'Female'
	}
];

const registerSchema = yup.object({
	email: yup
		.string()
		.email()
		.required()
		.matches(
			/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
			'Is not in correct format'
		),
	first_name: yup.string().required(),
	last_name: yup.string().required(),
	username: yup.string().required(),
	password: yup
		.string()
		.required()
		.label('Password'),
	confirm_password: yup
		.string()
		.required()
		.test('passwords-match', 'Passwords does not match', function(value) {
			return this.parent.password === value;
		}),
	dob: yup.string(),
	zipcode: yup.string().required(),
	// pin: yup.string().required(),
	gender: yup.string().required()
});

function SignUpForm(props) {
	const { getSignUp, navigation } = props;
	const [ isChecked, setIsChecked ] = useState(false);
	const [ date, setDate ] = useState(new Date(1598051730000));
	const [ mode, setMode ] = useState('date');
	const [ show, setShow ] = useState(false);
	const [ birthDate, setBirthDate ] = useState('');
	const [ showEye, setShowEye ] = useState(true);
	const [ showConfirmEye, setShowConfirmEye ] = useState(true);

	const onGetSignupSuccess = () => {
		navigation.navigate('AccountSuccess');
	};

	const onGetSignupFailure = (response) => {
		alert(JSON.stringify(response, null, 4));
		navigation.navigate('AccountSuccess');
	};

	const handleSubmit = data => {
		data.zipcode = data.zipcode.split();
		data.gender = 'FEMALE';
		data.dob = birthDate;
		if (birthDate !== '') {
			getSignUp(data, onGetSignupSuccess, onGetSignupFailure);
			setBirthDate('');
		} else {
			alert('Date of birth fiels is required');
		}
	};

	const onChange = (event, selectedDate) => {
		setShow(Platform.OS === 'ios');

		var currentDate = '';
		if (selectedDate !== undefined && selectedDate !== '') {
			var date = new Date(selectedDate);
			setBirthDate(
				date.getDate() +
					'/' +
					Number(date.getMonth() + 1) +
					'/' +
					date.getFullYear()
			);
			currentDate = selectedDate;
		} else {
			setBirthDate('');
			currentDate = new Date();
		}

		setDate(currentDate);
	};

	const showMode = currentMode => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode('date');
	};

	const passwordHandler = () => {
		setShowEye(!showEye);
	};

	const confirmPasswordHandler = () => {
		setShowConfirmEye(!showConfirmEye);
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
							<View style={ styles.signupContainer }>
								<KeyboardAvoidingView
									behavior="absolute"
									keyboardVerticalOffset={ keyboardVerticalOffset }>
									<TextInputField
										lable="User ID"
										placeholder="Individual or Family User ID"
										onChangeText={ props.handleChange('username') }
										value={ props.values.username }
										onBlur={ props.handleBlur('username') }
										error={ props.touched.username && props.errors.username }
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
									<View style={ passwordStyle.textInputContainer }>
										<View style={ passwordStyle.labelContainer }>
											<Text style={ passwordStyle.label }>Password</Text>
										</View>

										<TextInput
											style={ passwordStyle.textInput }
											placeholder="Enter Your Password"
											onChangeText={ props.handleChange('password') }
											value={ props.values.password }
											onBlur={ props.handleBlur('password') }
											secureTextEntry={ showEye ? true : false }
										/>
										<TouchableOpacity
											onPress={ passwordHandler }
											style={ styles.eyeIcon }>
											{showEye ? (
												<AntDesignIcon name="eye" size={ 17 } color="#5C5C5C" />
											) : (
												<AntDesignIcon name="eyeo" size={ 17 } color="#5C5C5C" />
											)}
										</TouchableOpacity>
										{props.touched.password && props.errors.password ? (
											<Text style={ passwordStyle.errorText }>
												{props.errors.password}
											</Text>
										) : (
											<Text style={ passwordStyle.errorText } />
										)}
									</View>
									<View style={ passwordStyle.textInputContainer }>
										<View style={ passwordStyle.labelContainer }>
											<Text style={ passwordStyle.label }>confirm_password</Text>
										</View>
										<TextInput
											style={ passwordStyle.textInput }
											placeholder="Retype Password"
											onChangeText={ props.handleChange('confirm_password') }
											value={ props.values.confirm_password }
											onBlur={ props.handleBlur('confirm_password') }
											secureTextEntry={ showConfirmEye ? true : false }
										/>
										<TouchableOpacity
											onPress={ confirmPasswordHandler }
											style={ styles.eyeIcon }>
											{showConfirmEye ? (
												<AntDesignIcon name="eye" size={ 17 } color="#5C5C5C" />
											) : (
												<AntDesignIcon name="eyeo" size={ 17 } color="#5C5C5C" />
											)}
										</TouchableOpacity>
										{props.touched.confirm_password &&
										props.errors.confirm_password ? (
											<Text style={ passwordStyle.errorText }>
												{props.errors.confirm_password}
											</Text>
										) : (
											<Text style={ passwordStyle.errorText } />
										)}
									</View>
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
									<View style={ styles.textInputContainer }>
										<View style={ styles.labelContainer }>
											<Text style={ styles.label }>Date of birth</Text>
										</View>
										<TouchableOpacity
											style={ styles.dataPicker }
											onPress={ showDatepicker }>
											{birthDate !== '' ? (
												<Text style={ styles.calenderText }>{birthDate}</Text>
											) : (
												<Text style={ styles.calenderText }>
													Month / Date / Year
												</Text>
											)}

											<Image source={ calender } style={ styles.calenderStyle } />
										</TouchableOpacity>
									</View>
									{show && (
										<DateTimePicker
											testID="dateTimePicker"
											timeZoneOffsetInMinutes={ 0 }
											value={ date }
											mode={ mode }
											display="default"
											onChange={ onChange }
											neutralButtonLabel="clear"
										/>
									)}
									<Text style={ styles.errorText }>
										{props.touched.dob && props.errors.dob}
									</Text>
									<View style={ styles.genderWrapper }>
										<View>
											<Text style={ styles.questionText }>Gender:</Text>
										</View>
										<View style={ styles.questionContainer }>
											<View style={ styles.radioWrap }>
												{options.map(item => {
													return (
														<View key={ item.key } style={ styles.radioWrap }>
															<Text style={ styles.genderText }>{item.text}</Text>
															<TouchableOpacity
																style={ styles.circle }
																onPress={ () =>
																	props.setFieldValue('gender', item.key)
																}>
																{props.values.gender === item.key ? (
																	<View style={ styles.checkedCircle } />
																) : (
																	<Text />
																)}
															</TouchableOpacity>
														</View>
													);
												})}
											</View>
										</View>
									</View>

									{props.touched.gender && props.errors.gender ? (
										<Text style={ styles.errorText }>{props.errors.gender}</Text>
									) : (
										<Text />
									)}
									<View style={ styles.checkBoxWrap }>
										<CheckBox
											checkedImage={
												<View style={ styles.customCheckbox }>
													<Image
														style={ styles.checkedStyle }
														source={ require('../../assets/checkbox.png') }
													/>
												</View>
											}
											unCheckedImage={ <View style={ styles.customCheckbox } /> }
											style={ styles.checkbox }
											onClick={ () => {
												setIsChecked(!isChecked);
											} }
											isChecked={ isChecked }
										/>
										<View style={ styles.termsWrapper }>
											<Text style={ styles.termsText1 }>I agree to the</Text>
											<Text style={ styles.termsText2 }>
												Terms and Conditions
											</Text>
										</View>
									</View>
									<TouchableOpacity
										style={ globalStyles.secondaryButton }
										onPress={ props.handleSubmit }>
										<Text style={ globalStyles.buttonText }>create account</Text>
									</TouchableOpacity>
									<View style={ styles.loginTermsWrapper }>
										<Text style={ styles.normalText }>
											Already have an Account?
										</Text>
										<Text
											style={ styles.loginLink }
											onPress={ () => navigation.navigate('Login') }>
											Login
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
		email: state.user.email
	};
}

export default connect(
	mapStateToProps,
	{
		getSignUp,
		setSignUp
	}
)(SignUpForm);
