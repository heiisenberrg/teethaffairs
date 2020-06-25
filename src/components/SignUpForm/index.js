import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
	KeyboardAvoidingView,
	Image,
	Platform,
	TextInput,
	Dimensions
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import CheckBox from 'react-native-check-box';
import { connect } from 'react-redux';
import moment from 'moment';
import { Formik } from 'formik';
import * as yup from 'yup';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Icon from '../global/Icon';
import Tooltip from '../global/Tooltip/Tooltip';
import TextInputField from '../textInputs/TextInputField';
import { getSignUp, getCheckName } from '../../state/actions/user';
import calender from '../../assets/calender.png';
import FlashMessage from '../global/FlashMessage';
import styles from './styles';
import globalStyles from '../../globalStyles';
import passwordStyle from '../textInputs/style';
import Config from 'react-native-config';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
const { width } = Dimensions.get('screen');

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

const registerSchema = yup.object().shape({
	email: yup
		.string()
		.email()
		.required('Invalid Email')
		.matches(
			/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
			'Is not in correct format'
		),
	first_name: yup.string().required('Required'),
	last_name: yup.string().required('Required'),
	username: yup.string(),
	// .required('User ID is a required field.'),
	password: yup
		.string()
		.min(8, 'Too Short!')
		.matches(
			/^(?=.*[A-Za-z])(?=.*[0-9!@#$%^&*])(?=.{8,})/,
			'Password Policy Violation'
		)
		.required('Required')
		.label('Password'),
	confirm_password: yup
		.string()
		.required('Required')
		.test('passwords-match', 'Passwords does not match', function(value) {
			return this.parent.password === value;
		}),
	date_of_birth: yup.string().required('Required'),
	zipcode: yup
		.string()
		.required('Required')
		.length(5),
	gender: yup.string().required('Required')
});

function SignUpForm(props) {
	const { getSignUp, navigation, deviceToken } = props;
	const [ isChecked, setIsChecked ] = useState(false);
	const [ date, setDate ] = useState(new Date());
	const [ mode, setMode ] = useState('date');
	const [ show, setShow ] = useState(false);
	const [ birthDate, setBirthDate ] = useState('');
	const [ gender, selectGender ] = useState('');
	const [ showEye, setShowEye ] = useState(true);
	const [ showConfirmEye, setShowConfirmEye ] = useState(true);
	const [ userName, setUserName ] = useState('');
	const [ checkExist, setCheckExist ] = useState(true);
	const [ year, setYear ] = useState('');
	const [ month, setMonth ] = useState('');
	const [ day, setDay ] = useState('');
	const [ chooseDob, setChooseDob ] = useState(false);

	const onGetSignupSuccess = () => {
		navigation.navigate('AccountSuccess');
	};

	const onGetSignupFailure = () => {
		FlashMessage.message(
			'Failure',
			'Email already exists. Please try another one.',
			'#ff4444'
		);
		setChooseDob(true);
	};

	const handleSubmit = data => {
		if (isChecked) {
			data = {
				...data,
				zipcode: [ data.zipcode ],
				gender: gender,
				date_of_birth: birthDate,
				device_id: deviceToken
			};
			if (birthDate && gender) {
				getSignUp(data, onGetSignupSuccess, onGetSignupFailure);
				setBirthDate('');
			}
		} else {
			FlashMessage.message(
				'Alert',
				'Please check the Terms and Conditions.',
				'#33b5e5'
			);
		}
	};

	const onChange = (event, selectedDate, setFieldValue) => {
		setShow(Platform.OS === 'ios');
		var currentDate = '';
		if (selectedDate && selectedDate !== '') {
			const date = new Date(selectedDate).toISOString();
			setBirthDate(date);
			setFieldValue('date_of_birth', date);
			currentDate = selectedDate;
			setChooseDob(false);
		} else {
			setBirthDate('');
			currentDate = new Date();
		}
		setDate(currentDate);
	};

	const showMode = (currentMode, value) => {
		setShow(value);
		setMode(currentMode);
	};

	const showDatepicker = value => {
		showMode('date', value);
	};

	const passwordHandler = () => {
		setShowEye(!showEye);
	};

	const confirmPasswordHandler = () => {
		setShowConfirmEye(!showConfirmEye);
	};

	const doesPasswordMatchSuccess = values =>
		values.password &&
		values.confirm_password &&
		values.password === values.confirm_password;

	const _renderPasswordInfo = () => (
		<View style={ styles.popoverContainerText }>
			<Text style={ styles.popoverTitle }>Password should be</Text>
			<View style={ styles.popoverLineItem }>
				<View style={ styles.bullet } />
				<Text style={ styles.popoverText }>Minimum of 8 characters</Text>
			</View>
			<View style={ styles.popoverLineItem }>
				<View style={ styles.bullet } />
				<Text style={ styles.popoverText }>
					At least one number and symbol(@$#!%*?)
				</Text>
			</View>
			<View style={ styles.popoverLineItem }>
				<View style={ styles.bullet } />
				<Text style={ styles.popoverText }>Do not use space</Text>
			</View>
		</View>
	);

	const onChangeUserId = name => {
		setUserName(name.trim());
		let data = {
			username: name.trim().toLowerCase()
		};
		fetch(Config.PROTOCOL + Config.HOST_NAME + '/users/check-username/', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(response => {
				if (response.availability === true) {
					setCheckExist(true);
				} else {
					setCheckExist(false);
				}
			})
			.catch(() => {
				setCheckExist(false);
			}); //need to modify this api call
	};

	useEffect(function() {
		var date = new Date();
		date.setDate(date.getDate() - 0);
		date.setMonth(date.getMonth() - 0);
		date.setFullYear(date.getFullYear() - 18);
		setYear(date.getFullYear());
		setDay(date.getDate());
		setMonth(date.getMonth());
	}, []);

	const handlePress = () => {
		setIsChecked(!isChecked);
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
				<ScrollView showsVerticalScrollIndicator={ false }>
					<Text style={ styles.header }>Sign up</Text>
					<Formik
						initialValues={ {
							email: '',
							first_name: '',
							last_name: '',
							password: '',
							confirm_password: '',
							date_of_birth: '',
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
							values.username = userName;
							if (values.userName !== '' && checkExist === true) {
								handleSubmit(values, actions);
							}
						} }>
						{props => (
							<View style={ styles.signupContainer }>
								<KeyboardAvoidingView
									behavior="absolute"
									keyboardVerticalOffset={ keyboardVerticalOffset }>
									<TextInputField
										lable="User ID"
										placeholder="Individual or Family User ID"
										onChangeText={ text => onChangeUserId(text) }
										value={ userName }
										onBlur={ props.handleBlur('username') }
										error={
											props.touched.username
												? userName === ''
													? 'User ID is a required field.'
													: userName !== '' && checkExist === false
													? 'The username already exists'
													: ''
												: ''
										}
										secureTextEntry={ false }
									/>
									<TextInputField
										lable="Email"
										placeholder="Enter Your Email Id"
										onChangeText={ value =>
											props.setFieldValue('email', value.trim())
										}
										value={ props.values.email }
										onBlur={ props.handleBlur('email') }
										error={ props.touched.email && props.errors.email }
										secureTextEntry={ false }
									/>
									<View style={ passwordStyle.textInputContainer }>
										<View style={ styles.passwordWrapper }>
											<View style={ passwordStyle.labelContainer }>
												<Text style={ passwordStyle.label }>Password</Text>
											</View>

											<TextInput
												style={ passwordStyle.textInput }
												placeholder="Enter Your Password"
												onChangeText={ value =>
													props.setFieldValue('password', value.trim())
												}
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
													<AntDesignIcon
														name="eyeo"
														size={ 17 }
														color="#5C5C5C"
													/>
												)}
											</TouchableOpacity>
											{doesPasswordMatchSuccess(props.values) ? (
												<View style={ [ styles.icon, styles.activeTickIcon ] }>
													<Icon
														type={ 'FontAwesome' }
														name={ 'check' }
														color={ '#FFF' }
														size={ 15 }
													/>
												</View>
											) : (
												<View style={ [ styles.icon, styles.infoIcon ] }>
													<Tooltip
														withOverlay={ true }
														overlayColor={ 'rgba(0, 0, 0, 0.5)' }
														highlightColor={ 'transparent' }
														withPointer={ true }
														height={ 140 }
														toggleOnPress={ true }
														width={ width / 1.3 }
														containerStyle={ styles.tooltipContainer }
														backgroundColor={ 'white' }
														skipAndroidStatusBar={ true }
														popover={ _renderPasswordInfo() }>
														<Icon
															type={ 'MaterialCommunityIcons' }
															name={ 'exclamation' }
															color={ 'white' }
															size={ 20 }
														/>
													</Tooltip>
												</View>
											)}
										</View>
										{props.touched.password && props.errors.password ? (
											<Text style={ passwordStyle.errorText }>
												{props.errors.password}
											</Text>
										) : (
											<Text style={ passwordStyle.errorText } />
										)}
									</View>
									<View style={ passwordStyle.textInputContainer }>
										<View style={ styles.passwordWrapper }>
											<View style={ passwordStyle.labelContainer }>
												<Text style={ passwordStyle.label }>
													Confirm Password
												</Text>
											</View>
											<TextInput
												style={ passwordStyle.textInput }
												placeholder="Retype Password"
												onChangeText={ value =>
													props.setFieldValue('confirm_password', value.trim())
												}
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
													<AntDesignIcon
														name="eyeo"
														size={ 17 }
														color="#5C5C5C"
													/>
												)}
											</TouchableOpacity>
											<View
												style={
													doesPasswordMatchSuccess(props.values)
														? [ styles.icon, styles.activeTickIcon ]
														: styles.icon
												}>
												<Icon
													type={ 'FontAwesome' }
													name={ 'check' }
													color={
														doesPasswordMatchSuccess(props.values)
															? '#FFF'
															: '#ACACAC'
													}
													size={ 15 }
												/>
											</View>
										</View>
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
										onChangeText={ value =>
											props.setFieldValue('first_name', value.trim())
										}
										value={ props.values.first_name }
										onBlur={ props.handleBlur('first_name') }
										error={ props.touched.first_name && props.errors.first_name }
										secureTextEntry={ false }
									/>
									<TextInputField
										lable="Last Name"
										placeholder="Enter Your Last Name"
										onChangeText={ value =>
											props.setFieldValue('last_name', value.trim())
										}
										value={ props.values.last_name }
										onBlur={ props.handleBlur('last_name') }
										error={ props.touched.last_name && props.errors.last_name }
										secureTextEntry={ false }
									/>
									<TextInputField
										lable="Zipcode"
										onChangeText={ value =>
											props.setFieldValue('zipcode', value.trim())
										}
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
											onPress={ () => showDatepicker(!show) }>
											{birthDate !== '' ? (
												<Text style={ styles.calenderText }>
													{moment(birthDate).format('MMM/DD/YYYY')}
												</Text>
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
											value={ date }
											mode={ mode }
											display="default"
											maximumDate={ new Date(year, month, day) }
											onChange={ (e, value) =>
												onChange(e, value, props.setFieldValue)
											}
											neutralButtonLabel="clear"
										/>
									)}
									{chooseDob ? (
										<Text style={ styles.errorText }>Required</Text>
									) : (
										<Text style={ styles.errorText }>
											{props.touched.date_of_birth &&
												props.errors.date_of_birth}
										</Text>
									)}
									<View style={ styles.genderWrapper }>
										<Text style={ styles.label }>Gender:</Text>
										<View style={ styles.radioWrapper }>
											{options.map(item => {
												return (
													<View key={ item.key } style={ styles.radioWrap }>
														<TouchableOpacity
															style={ styles.circle }
															onPress={ () => {
																selectGender(item.key);
																props.setFieldValue('gender', item.key);
															} }>
															{props.values.gender === item.key ? (
																<View style={ styles.checkedCircle } />
															) : (
																<Text />
															)}
														</TouchableOpacity>
														<Text style={ styles.genderText }>{item.text}</Text>
													</View>
												);
											})}
										</View>
									</View>

									{props.touched.gender && props.errors.gender ? (
										<Text style={ styles.errorText }>{props.errors.gender}</Text>
									) : (
										<Text />
									)}
									<View style={ styles.checkBoxWrap }>
										<TouchableOpacity onPress={ handlePress }>
											<Text style={ styles.checkText } />
											<CheckBox
												checkedImage={
													<View style={ styles.customCheckbox }>
														<Icon
															type={ 'MaterialCommunityIcons' }
															name={ 'check' }
															color={ 'green' }
															size={ 21 }
														/>
													</View>
												}
												unCheckedImage={ <View style={ styles.customCheckbox } /> }
												onClick={ () => setIsChecked(!isChecked) }
												style={ styles.checkbox }
												isChecked={ isChecked }
											/>
										</TouchableOpacity>
										<View style={ styles.termsWrapper }>
											<Text style={ styles.termsText1 }>I agree to the</Text>
											<TouchableOpacity
												activeOpacity={ 0.9 }
												onPress={ () =>
													navigation.navigate('TermsAndConditions')
												}>
												<Text style={ styles.termsText2 }>
													Terms and Conditions
												</Text>
											</TouchableOpacity>
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
		email: state.user.email,
		deviceToken: state.user.deviceToken
	};
}

export default connect(
	mapStateToProps,
	{
		getSignUp,
		getCheckName
	}
)(SignUpForm);
