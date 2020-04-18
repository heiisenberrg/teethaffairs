import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
	KeyboardAvoidingView,
	Image,
	Modal,
	TextInput
} from 'react-native';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import * as yup from 'yup';
import LinearGradient from 'react-native-linear-gradient';

import TextInputField from '../../textInputs/TextInputField';
import passwordStyle from '../../textInputs/style';
import { getAddMember, setAddMember } from '../../../state/actions/journal';

import styles from './styles';
import globalStyles from '../../../globalStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import calender from '../../../assets/calender.png';
import { Dropdown } from 'react-native-material-dropdown';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import dropdownIcon from '../../../assets/drop-right.png';
import store from '../../../state/store';

const addMemberSchema = yup.object({
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
	id: yup.string(),
	dob: yup.string(),
	gender: yup.string().required(),

	relation: yup.string().required()
});

const updateMemberSchema = yup.object({
	first_name: yup.string(),
	last_name: yup.string(),
	username: yup.string(),
	password: yup.string().label('Password'),
	confirm_password: yup
		.string()
		.test('passwords-match', 'Passwords does not match', function(value) {
			return this.parent.password === value;
		}),
	dob: yup.string(),
	gender: yup.string(),
	id: yup.string(),
	relation: yup.string()
});

/* eslint-disable no-undef */
const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

let relation_options = [
	{
		value: 'Son'
	},

	{
		value: 'Daughter'
	},

	{
		value: 'Father'
	},

	{
		value: 'Mother'
	},
	{
		value: 'Wife'
	},
	{
		value: 'Husband'
	}
];

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
var addedMember;

