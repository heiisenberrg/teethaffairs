import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
	KeyboardAvoidingView,
	Image,
	Modal
} from 'react-native';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import * as yup from 'yup';
import LinearGradient from 'react-native-linear-gradient';

import TextInputField from '../../textInputs/TextInputField';
import { getAddMember, setAddMember } from '../../../state/actions/journal';

import styles from './styles';
import globalStyles from '../../../globalStyles';

const addMemberSchema = yup.object({
	email: yup
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
	zipcode: yup.string().required(),
	pin: yup.string().required(),
	gender: yup
		.string()
		.uppercase()
		.required(),
	id: yup.string()
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
	zipcode: yup.string(),
	pin: yup.string(),
	gender: yup.string().uppercase(),
	id: yup.string()
});

function AddMembersForm(props) {
	const { navigation, getAddMember } = props;
	const [ isModalVisible, setIsModalVisible ] = useState(false);
	const [ addMember, setAddMember ] = useState(false);
	const [ updateMember, setUpdateMember ] = useState(false);
	const [ userId, setUserId ] = useState('');

	const handleSubmit = memberDetails => {
		memberDetails.zipcode = memberDetails.zipcode.split();
		if (updateMember) {
			memberDetails.id = userId;
		}
		getAddMember(memberDetails, onGetAddMemberFailure, onGetAddMemberSuccess);
		setAddMember(false);
		setUpdateMember(false);
		setIsModalVisible(true);
	};

	const onGetAddMemberFailure = () => {
		// alert('Network Error');
	};

	const onGetAddMemberSuccess = () => {
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

	return (
		<SafeAreaView style={ styles.container }>
			<KeyboardAvoidingView enabled>
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
							pin:
								props.route.params.userdata !== undefined
									? props.route.params.userdata.pin
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
								relationship: 'SON'
							},
							id: ''
						} }
						validationSchema={
							addMember === true ? addMemberSchema : updateMemberSchema
						}
						onSubmit={ (values, actions) => {
							actions.resetForm();
							handleSubmit(values);
						} }>
						{props => (
							<View>
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
									placeholder="Enter Email Id"
									onChangeText={ props.handleChange('email') }
									value={ props.values.email }
									onBlur={ props.handleBlur('email') }
									error={ props.touched.email && props.errors.email }
									secureTextEntry={ false }
								/>
								{addMember === true ? (
									<View>
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
									</View>
								) : (
									<Text style={ styles.removeSpace }></Text>
								)}
								<TextInputField
									lable="User Name"
									placeholder="Enter Your User Name"
									onChangeText={ props.handleChange('username') }
									value={ props.values.username }
									onBlur={ props.handleBlur('username') }
									error={ props.touched.username && props.errors.username }
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
									lable="Zipcode"
									placeholder="Zipcode"
									onChangeText={ props.handleChange('zipcode') }
									value={ props.values.zipcode }
									keyboardType="numeric"
									onBlur={ props.handleBlur('zipcode') }
									error={ props.touched.zipcode && props.errors.zipcode }
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
								<TouchableOpacity
									style={ globalStyles.secondaryButton }
									onPress={ props.handleSubmit }>
									<Text style={ globalStyles.buttonText }>Add</Text>
								</TouchableOpacity>
							</View>
						)}
					</Formik>
					<Modal transparent={ true } visible={ isModalVisible }>
						<View style={ styles.modalWrap }>
							<LinearGradient
								start={ { x: 0.4, y: 0.1 } }
								end={ { x: 0.8, y: 1.1 } }
								colors={ [ '#0F8E79', '#66CC80' ] }
								style={ styles.successModalTextWrap }>
								<View style={ styles.successTextWrap }>
									<TouchableOpacity onPress={ () => setIsModalVisible(false) }>
										<Image
											source={ require('../../../assets/cross.png') }
											style={ styles.closeIcon }
										/>
									</TouchableOpacity>

									<Image
										source={ require('../../../assets/success.png') }
										style={ styles.successIcon }
									/>
									<Text style={ styles.successModalText1 }>success</Text>
									<Text style={ styles.successModalText2 }>
										brush and floss Reminder added
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
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

function mapStateToProps(state) {
	return {
		resp: state.journal
	};
}

export default connect(mapStateToProps, {
	getAddMember,
	setAddMember
})(AddMembersForm);
