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
import ImagePicker from 'react-native-image-picker';
import moment from 'moment';
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
import FlashMessage from '../../global/FlashMessage';

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
	date_of_birth: yup.string(),
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
	date_of_birth: yup.string(),
	gender: yup.string(),
	id: yup.string(),
	relation: yup.string()
});

const imageOptions = {
	title: 'Choose Profile Photo',
	customButtons: [ { name: 'image', title: 'Take a Photo' } ],
	chooseFromLibraryButtonTitle: 'Choose from gallery',
	takePhotoButtonTitle: null,
	storageOptions: {
		skipBackup: true,
		path: 'images'
	}
};

/* eslint-disable no-undef */
const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

let relation_options = [
	{
		value: 'SON'
	},

	{
		value: 'DAUGHTER'
	},

	{
		value: 'FATHER'
	},

	{
		value: 'MOTHER'
	},
	{
		value: 'WIFE'
	},
	{
		value: 'HUSBAND'
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
	const { navigation, getAddMember, route: { params: { userdata } }, user } = props;
	const [ isModalVisible, setIsModalVisible ] = useState(false);
	const [ addMember, setAddMember ] = useState(false);
	const [ imageSource, setImageSource ] = useState(null);
	const [ updateMember, setUpdateMember ] = useState(false);
	const [ userId, setUserId ] = useState('');
	const [ date, setDate ] = useState(new Date());
	const [ mode, setMode ] = useState('date');
	const [ show, setShow ] = useState(false);
	const [ birthDate, setBirthDate ] = useState(userdata.date_of_birth);
	const [ showEye, setShowEye ] = useState(true);
	const [ showConfirmEye, setShowConfirmEye ] = useState(true);

	const handleSubmit = memberDetails => {
		memberDetails.zipcode = user.zipcodes;
		memberDetails.email = memberDetails.username + '@teethaffais.com';
		
		memberDetails.profile.relationship = memberDetails.relation;

		if (updateMember) {
			memberDetails.id = userId;
		}
		memberDetails.date_of_birth = birthDate;
		getAddMember({ data: memberDetails, onSuccess: onGetAddMemberSuccess, onFailure: onGetAddMemberFailure });
		setBirthDate('');
	};

	const onGetAddMemberFailure = () => {
		setAddMember(true);
		// alert('Something went wrong!');
		FlashMessage.message('Alert', 'Something went wrong', '#ff4444');
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
			var date = new Date(selectedDate).toISOString();
			console.log('========++++++++++=====++++++=', date);
			setBirthDate(date);
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

	const launchCamera = () => {
		let options = {
			skipBackup: true,
			path: 'images'
		};
		ImagePicker.launchCamera(options, response => {
			console.log('Response = ', response);
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				console.log('response', JSON.stringify(response));
				let source = {
					...response
				};
				setImageSource(source);
			}
		});
	};


	const takeImageHandler = () => {
		ImagePicker.showImagePicker(imageOptions, response => {
			console.log('========image picker=======', response);
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
				launchCamera();
			} else {
				let source = {
					...response
				};
				setImageSource(source);
			}
		});
	};

	return (
		<SafeAreaView style={ styles.container }>
			<ScrollView showsVerticalScrollIndicator={ false }>
				<TouchableOpacity
					activeOpacity={ 0.8 }
					onPress={ takeImageHandler }
					style={ styles.profileImageContainer }>
					<Image
						source={ imageSource ? { uri: imageSource.uri } : require('../../../assets/profile.png') }
						style={ styles.profileImage }
					/>
				</TouchableOpacity>
				<Formik
					initialValues={ {
						email:
							userdata !== undefined
								? userdata.email
								: '',
						first_name:
							userdata !== undefined
								? userdata.first_name
								: '',
						last_name:
							userdata !== undefined
								? userdata.last_name
								: '',
						password: '',
						confirm_password: '',
						date_of_birth: '',
						zipcode:
							userdata !== undefined &&
							userdata !== ''
								? userdata.zipcode.toString()
								: '',
						gender:
							userdata !== undefined
								? userdata.gender
								: '',
						username:
							userdata !== undefined
								? userdata.username
								: '',
						user_type: 'MEMBER_PATIENT',
						profile: {
							relationship:
								userdata && userdata.user_profile.length > 0
									? userdata.user_profile[0].relationship
									: ''
						},
						id: '',
						relation:
						userdata && userdata.user_profile.length > 0
								? userdata.user_profile[0].relationship	
								: ''
					} }
					validationSchema={
						addMember === true ? addMemberSchema : updateMemberSchema
					}
					enableReinitialize
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
											<Text style={ styles.calenderText }>{moment(birthDate).format('MMM/DD/YYYY')}</Text>
										) : (
											<Text style={ styles.calenderText }>
												Month / Date / Year
											</Text>
										)}
										<Image source={ calender } style={ styles.calenderStyle } />
									</TouchableOpacity>
								</View>
								<Text style={ styles.errorText }>
									{props.touched.date_of_birth && props.errors.date_of_birth}
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
										value={ props.values.relation }
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
									<Text style={ globalStyles.buttonText }>{addMember === true ? 'Add' : 'Update'}</Text>
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

const mapStateToProps = (state) => ({
	resp: state.journal,
	user: state.user.user
});

export default connect(
	mapStateToProps,
	{
		getAddMember,
		setAddMember
	}
)(AddMembersForm);
