import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
	Image,
	Modal,
	TextInput,
	Dimensions,
	Platform
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
import { uploadProfilePicture } from '../../../state/actions/user';

import styles from './styles';
import globalStyles from '../../../globalStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import calender from '../../../assets/calender.png';
import { Dropdown } from 'react-native-material-dropdown';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import FlashMessage from '../../global/FlashMessage';
import Tooltip from '../../global/Tooltip/Tooltip';
import Icon from '../../global/Icon';
import Config from 'react-native-config';
import RNFetchBlob from 'rn-fetch-blob';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width } = Dimensions.get('screen');

const addMemberSchema = yup.object({
	first_name: yup.string().required('Required'),
	last_name: yup.string().required('Required'),
	username: yup.string(),
	password: yup
		.string()
		.min(8, 'Too Short!')
		.matches(
			/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
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
	id: yup.string(),
	date_of_birth: yup.string().required('Required'),
	gender: yup.string().required('Required'),
	relation: yup.string().required('Required'),
	zipcode: yup.string().required('Required')
});

const updateMemberSchema = yup.object({
	first_name: yup.string('Required'),
	last_name: yup.string('Required'),
	username: yup.string().required('User ID is a required field.'),
	password: yup.string().label('Password'),
	confirm_password: yup
		.string()
		.test('passwords-match', 'Passwords does not match', function(value) {
			return this.parent.password === value;
		}),
	date_of_birth: yup.string(),
	gender: yup.string(),
	id: yup.string(),
	relation: yup.string(),
	zipcode: yup.string().required('Required')
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
		value: 'SISTER'
	},
	{
		value: 'BROTHER'
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
	const {
		navigation,
		getAddMember,
		route: {
			params: { userdata }
		},
		user,
		uploadProfilePicture
	} = props;
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
	const [ userName, setUserName ] = useState(userdata.username);
	const [ checkExist, setCheckExist ] = useState(true);

	const handleSubmit = memberDetails => {
		memberDetails.zipcode =
			memberDetails.zipcode && memberDetails.zipcode.length > 0
				? [ memberDetails.zipcode ]
				: user.zipcodes;
		memberDetails.email = memberDetails.username + '@teethaffais.com';

		memberDetails.profile.relationship = memberDetails.relation;

		if (updateMember) {
			memberDetails.id = userId;
		}
		memberDetails.date_of_birth = birthDate;
		getAddMember({
			data: memberDetails,
			onSuccess: response => onGetAddMemberSuccess(response),
			onFailure: onGetAddMemberFailure
		});
	};

	const onGetAddMemberFailure = () => {
		setAddMember(true);
		FlashMessage.message('Alert', 'Something went wrong', '#ff4444');
	};

	const onGetAddMemberSuccess = data => {
		addedMember = data.username
			? data.username
			: data[0].username
			? data[0].username
			: '';
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

	const launchCamera = () => {
		let options = {
			skipBackup: true,
			path: 'images'
		};
		ImagePicker.launchCamera(options, response => {
			if (response.didCancel) {
			} else if (response.error) {
			} else if (response.customButton) {
			} else {
				let source = {
					...response
				};
				setImageSource(source);
			}
		});
	};

	const takeImageHandler = () => {
		ImagePicker.showImagePicker(imageOptions, response => {
			if (response.didCancel) {
			} else if (response.error) {
			} else if (response.customButton) {
				launchCamera();
			} else {
				let source = {
					...response
				};
				setImageSource(source);
				saveProfilePhoto(source);
			}
		});
	};

	const saveProfilePhoto = item => {
		const data = [
			{
				name: 'profile_pic',
				filename: `profile${Date.now()}`,
				data:
					Platform.OS === 'android'
						? RNFetchBlob.wrap(item.uri)
						: RNFetchBlob.wrap(item.uri.replace('file://', '')),
				type: item.type
			}
		];
		uploadProfilePicture(data);
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

	const onChange1 = name => {
		setUserName(name);
		let data = {
			username: name
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
					onSuccess(true);
				} else {
					onFailure(false);
				}
			})
			.catch(() => {
				onFailure(false);
			}); //need to modify this api call
	};

	const onSuccess = () => {
		setCheckExist(true);
	};

	const onFailure = () => {
		setCheckExist(false);
	};

	return (
		<SafeAreaView style={ styles.container }>
			<ScrollView showsVerticalScrollIndicator={ false }>
				<TouchableOpacity
					activeOpacity={ 0.8 }
					onPress={ takeImageHandler }
					style={ styles.profileImageContainer }>
					<Image
						source={
							imageSource
								? { uri: imageSource.uri }
								: require('../../../assets/profile.png')
						}
						style={ styles.profileImage }
					/>
				</TouchableOpacity>
				<Formik
					initialValues={ {
						email: userdata !== undefined ? userdata.email : '',
						first_name: userdata !== undefined ? userdata.first_name : '',
						last_name: userdata !== undefined ? userdata.last_name : '',
						password: '',
						confirm_password: '',
						date_of_birth: '',
						zipcode:
							userdata && userdata.zipcode && userdata !== ''
								? userdata.zipcode.toString()
								: '',
						gender: userdata !== undefined ? userdata.gender : '',
						username: userdata !== undefined ? userdata.username : '',
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
						values.username = userName;
						if (values.username !== '' && checkExist === true) {
							handleSubmit(values, actions);
							actions.resetForm();
						}
					} }>
					{props => (
						<View style={ styles.signupContainer }>
							<KeyboardAwareScrollView showsVerticalScrollIndicator={ false }>
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
									editable={ addMember }
									onChangeText={ text => onChange1(text) }
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
								{addMember === true ? (
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
													<AntDesignIcon
														name="eyeo"
														size={ 17 }
														color="#5C5C5C"
													/>
												)}
											</TouchableOpacity>
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
										</View>
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
										<View style={ styles.passwordWrapper }>
											<View style={ passwordStyle.labelContainer }>
												<Text style={ passwordStyle.label }>
													Confirm Password
												</Text>
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
								) : (
									<Text style={ styles.removeSpace } />
								)}
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
								<Text style={ styles.errorText }>
									{props.touched.date_of_birth && props.errors.date_of_birth}
								</Text>
								{show && (
									<DateTimePicker
										testID="dateTimePicker"
										value={ date }
										mode={ mode }
										display="default"
										maximumDate={ new Date() }
										onChange={ (e, value) =>
											onChange(e, value, props.setFieldValue)
										}
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
									<View style={ styles.searchIcon } />
								</View>
								{props.touched.relation && props.errors.relation ? (
									<Text style={ styles.errorText }>{props.errors.relation}</Text>
								) : (
									<Text />
								)}
								<TextInputField
									lable="Zipcode"
									placeholder="Enter Zipcode"
									onChangeText={ props.handleChange('zipcode') }
									value={ props.values.zipcode }
									onBlur={ props.handleBlur('zipcode') }
									error={ props.touched.zipcode && props.errors.zipcode }
									secureTextEntry={ false }
								/>
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
									<Text style={ globalStyles.buttonText }>
										{addMember === true ? 'Add' : 'Update'}
									</Text>
								</TouchableOpacity>
							</KeyboardAwareScrollView>
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
									style={ styles.closeIcon }
								/>
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
							onPress={ () => navigation.navigate('AddMembers', { reload: true }) }>
							<Text style={ styles.continueButtonText }>Continue</Text>
						</TouchableOpacity>
					</LinearGradient>
				</View>
			</Modal>
		</SafeAreaView>
	);
}

const mapStateToProps = state => ({
	resp: state.journal,
	user: state.user.user
});

export default connect(
	mapStateToProps,
	{
		getAddMember,
		setAddMember,
		uploadProfilePicture
	}
)(AddMembersForm);
