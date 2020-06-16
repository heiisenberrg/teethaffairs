import React, { useState, useEffect } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	ScrollView,
	Platform
} from 'react-native';
import View from '../global/View';
import { connect } from 'react-redux';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNFetchBlob from 'rn-fetch-blob';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
	getMyProfile,
	uploadProfilePicture,
	editUser
} from '../../state/actions/user';
import styles from './styles';
import globalStyles from '../../globalStyles/index';
import TextInputField from '../textInputs/TextInputField';
import calender from '../../assets/calender.png';

const profileSchema = yup.object({
	first_name: yup.string().required('Required'),
	last_name: yup.string().required('Required'),
	email: yup.string(), //office email,
	date_of_birth: yup.string().required('Required')
});

const UpdateProfile = props => {
	const { user, getMyProfile, uploadProfilePicture, editUser } = props;

	const imageOptions = {
		title: 'Profile Photo',
		customButtons: [ { name: 'image', title: 'Take a Photo' } ],
		chooseFromLibraryButtonTitle: 'Choose from gallery',
		takePhotoButtonTitle: null
	};

	const [ profileImage, setProfileImage ] = useState({});
	const doesUserProfileExists = () =>
		user && user.user_profile && user.user_profile.length > 0;
	const [ initialValues, setInitialValues ] = useState({});
	const [ date, setDate ] = useState(new Date());
	const [ mode, setMode ] = useState('date');
	const [ show, setShow ] = useState(false);
	const [ birthDate, setBirthDate ] = useState(user.date_of_birth);

	useEffect(() => {
		getMyProfile();
	}, []);

	useEffect(() => {
		if (doesUserProfileExists()) {
			const values = {
				email: user.email,
				first_name: user.first_name,
				last_name: user.last_name,
				date_of_birth: birthDate
			};
			setInitialValues(values);
		}
		if (user && user.profile_pic) {
			setProfileImage({ uri: user.profile_pic });
		}
	}, [ user ]);

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
				setProfileImage(source);
				saveProfilePhoto(source);
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
				setProfileImage(source);
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

	const handleSubmit = values => {
		editUser(values);
	};

	const onChange = (event, selectedDate) => {
		setShow(Platform.OS === 'ios');

		var currentDate = '';
		if (selectedDate !== undefined && selectedDate !== '') {
			var date = new Date(selectedDate).toISOString();
			setBirthDate(date);
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

	return (
		<ScrollView
			showsVerticalScrollIndicator={ false }
			contentContainerStyle={ styles.background }>
			<TouchableOpacity
				activeOpacity={ 0.8 }
				onPress={ takeImageHandler }
				style={ styles.imageWrapper }>
				<View style={ styles.imageContainer }>
					<Image
						source={
							profileImage
								? { uri: profileImage.uri }
								: require('../../assets/profile.png')
						}
						style={ styles.image }
					/>
				</View>
			</TouchableOpacity>
			<Formik
				initialValues={ initialValues }
				enableReinitialize
				validationSchema={ profileSchema }
				onSubmit={ values => {
					handleSubmit(values);
				} }>
				{props => (
					<View style={ styles.container }>
						<View style={ styles.content }>
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
								lable="Email"
								placeholder="Enter Email"
								onChangeText={ props.handleChange('email') }
								value={ props.values.email }
								onBlur={ props.handleBlur('email') }
								error={ props.touched.email && props.errors.email }
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
										<Text style={ styles.calenderText }>Month / Date / Year</Text>
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
									onChange={ onChange }
									neutralButtonLabel="clear"
								/>
							)}
						</View>
						<TouchableOpacity
							style={ globalStyles.secondaryButton }
							onPress={ props.handleSubmit }
							activeOpacity={ 0.8 }>
							<Text style={ globalStyles.buttonText }>save</Text>
						</TouchableOpacity>
					</View>
				)}
			</Formik>
		</ScrollView>
	);
};

const mapStateToProps = state => {
	return {
		user: state.user.user
	};
};

export default connect(
	mapStateToProps,
	{ getMyProfile, uploadProfilePicture, editUser }
)(UpdateProfile);
