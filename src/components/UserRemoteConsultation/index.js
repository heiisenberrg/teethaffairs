import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	KeyboardAvoidingView,
	Image,
	TextInput,
	Switch,
	TouchableOpacity,
	ScrollView
} from 'react-native';

import { connect } from 'react-redux';

import { Formik } from 'formik';
import * as yup from 'yup';
import CheckBox from 'react-native-check-box';

import TextBoxRadioButton from '../textInputs/TextBoxRadioButton';

import {
	getDoctorsList,
	setDoctorsList,
	getQuestion,
	setQuestion
} from '../../state/actions/journal';

import styles from './styles';
import globalStyles from '../../globalStyles';

import AsyncStorage from '@react-native-community/async-storage';
import store from '../../state/store';

/* eslint-disable no-mixed-spaces-and-tabs */

var medical_conditions = [];
var allergies_array = [];

const userNoteSchema = yup.object({
	height: yup.number(),
	weight: yup.number(),
	age: yup.number(),
	allergies: yup.string(),
	id: yup.string(),
	zipcode: yup.string()
});

function UserRemoteConsultation(props) {
	const {
		getDoctorsList,
		doctors_list,
		getQuestion,
		doctorZipcode,
		doctorId
	} = props;

	const [ showHistoryForm, setShowHistoryForm ] = useState(false);
	const [ isEnabled, setIsEnabled ] = useState(false);
	const [ isDiabetes, setIsDiabetes ] = useState(false);
	const [ isHighBloodPressure, setIsHighBloodPressure ] = useState(false);
	const [ isHeartIssues, setIsHeartIssues ] = useState(false);
	const [ isRespiratoryIssues, setIsRespiratoryIssues ] = useState(false);
	const [ isDigestiveIssues, setIsDigestiveIssues ] = useState(false);
	const [ isThyroidIssues, setIsThyroidIssues ] = useState(false);
	const [ arrayHolder, setArrayHolder ] = useState([]);
	const [ textInputHolder, setTextInputHolder ] = useState('');
	const [ userNoteId, setUserNoteId ] = useState('');
	const [ userZipCode, setUserZipCode ] = useState('');

	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

	const handleSubmit = (data) => {
		var question_data = {
			patient_zipcode: userZipCode,
			doctor_zipcode: userZipCode,
			doctor: doctorId
		};
		data.allergies = arrayHolder;
		if (doctorZipcode !== '' && doctorZipcode !== undefined) {
			getQuestion(
				data,
				userNoteId,
				question_data,
				onSuccess,
				onFailure
			);
		} else {
			alert('Please select a dentist');
		}
	};

	const handleCheckBox = (value, state, isChecked) => {
		if (isChecked === true) {
			medical_conditions.push(value);
		} else {
			medical_conditions = medical_conditions.filter((data) =>
				(data !== value ? data : '')
			);
		}
	};

	const handleRemoveCheckBox = (value) => {
		medical_conditions = medical_conditions.filter((data) =>
			(data !== value ? data : '')
		);
	};

	const onSuccess = () => {
		alert('questions has been sent');
	};

	const onFailure = () => {
		alert('Somthing went wrong!');
	};

	useEffect(function () {
		let user_zipcode = JSON.parse(store.getState().user.zipcodes);
		setUserZipCode(user_zipcode);
		getDoctorsList(user_zipcode, onFailure);
		getUserNoteId();
	}, []);

	const getUserNoteId = async () => {
		let noteId = await AsyncStorage.getItem('noteId');
		setUserNoteId(noteId);
		AsyncStorage.removeItem('noteId');
	};

	const joinData = () => {
		if (textInputHolder !== '') {
			allergies_array.push(textInputHolder);
			setArrayHolder(allergies_array);
			setTextInputHolder('');
		}
	};

	const onRemoveHandler = (remove_item) => {
		allergies_array = allergies_array.filter((data) =>
			(data !== remove_item ? data : '')
		);
		setArrayHolder(allergies_array);
		setTextInputHolder('');
	};

	return (
		<View style={ styles.container }>
			<ScrollView>
				<KeyboardAvoidingView enabled>
					<Formik
						initialValues={ {
							height: '',
							weight: '',
							allergies: '',
							id: '',
							zipcode: ''
						} }
						validationSchema={ userNoteSchema }
						onSubmit={ (values, actions) => {
							actions.resetForm();
							handleSubmit(values);
						} }>
						{(props) => (
							<View>
								<View style={ styles.healthHistoryContainer }>
									<Text style={ styles.healthHistoryText }>health history</Text>
									<View style={ styles.iconViewWrap }>
										<TouchableOpacity
											onPress={ () => setShowHistoryForm(!showHistoryForm) }>
											<View style={ styles.dropdownIconWrapper }>
												<Image
													source={
														showHistoryForm
															? require('../../assets/drop-down.png')
															: require('../../assets/drop-right.png')
													}
													style={ styles.dropdown }
												/>
											</View>
										</TouchableOpacity>
									</View>
								</View>

								{showHistoryForm ? (
									<ScrollView>
										<View style={ styles.histoyrFormBlock }>
											<View style={ styles.textBoxWrapper }>
												<View style={ styles.updateBox }>
													<Text style={ styles.label1 }>Age</Text>
													<TextInput
														style={ styles.textInput1 }
														onChangeText={ props.handleChange('age') }
														value={ props.values.age }
														onBlur={ props.handleBlur('age') }
														secureTextEntry={ false }
														keyboardType="numeric"
													/>
													{props.touched.age && props.errors.age ? (
														<Text style={ styles.errorText }>
															{props.errors.age}
														</Text>
													) : (
														<Text />
													)}
												</View>
												<View style={ styles.updateBox }>
													<Text style={ styles.label1 }>Height</Text>
													<TextInput
														style={ styles.textInput1 }
														onChangeText={ props.handleChange('height') }
														value={ props.values.height }
														onBlur={ props.handleBlur('height') }
														secureTextEntry={ false }
														keyboardType="numeric"
													/>
													{props.touched.height && props.errors.height ? (
														<Text style={ styles.errorText }>
															{props.errors.height}
														</Text>
													) : (
														<Text />
													)}
												</View>
												<View style={ styles.updateBox }>
													<Text style={ styles.label1 }>Weight</Text>
													<TextInput
														style={ styles.textInput1 }
														onChangeText={ props.handleChange('weight') }
														value={ props.values.weight }
														onBlur={ props.handleBlur('weight') }
														secureTextEntry={ false }
														keyboardType="numeric"
													/>
													{props.touched.weight && props.errors.weight ? (
														<Text style={ styles.errorText }>
															{props.errors.weight}
														</Text>
													) : (
														<Text />
													)}
												</View>
											</View>
											<View style={ styles.allergiesBox }>
												<Text style={ styles.label1 }>Allergies:</Text>

												<View style={ styles.MainContainer }>
													<TextInput
														placeholder="Enter Value Here"
														multiline
														onChangeText={ (data) => setTextInputHolder(data) }
														value={ textInputHolder }
														style={ styles.textInputStyle }
														underlineColorAndroid="transparent"
													/>
													<TouchableOpacity
														onPress={ joinData }
														activeOpacity={ 0.7 }
														style={ styles.button }>
														<Image
															style={ styles.roundButton }
															source={ require('../../assets/round-plus.png') }
														/>
													</TouchableOpacity>
												</View>
												<View style={ styles.dummy1 }>
													{arrayHolder.map((data, index) => {
														return (
															<View
																style={ styles.enteredAllergiesBox }
																key={ index }>
																<Text
																	key={ index }
																	style={ styles.enteredAllergies }>
																	{data}
																</Text>
																<Text
																	style={ styles.crossText1 }
																	onPress={ () => onRemoveHandler(data) }>
																	X
																</Text>
															</View>
														);
													})}
												</View>
												<Text style={ styles.infoText }>
													Type none if no allergies
												</Text>
											</View>

											<View style={ styles.allergiesBox }>
												<Text style={ styles.label1 }>
													Medical conditions (Select all that apply)
												</Text>
												<View style={ styles.medicalContainer }>
													<View style={ styles.medicalIssueContainer }>
														<View style={ styles.checkBoxWrapper }>
															<Text style={ styles.checkBoxText }>Diabetes</Text>
															<CheckBox
																checkedImage={
																	<View style={ styles.customCheckbox }>
																		<Image
																			style={ styles.checkedStyle }
																			source={ require('../../assets/checkbox.png') }
																		/>
																	</View>
																}
																unCheckedImage={
																	<View style={ styles.customCheckbox } />
																}
																style={ styles.checkbox }
																onClick={ () => {
																	handleCheckBox(
																		'Diabetes',
																		setIsDiabetes(!isDiabetes),
																		!isDiabetes
																	);
																} }
																isChecked={ isDiabetes }
															/>
														</View>
														<View style={ styles.checkBoxWrapper }>
															<Text style={ styles.checkBoxText }>
																High Blood Pressure
															</Text>
															<CheckBox
																checkedImage={
																	<View style={ styles.customCheckbox }>
																		<Image
																			style={ styles.checkedStyle }
																			source={ require('../../assets/checkbox.png') }
																		/>
																	</View>
																}
																unCheckedImage={
																	<View style={ styles.customCheckbox } />
																}
																style={ styles.checkbox }
																onClick={ () => {
																	handleCheckBox(
																		'High Blood Pressure',
																		setIsHighBloodPressure(
																			!isHighBloodPressure
																		),
																		!isHighBloodPressure
																	);
																} }
																isChecked={ isHighBloodPressure }
															/>
														</View>
														<View style={ styles.checkBoxWrapper }>
															<Text style={ styles.checkBoxText }>
																Heart issues
															</Text>
															<CheckBox
																checkedImage={
																	<View style={ styles.customCheckbox }>
																		<Image
																			style={ styles.checkedStyle }
																			source={ require('../../assets/checkbox.png') }
																		/>
																	</View>
																}
																unCheckedImage={
																	<View style={ styles.customCheckbox } />
																}
																style={ styles.checkbox }
																onClick={ () => {
																	handleCheckBox(
																		'Heart Issues',
																		setIsHeartIssues(!isHeartIssues),
																		!isHeartIssues
																	);
																} }
																isChecked={ isHeartIssues }
															/>
														</View>
														<View style={ styles.checkBoxWrapper }>
															<Text style={ styles.checkBoxText }>
																Respiratory issues
															</Text>
															<CheckBox
																checkedImage={
																	<View style={ styles.customCheckbox }>
																		<Image
																			style={ styles.checkedStyle }
																			source={ require('../../assets/checkbox.png') }
																		/>
																	</View>
																}
																unCheckedImage={
																	<View style={ styles.customCheckbox } />
																}
																style={ styles.checkbox }
																onClick={ () => {
																	handleCheckBox(
																		'Respiratory Issues',
																		setIsRespiratoryIssues(
																			!isRespiratoryIssues
																		),
																		!isRespiratoryIssues
																	);
																} }
																isChecked={ isRespiratoryIssues }
															/>
														</View>
														<View style={ styles.checkBoxWrapper }>
															<Text style={ styles.checkBoxText }>
																Digestive issues
															</Text>
															<CheckBox
																checkedImage={
																	<View style={ styles.customCheckbox }>
																		<Image
																			style={ styles.checkedStyle }
																			source={ require('../../assets/checkbox.png') }
																		/>
																	</View>
																}
																unCheckedImage={
																	<View style={ styles.customCheckbox } />
																}
																style={ styles.checkbox }
																onClick={ () => {
																	handleCheckBox(
																		'Digestive Issues',
																		setIsDigestiveIssues(!isDigestiveIssues),
																		!isDigestiveIssues
																	);
																} }
																isChecked={ isDigestiveIssues }
															/>
														</View>
														<View style={ styles.checkBoxWrapper }>
															<Text style={ styles.checkBoxText }>
																Thyroid issues
															</Text>
															<CheckBox
																checkedImage={
																	<View style={ styles.customCheckbox }>
																		<Image
																			style={ styles.checkedStyle }
																			source={ require('../../assets/checkbox.png') }
																		/>
																	</View>
																}
																unCheckedImage={
																	<View style={ styles.customCheckbox } />
																}
																style={ styles.checkbox }
																onClick={ () => {
																	handleCheckBox(
																		'Thyroid Issues',
																		setIsThyroidIssues(!isThyroidIssues),
																		!isThyroidIssues
																	);
																} }
																isChecked={ isThyroidIssues }
															/>
														</View>
													</View>
													<View style={ styles.issueTextWrapper }>
														{isDiabetes ? (
															<View style={ styles.selectedTextWrapper }>
																<Text
																	style={ styles.crossText }
																	onPress={ () => {
																		handleRemoveCheckBox(
																			'Diabetes',
																			setIsDiabetes(!isDiabetes)
																		);
																	} }>
																	x
																</Text>
																<Text style={ styles.selectedText }>
																	Diabetes
																</Text>
															</View>
														) : (
															<Text style={ styles.dummy } />
														)}
														{isHighBloodPressure ? (
															<View style={ styles.selectedTextWrapper }>
																<Text
																	style={ styles.crossText }
																	onPress={ () => {
																		handleRemoveCheckBox(
																			'High Blood Pressure',
																			setIsHighBloodPressure(
																				!isHighBloodPressure
																			)
																		);
																	} }>
																	x
																</Text>
																<Text style={ styles.selectedText }>
																	High Blood Pressure
																</Text>
															</View>
														) : (
															<Text style={ styles.dummy } />
														)}
														{isHeartIssues ? (
															<View style={ styles.selectedTextWrapper }>
																<Text
																	style={ styles.crossText }
																	onPress={ () => {
																		handleRemoveCheckBox(
																			'Heart Issues',
																			setIsHeartIssues(!isHeartIssues)
																		);
																	} }>
																	x
																</Text>
																<Text style={ styles.selectedText }>
																	Heart Issues
																</Text>
															</View>
														) : (
															<Text style={ styles.dummy } />
														)}

														{isRespiratoryIssues ? (
															<View style={ styles.selectedTextWrapper }>
																<Text
																	style={ styles.crossText }
																	onPress={ () => {
																		handleRemoveCheckBox(
																			'Respiratory Issues',
																			setIsRespiratoryIssues(
																				!isRespiratoryIssues
																			)
																		);
																	} }>
																	x
																</Text>
																<Text style={ styles.selectedText }>
																	Respiratory Issues
																</Text>
															</View>
														) : (
															<Text style={ styles.dummy } />
														)}
														{isDigestiveIssues ? (
															<View style={ styles.selectedTextWrapper }>
																<Text
																	style={ styles.crossText }
																	onPress={ () => {
																		handleRemoveCheckBox(
																			'Digestive Issues',
																			setIsDigestiveIssues(!isDigestiveIssues)
																		);
																	} }>
																	x
																</Text>
																<Text style={ styles.selectedText }>
																	Digestive Issues
																</Text>
															</View>
														) : (
															<Text style={ styles.dummy } />
														)}
														{isThyroidIssues ? (
															<View style={ styles.selectedTextWrapper }>
																<Text
																	style={ styles.crossText }
																	onPress={ () => {
																		handleRemoveCheckBox(
																			'Thyroid Issues',
																			setIsThyroidIssues(!isThyroidIssues)
																		);
																	} }>
																	x
																</Text>
																<Text style={ styles.selectedText }>
																	Thyroid Issues
																</Text>
															</View>
														) : (
															<Text style={ styles.dummy } />
														)}
													</View>
												</View>
											</View>
											<View style={ styles.allergiesBox }>
												<View style={ styles.switchWrapper }>
													<Text style={ styles.switchText }>
														Taking any medications (Select all that apply)
													</Text>
													<Switch
														style={ styles.switchButton }
														trackColor={ { false: 'green' } }
														thumbColor={ isEnabled ? 'white' : 'white' }
														ios_backgroundColor="white"
														onValueChange={ toggleSwitch }
														value={ isEnabled }
													/>
												</View>
												{isEnabled ? (
													<View style={ styles.medicalContainer }>
														<View style={ styles.medicalIssueContainer }>
															<View style={ styles.checkBoxWrapper }>
																<Text style={ styles.checkBoxText }>
																	Diabetes
																</Text>
																<CheckBox
																	checkedImage={
																		<View style={ styles.customCheckbox }>
																			<Image
																				style={ styles.checkedStyle }
																				source={ require('../../assets/checkbox.png') }
																			/>
																		</View>
																	}
																	unCheckedImage={
																		<View style={ styles.customCheckbox } />
																	}
																	style={ styles.checkbox }
																	onClick={ () => {
																		setIsDiabetes(!isDiabetes);
																	} }
																	isChecked={ isDiabetes }
																/>
															</View>
															<View style={ styles.checkBoxWrapper }>
																<Text style={ styles.checkBoxText }>
																	High Blood Pressure
																</Text>
																<CheckBox
																	checkedImage={
																		<View style={ styles.customCheckbox }>
																			<Image
																				style={ styles.checkedStyle }
																				source={ require('../../assets/checkbox.png') }
																			/>
																		</View>
																	}
																	unCheckedImage={
																		<View style={ styles.customCheckbox } />
																	}
																	style={ styles.checkbox }
																	onClick={ () => {
																		setIsHighBloodPressure(
																			!isHighBloodPressure
																		);
																	} }
																	isChecked={ isHighBloodPressure }
																/>
															</View>
															<View style={ styles.checkBoxWrapper }>
																<Text style={ styles.checkBoxText }>
																	Heart issues
																</Text>
																<CheckBox
																	checkedImage={
																		<View style={ styles.customCheckbox }>
																			<Image
																				style={ styles.checkedStyle }
																				source={ require('../../assets/checkbox.png') }
																			/>
																		</View>
																	}
																	unCheckedImage={
																		<View style={ styles.customCheckbox } />
																	}
																	style={ styles.checkbox }
																	onClick={ () => {
																		setIsHeartIssues(!isHeartIssues);
																	} }
																	isChecked={ isHeartIssues }
																/>
															</View>
															<View style={ styles.checkBoxWrapper }>
																<Text style={ styles.checkBoxText }>
																	Respiratory issues
																</Text>
																<CheckBox
																	checkedImage={
																		<View style={ styles.customCheckbox }>
																			<Image
																				style={ styles.checkedStyle }
																				source={ require('../../assets/checkbox.png') }
																			/>
																		</View>
																	}
																	unCheckedImage={
																		<View style={ styles.customCheckbox } />
																	}
																	style={ styles.checkbox }
																	onClick={ () => {
																		setIsRespiratoryIssues(
																			!isRespiratoryIssues
																		);
																	} }
																	isChecked={ isRespiratoryIssues }
																/>
															</View>
															<View style={ styles.checkBoxWrapper }>
																<Text style={ styles.checkBoxText }>
																	Digestive issues
																</Text>
																<CheckBox
																	checkedImage={
																		<View style={ styles.customCheckbox }>
																			<Image
																				style={ styles.checkedStyle }
																				source={ require('../../assets/checkbox.png') }
																			/>
																		</View>
																	}
																	unCheckedImage={
																		<View style={ styles.customCheckbox } />
																	}
																	style={ styles.checkbox }
																	onClick={ () => {
																		setIsDigestiveIssues(!isDigestiveIssues);
																	} }
																	isChecked={ isDigestiveIssues }
																/>
															</View>
															<View style={ styles.checkBoxWrapper }>
																<Text style={ styles.checkBoxText }>
																	Thyroid issues
																</Text>
																<CheckBox
																	checkedImage={
																		<View style={ styles.customCheckbox }>
																			<Image
																				style={ styles.checkedStyle }
																				source={ require('../../assets/checkbox.png') }
																			/>
																		</View>
																	}
																	unCheckedImage={
																		<View style={ styles.customCheckbox } />
																	}
																	style={ styles.checkbox }
																	onClick={ () => {
																		setIsThyroidIssues(!isThyroidIssues);
																	} }
																	isChecked={ isThyroidIssues }
																/>
															</View>
														</View>
														<View style={ styles.issueTextWrapper }>
															{isDiabetes ? (
																<View style={ styles.selectedTextWrapper }>
																	<Text style={ styles.crossText }>x</Text>
																	<Text style={ styles.selectedText }>
																		Diabetes
																	</Text>
																</View>
															) : (
																<Text style={ styles.dummy } />
															)}
															{isHighBloodPressure ? (
																<View style={ styles.selectedTextWrapper }>
																	<Text style={ styles.crossText }>x</Text>
																	<Text style={ styles.selectedText }>
																		High Blood Pressure
																	</Text>
																</View>
															) : (
																<Text style={ styles.dummy } />
															)}
															{isHeartIssues ? (
																<View style={ styles.selectedTextWrapper }>
																	<Text style={ styles.crossText }>x</Text>
																	<Text style={ styles.selectedText }>
																		Heart Issues
																	</Text>
																</View>
															) : (
																<Text style={ styles.dummy } />
															)}

															{isRespiratoryIssues ? (
																<View style={ styles.selectedTextWrapper }>
																	<Text style={ styles.crossText }>x</Text>
																	<Text style={ styles.selectedText }>
																		Respiratory Issues
																	</Text>
																</View>
															) : (
																<Text style={ styles.dummy } />
															)}
															{isDigestiveIssues ? (
																<View style={ styles.selectedTextWrapper }>
																	<Text style={ styles.crossText }>x</Text>
																	<Text style={ styles.selectedText }>
																		Digestive Issues
																	</Text>
																</View>
															) : (
																<Text style={ styles.dummy } />
															)}
															{isThyroidIssues ? (
																<View style={ styles.selectedTextWrapper }>
																	<Text
																		style={ styles.crossText }
																		onPress={ () =>
																			setIsThyroidIssues(!isThyroidIssues)
																		}>
																		x
																	</Text>
																	<Text style={ styles.selectedText }>
																		Thyroid Issues
																	</Text>
																</View>
															) : (
																<Text style={ styles.dummy } />
															)}
														</View>
													</View>
												) : (
													<Text />
												)}
											</View>
										</View>
									</ScrollView>
								) : (
									<Text />
								)}
								<View style={ styles.dentistContainer }>
									<Text style={ styles.dentistText }>choose a dentist</Text>
									<TextBoxRadioButton options={ doctors_list } onSuccess />
								</View>
								<View style={ styles.sendButtonWrapper }>
									<TouchableOpacity
										style={ globalStyles.secondaryButton }
										onPress={ props.handleSubmit }>
										<Text style={ globalStyles.buttonText }>Send Question</Text>
									</TouchableOpacity>
								</View>
							</View>
						)}
					</Formik>
				</KeyboardAvoidingView>
			</ScrollView>
		</View>
	);
}

function mapStateToProps(state) {
	return {
		doctors_list: state.journal.usersList,
		doctorId: state.journal.doctor,
		doctorZipcode: state.journal.doctor_zipcode
	};
}
export default connect(mapStateToProps, {
	getDoctorsList,
	setDoctorsList,
	getQuestion,
	setQuestion
})(UserRemoteConsultation);