function AddMembersForm(props) {
	const { navigation, getAddMember } = props;
	const [ isModalVisible, setIsModalVisible ] = useState(false);
	const [ addMember, setAddMember ] = useState(false);
	const [ updateMember, setUpdateMember ] = useState(false);
	const [ userId, setUserId ] = useState('');
	const [ date, setDate ] = useState(new Date(1598051730000));
	const [ mode, setMode ] = useState('date');
	const [ show, setShow ] = useState(false);
	const [ birthDate, setBirthDate ] = useState('');
	const [ showEye, setShowEye ] = useState(true);
	const [ showConfirmEye, setShowConfirmEye ] = useState(true);

	const handleSubmit = memberDetails => {
		memberDetails.zipcode = store.getState().user.zipcodes;
		memberDetails.email = memberDetails.username + '@teethaffais.com';
		
		memberDetails.profile.relationship = memberDetails.relation;

		if (updateMember) {
			memberDetails.id = userId;
		}
		memberDetails.dob = birthDate;
		getAddMember(memberDetails, onGetAddMemberFailure, onGetAddMemberSuccess);
		setBirthDate('');
	};

	const onGetAddMemberFailure = () => {
		setAddMember(true);
		alert('Something went wrong!');
	};

	const onGetAddMemberSuccess = data => {
		addedMember = data.username;
		setIsModalVisible(true);
	};

	useEffect(function() {
		if (
			props.route.params.userdata !== undefined &&
			props.route.params.userdata !== ''
		) {
			setUpdateMember(true);
			setUserId(props.route.params.userdata.id);
		} else {
			setAddMember(true);
		}
	}, []);

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
		<SafeAreaView style={ styles.container }>
			<ScrollView>
				<View style={ styles.profileImageContainer }>
					<Image
						source={ require('../../../assets/profile.png') }
						style={ styles.profileImage }
					/>
				</View>
				<Formik
					initialValues={ {
						email:
							props.route.params.userdata !== undefined
								? props.route.params.userdata.email
								: '',
						first_name:
							props.route.params.userdata !== undefined
								? props.route.params.userdata.first_name
								: '',
						last_name:
							props.route.params.userdata !== undefined
								? props.route.params.userdata.last_name
								: '',
						password: '',
						confirm_password: '',
						dob: '',
						zipcode:
							props.route.params.userdata !== undefined &&
							props.route.params.userdata !== ''
								? props.route.params.userdata.zipcode.toString()
								: '',
						gender:
							props.route.params.userdata !== undefined
								? props.route.params.userdata.gender
								: '',
						username:
							props.route.params.userdata !== undefined
								? props.route.params.userdata.username
								: '',
						user_type: 'MEMBER_PATIENT',
						profile: {
							relationship:
								props.route.params.userdata !== undefined
									? props.route.params.userdata.relation
									: ''
						},
						id: '',
						relation:
							props.route.params.userdata !== undefined
								? props.route.params.userdata.relation
								: ''
					} }
					validationSchema={
						addMember === true ? addMemberSchema : updateMemberSchema
					}
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
									lable="First Name"
									placeholder="Enter First Name"
									onChangeText={ props.handleChange('first_name') }
									value={ props.values.first_name }
									onBlur={ props.handleBlur('first_name') }
									error={ props.touched.first_name && props.errors.first_name }
									secureTextEntry={ false }
								/>
								<TextInputField
									lable="Last Name"
									placeholder="Enter Last Name"
									onChangeText={ props.handleChange('last_name') }
									value={ props.values.last_name }
									onBlur={ props.handleBlur('last_name') }
									error={ props.touched.last_name && props.errors.last_name }
									secureTextEntry={ false }
								/>
								<TextInputField
									lable="User ID"
									placeholder="Enter User ID"
									onChangeText={ props.handleChange('username') }
									value={ props.values.username }
									onBlur={ props.handleBlur('username') }
									error={ props.touched.username && props.errors.username }
									secureTextEntry={ false }
								/>
								{addMember === true ? (
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
								) : (
									<Text style={ styles.removeSpace } />
								)}
								{addMember === true ? (
									<View style={ passwordStyle.textInputContainer }>
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
										{props.touched.confirm_password &&
										props.errors.confirm_password ? (
											<Text style={ passwordStyle.errorText }>
												{props.errors.confirm_password}
											</Text>
										) : (
											<Text style={ passwordStyle.errorText } />
										)}
									</View>
								) : (
									<Text style={ styles.removeSpace } />
								)}
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
								<Text style={ styles.errorText }>
									{props.touched.dob && props.errors.dob}
								</Text>
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
								<View style={ styles.dropdown }>
									<View style={ styles.labelContainer }>
										<Text style={ styles.label }>Relation</Text>
									</View>
									<Dropdown
										data={ relation_options }
										baseColor="white"
										labelFontSize={ 12 }
										fontSize={ 12 }
										onChangeText={ value =>
											props.setFieldValue('relation', value.toUpperCase())
										}
									/>
									<Image source={ dropdownIcon } style={ styles.searchIcon } />
								</View>
								{props.touched.relation && props.errors.relation ? (
									<Text style={ styles.errorText }>{props.errors.relation}</Text>
								) : (
									<Text />
								)}
								{addMember === true ? (
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
								) : (
									<Text style={ styles.removeSpace } />
								)}
								{addMember === true ? (
									props.touched.gender && props.errors.gender ? (
										<Text style={ styles.errorText }>{props.errors.gender}</Text>
									) : (
										<Text />
									)
								) : (
									<Text style={ styles.removeSpace } />
								)}
								<TouchableOpacity
									style={ globalStyles.secondaryButton }
									onPress={ props.handleSubmit }>
									<Text style={ globalStyles.buttonText }>Add</Text>
								</TouchableOpacity>
							</KeyboardAvoidingView>
						</View>
					)}
				</Formik>
			</ScrollView>
			<Modal transparent={ true } visible={ isModalVisible }>
						<View style={ styles.modalWrap }>
							<LinearGradient
								start={ { x: 0.4, y: 0.1 } }
								end={ { x: 0.8, y: 1.1 } }
								colors={ [ '#0F8E79', '#66CC80' ] }
								style={ styles.successModalTextWrap }>
								<View style={ styles.successTextWrap }>
									<TouchableOpacity onPress={ () => setIsModalVisible(false) }>
										<AntDesignIcon
										name="close"
										size={ 20 }
										color="#ffffff"
										style={ styles.closeIcon }/>
									</TouchableOpacity>
									<Image
										source={ require('../../../assets/success.png') }
										style={ styles.successIcon }
									/>
									<Text style={ styles.successModalText1 }>success</Text>
									<Text style={ styles.successModalText2 }>
										"{addedMember}" added to your members list
									</Text>
								</View>
								<TouchableOpacity
									style={ styles.continueButton }
									onPress={ () => navigation.navigate('AddMembers') }>
									<Text style={ styles.continueButtonText }>Continue</Text>
								</TouchableOpacity>
							</LinearGradient>
						</View>
					</Modal>
		</SafeAreaView>
	);
}

function mapStateToProps(state) {
	return {
		resp: state.journal
	};
}

export default connect(
	mapStateToProps,
	{
		getAddMember,
		setAddMember
	}
)(AddMembersForm);
