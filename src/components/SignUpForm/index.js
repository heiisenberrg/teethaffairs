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
import { getSignUp } from '../../state/actions/user';
import calender from '../../assets/calender.png';
import FlashMessage from '../global/FlashMessage';
import styles from './styles';
import globalStyles from '../../globalStyles';
import passwordStyle from '../textInputs/style';

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
	username: yup.string().required('Required'),
	password: yup
		.string()
		.min(8, 'Too Short!')
		.required('Required')
		.label('Password'),
	confirm_password: yup
		.string()
		.required('Required')
		.test('passwords-match', 'Passwords does not match', function(value) {
			return this.parent.password === value;
		}),
	date_of_birth: yup.string().required('Required'),
	zipcode: yup.string().required('Required'),
	// pin: yup.string().required(),
	gender: yup.string().required('Required')
});

function SignUpForm(props) {
	const { getSignUp, navigation, deviceToken } = props;
	const [ isChecked, setIsChecked ] = useState(false);
	const [ date, setDate ] = useState(new Date());
	const [ mode, setMode ] = useState('date');
	const [ show, setShow ] = useState(false);
	// const [ , setShowTooltip ] = useState(true);
	const [ birthDate, setBirthDate ] = useState('');
	const [ gender, selectGender ] = useState('');
	const [ showEye, setShowEye ] = useState(true);
	const [ showConfirmEye, setShowConfirmEye ] = useState(true);

	const onGetSignupSuccess = () => {
		navigation.navigate('AccountSuccess');
	};

	const onGetSignupFailure = () => {
		// navigation.navigate('AccountSuccess');
	};

	const handleSubmit = (data, actions) => {
		if(isChecked) {
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
				actions.resetForm();
			}
		} else {
			FlashMessage.message('Alert', 'Please check the Terms and Conditions.', '#33b5e5');
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

	const doesPasswordMatchSuccess = (values) => values.password && values.confirm_password && values.password === values.confirm_password;

	const _renderPasswordInfo = () => (
		<View style={ styles.popoverContainerText }>
			<Text style={ styles.popoverTitle }>Password should be</Text>
				<View style={ styles.popoverLineItem }>
					<View style={ styles.bullet }/>
					<Text style={ styles.popoverText }>Minimum of 8 characters</Text>
				</View>
				<View style={ styles.popoverLineItem }>
					<View style={ styles.bullet }/>
					<Text style={ styles.popoverText }>At least one number or symbol(!@#$%^)</Text>
				</View>
				<View style={ styles.popoverLineItem }>
					<View style={ styles.bullet }/>
					<Text style={ styles.popoverText }>Do not use space</Text>
				</View>
				<View style={ styles.popoverLineItem }>
					<View style={ styles.bullet }/>
					<Text style={ styles.popoverText }>Do not use email address</Text>
				</View>
		</View>
	);

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
				<ScrollView>
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
							handleSubmit(values, actions);
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
										<View style={ styles.passwordWrapper }>
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
											<View style={ [ styles.icon,styles.infoIcon ] }>
												<Tooltip
													withOverlay={ true }
													overlayColor={ 'rgba(0, 0, 0, 0.5)' }
													highlightColor={ 'transparent' }
													withPointer={ true }
													height={ 140 }
													toggleOnPress={ true }
													width={ width / 1.5 }
													containerStyle={ styles.tooltipContainer }
													// toggleOnPress={ showTooltip }
													backgroundColor={ 'white' }
													// onClose={ () => setShowTooltip(false) }
													// onOpen={ () => setShowTooltip(true) }
													skipAndroidStatusBar={ true }
													popover={ _renderPasswordInfo() }
												>
													<Icon
														type={ 'MaterialCommunityIcons' }
														name={ 'exclamation' }
														color={ 'white' }
														size={ 20 }
													/>
												</Tooltip>
											</View>
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
												<Text style={ passwordStyle.label }>Confirm Password</Text>
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
											<View style={ doesPasswordMatchSuccess(props.values) ? [ styles.icon, styles.activeTickIcon ] : styles.icon }>
												<Icon
													type={ 'FontAwesome' }
													name={ 'check' }
													color={ doesPasswordMatchSuccess(props.values) ? '#FFF' : '#ACACAC' }
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
												<Text style={ styles.calenderText }>{moment(birthDate).format('MMM/DD/YYYY')}</Text>
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
											maxDate={ new Date() }
											value={ date }
											mode={ mode }
											display="default"
											onChange={ (e, value) => onChange(e, value, props.setFieldValue) }
											neutralButtonLabel="clear"
										/>
									)}
									<Text style={ styles.errorText }>
										{props.touched.date_of_birth && props.errors.date_of_birth}
									</Text>
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
															} } >
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
		email: state.user.email,
		deviceToken: state.user.deviceToken
	};
}

export default connect(
	mapStateToProps,
	{
		getSignUp
	}
)(SignUpForm);
