import React, { useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
	KeyboardAvoidingView,
	Modal,
	Image
} from 'react-native';
import Slider from '@react-native-community/slider';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import * as yup from 'yup';

import styles from './styles';
import globalStyles from '../../../globalStyles';

import { getUserNote, setUserNote } from '../../../state/actions/journal';

import RadioButton from '../../textInputs/RadioButton';
import TextInputBoxField from '../../textInputs/TextInputBoxField';
import CustomButton from '../../textInputs/CustomButton';
import TextBoxRadioButton from '../../textInputs/TextBoxRadioButton';

import plusIcon from '../../../assets/plus.png';
import arrow from '../../../assets/arrow.png';
import ImagePicker from 'react-native-image-picker';
import NormalTextInput from '../../textInputs/NormalTextInput';
import stepIndicator1 from '../../../assets/stepIndicator1.png';
import stepIndicator2 from '../../../assets/stepIndicator2.png';
import stepIndicator3 from '../../../assets/stepIndicator3.png';
import stepIndicator4 from '../../../assets/stepIndicator4.png';
import crossIcon from '../../../assets/cross-Icon.png';

const userNoteSchema = yup.object({
	height: yup.string(),
	weight: yup.string(),
	allergies: yup.string(),
	description: yup.string().required(),
	place_of_issue: yup.string(),
	side_of_issue: yup.string(),
	pain_level: yup.number(),
	sensivity_temperature: yup.string(),
	tender: yup.string(),
	tooth_issue_identified: yup.string(),
	onset: yup.string(),
	issue_start_date: yup.date(),
	swelling_size: yup.string(),
	bleeding: yup.string(),
	pus_presence: yup.string(),
	tooth_loss: yup.string(),
	prior_history: yup.string(),
	note_type: yup.string(),
	question: yup.string(),
	note: yup.string(),
	media: yup.string(),
	notes: yup.string().required()
});

const options = [
	{
		key: '0',
		text: 'Yes'
	},
	{
		key: '1',
		text: 'No'
	}
];

const imageOptions = {
	title: 'Select Avatar',
	storageOptions: {
		skipBackup: true,
		path: 'images'
	}
};

var tempImage = [];

/* eslint-disable no-mixed-spaces-and-tabs */
function AddQuestion(props) {
	const { getUserNote } = props;
	const [ showStep1, setShowStep1 ] = useState(true);
	const [ showStep2, setShowStep2 ] = useState(false);
	const [ showStep3, setShowStep3 ] = useState(false);
	const [ isModalVisible, setIsModalVisible ] = useState(false);
	const [ isAboutModalVisible, setIsAboutModalVisible ] = useState(false);
	const [ isSuccessModalVisible, setIsSuccessModalVisible ] = useState(false);
	const [ showHistoryForm, setShowHistoryForm ] = useState(false);
	const [ imageSource, setImageSource ] = useState([]);
	const [ mediaUrl, setMediaUrl ] = useState('');
	const [ painLevel, setPainLevel ] = useState(0);

	const handleSubmit = userNotes => {
		userNotes.allergies = userNotes.allergies.split();
		if (mediaUrl !== '') {
			userNotes.media = mediaUrl;
			userNotes.note_type = 'media';
		} else {
			userNotes.note_type = 'text';
		}
		getUserNote(userNotes, onGetUserNoteFailure);
		setIsModalVisible(false);
		setIsSuccessModalVisible(true);
	};

	const onGetUserNoteFailure = () => {
		alert('Network Error');
	};

	const showStep2Screen = screen => {
		if (screen === 'two') {
			setShowStep1(false);
			setShowStep2(true);
			setShowStep3(false);
		} else if (screen === 'three') {
			setShowStep1(false);
			setShowStep2(false);
			setShowStep3(true);
		} else if (screen === 'four') {
			setShowStep1(false);
			setShowStep2(false);
			setShowStep3(false);
		} else {
			setShowStep1(true);
			setShowStep2(false);
			setShowStep3(false);
		}
	};
	const goHome = () => {
		setIsSuccessModalVisible(false);
	};

	const takeImageHandler = () => {
		ImagePicker.showImagePicker(imageOptions, response => {
			console.log('Response = ', response);
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				const source = { uri: response.uri };
				console.log('url', response);
				setMediaUrl(response.uri);
				tempImage.push(source);
				setImageSource(tempImage);
			}
		});
	};

	return (
		<SafeAreaView style={ styles.container }>
			<ScrollView style={ styles.scrollView }>
				{showStep1 ? (
					<View style={ styles.opinionContainer }>
						<View style={ styles.opinionWrapper }>
							<Text style={ styles.opinionText }>
								Ask any dental related questions/second opinions etc. for a
								small fee. Answers usually within 24 hours
							</Text>
							<TouchableOpacity
								style={ styles.signupButton }
								onPress={ () => setIsAboutModalVisible(true) }>
								<Text style={ styles.learnButtonText }>
									Learn more about fees
								</Text>
							</TouchableOpacity>
						</View>
						<Modal
							transparent={ true }
							visible={ isAboutModalVisible }
							style={ styles.modalContainer }>
							<View style={ styles.modalWrap }>
								<View style={ styles.modalTextWrap }>
									<TouchableOpacity
										onPress={ () => setIsAboutModalVisible(false) }>
										<Image source={ crossIcon } style={ styles.closeIcon } />
									</TouchableOpacity>

									<Text>
										Lorem Ipsum is simply dummy text of the printing and
										typesetting industry. Lorem Ipsum is simply dummy text of
										the printing and typesetting industry. Lorem Ipsum is simply
										dummy text of the printing and typesetting industry. Lorem
										Ipsum is simply dummy text of the printing and typesetting
										industry. Lorem Ipsum is simply dummy text of the printing
										and typesetting industry. Lorem Ipsum is simply dummy text
										of the printing and typesetting industry. Lorem Ipsum is
										simply dummy text of the printing and typesetting industry.
										Lorem Ipsum is simply dummy text of the printing and
										typesetting industry.
									</Text>
									<TouchableOpacity
										style={ styles.consultButton }
										onPress={ () => setIsAboutModalVisible(false) }>
										<Text style={ styles.loginText }>OK</Text>
									</TouchableOpacity>
								</View>
							</View>
						</Modal>
					</View>
				) : (
					<Text></Text>
				)}
				<View style={ styles.stepIndicator }>
					{console.log('fhkj', setShowStep1)}
					{showStep1 === true ? (
						<Image source={ stepIndicator1 } />
					) : showStep2 === true ? (
						<Image source={ stepIndicator2 } />
					) : showStep3 === true ? (
						<Image source={ stepIndicator3 } />
					) : (
						<Image source={ stepIndicator4 } />
					)}
				</View>
				<KeyboardAvoidingView enabled style={ styles.keyBoardView }>
					<Formik
						initialValues={ {
							height: '',
							weight: '',
							pain_level: '',
							allergies: '',
							description: '',
							place_of_issue: '',
							side_of_issue: '',
							sensivity_temperature: '',
							tender: '',
							tooth_issue_identified: '',
							onset: '',
							issue_start_date: '',
							swelling_size: '',
							bleeding: '',
							pus_presence: '',
							tooth_loss: '',
							prior_history: '',
							note_type: '',
							media: '',
							notes: ''
						} }
						validationSchema={ userNoteSchema }
						onSubmit={ (values, actions) => {
							actions.resetForm();
							handleSubmit(values);
						} }>
						{showStep1
							? props => (
									<KeyboardAvoidingView enabled style={ styles.keyBoardView }>
										<Formik
											initialValues={ {
												height: '',
												weight: '',
												pain_level: '',
												allergies: '',
												description: '',
												place_of_issue: '',
												side_of_issue: '',
												sensivity_temperature: '',
												tender: '',
												tooth_issue_identified: '',
												onset: '',
												issue_start_date: '',
												swelling_size: '',
												bleeding: '',
												pus_presence: '',
												tooth_loss: '',
												prior_history: '',
												note_type: '',
												media: '',
												notes: ''
											} }
											validationSchema={ userNoteSchema }
											onSubmit={ (values, actions) => {
												actions.resetForm();
												handleSubmit(values);
											} }>
											<View>
												<TextInputBoxField
													lable="Type your dental question"
													onChangeText={ props.handleChange('description') }
													value={ props.values.description }
													onBlur={ props.handleBlur('description') }
													secureTextEntry={ false }
													error={
														props.touched.description &&
														props.errors.description
													}
												/>
												<TextInputBoxField
													lable="Notes"
													onChangeText={ props.handleChange('notes') }
													value={ props.values.notes }
													onBlur={ props.handleBlur('notes') }
													secureTextEntry={ false }
													error={ props.touched.notes && props.errors.notes }
												/>
												<View style={ styles.imageWrap }>
													<Text style={ styles.addFiles }>Add Files</Text>
													<View style={ styles.imageContainer }>
														<View style={ styles.imagePreview1 }>
															<TouchableOpacity onPress={ takeImageHandler }>
																<Image source={ plusIcon } />
															</TouchableOpacity>
														</View>

														{imageSource.length > 0 ? (
															imageSource.map((img, index) => {
																return (
																	<View
																		key={ index }
																		style={ styles.imagePreview1 }>
																		<Image source={ img } style={ styles.image } />
																	</View>
																);
															})
														) : (
															<View style={ styles.cameraTextPreview }>
																<Text style={ styles.cameraText }>
																	Add Images or Video through the camera or
																	adding it from the gallery (Optional)
																</Text>
															</View>
														)}
													</View>
												</View>
												<TouchableOpacity
													style={ globalStyles.secondaryButton }
													onPress={ () => showStep2Screen('two') }

													// onPress={props.handleSubmit}
												>
													<View style={ styles.arrowWrap }>
														<Text style={ globalStyles.buttonText }>Next </Text>
														<Image source={ arrow } style={ styles.arrow } />
													</View>
												</TouchableOpacity>
											</View>
										</Formik>
									</KeyboardAvoidingView>
							  )
							: showStep2
							? props => (
									<View>
										<View style={ styles.symtamsContainer }>
											<Text style={ styles.questionText }>
												Where is the issue ?
											</Text>
											<View style={ styles.questionContainer }>
												<CustomButton
													button={
														props.values.place_of_issue === 'teeth'
															? 'activeButton'
															: 'issueButton'
													}
													place_of_issue="teeth"
													onPress={ () =>
														props.setFieldValue('place_of_issue', 'teeth')
													}
													value={ props.values.place_of_issue }
													onBlur={ props.handleBlur('place_of_issue') }
													secureTextEntry={ false }
												/>
												<CustomButton
													button={
														props.values.place_of_issue === 'gums'
															? 'activeButton'
															: 'issueButton'
													}
													place_of_issue="gums"
													onPress={ () =>
														props.setFieldValue('place_of_issue', 'gums')
													}
													value={ props.values.place_of_issue }
													onBlur={ props.handleBlur('place_of_issue') }
													secureTextEntry={ false }
												/>
											</View>
										</View>
										<View style={ styles.symtamsContainer }>
											<Text style={ styles.questionText }>
												Which side check all that apply ?
											</Text>
											<View style={ styles.questionContainer }>
												<CustomButton
													button={
														props.values.side_of_issue === 'upper'
															? 'activeButton'
															: 'issueButton'
													}
													place_of_issue="upper"
													onPress={ () =>
														props.setFieldValue('side_of_issue', 'upper')
													}
													value={ props.values.side_of_issue }
													onBlur={ props.handleBlur('side_of_issue') }
													secureTextEntry={ false }
												/>
												<CustomButton
													button={
														props.values.side_of_issue === 'lower'
															? 'activeButton'
															: 'issueButton'
													}
													place_of_issue="lower"
													onPress={ () =>
														props.setFieldValue('side_of_issue', 'lower')
													}
													value={ props.values.side_of_issue }
													onBlur={ props.handleBlur('side_of_issue') }
													secureTextEntry={ false }
												/>
												<CustomButton
													button={
														props.values.side_of_issue === 'left'
															? 'activeButton'
															: 'issueButton'
													}
													place_of_issue="left"
													onPress={ () =>
														props.setFieldValue('side_of_issue', 'left')
													}
													value={ props.values.side_of_issue }
													onBlur={ props.handleBlur('side_of_issue') }
													secureTextEntry={ false }
												/>
												<CustomButton
													button={
														props.values.side_of_issue === 'right'
															? 'activeButton'
															: 'issueButton'
													}
													place_of_issue="right"
													onPress={ () =>
														props.setFieldValue('side_of_issue', 'right')
													}
													value={ props.values.side_of_issue }
													onBlur={ props.handleBlur('side_of_issue') }
													secureTextEntry={ false }
												/>
											</View>
										</View>
										<View style={ styles.questionContainer }>
											<Text style={ styles.questionText1 }>Pain Type</Text>
											<View style={ styles.painContainer }>
												<View style={ styles.choices }>
													<TouchableOpacity style={ styles.activeButton }>
														<Text style={ styles.activeButtonText }>No Pain</Text>
													</TouchableOpacity>
												</View>
												<View>
													<Slider
														style={ styles.slider }
														step={ 1 }
														minimumValue={ 0 }
														maximumValue={ 9 }
														onValueChange={ range =>
															props.setFieldValue(
																'pain_level',
																range,
																setPainLevel(range)
															)
														}
														thumbTintColor={ painLevel < 6 ? 'green' : 'red' }
														maximumTrackTintColor={
															painLevel < 6 ? 'green' : 'red'
														}
														minimumTrackTintColor={
															painLevel < 6 ? 'green' : 'red'
														}
													/>
													<Text style={ styles.rangeText }>{painLevel}</Text>
												</View>
												<View style={ styles.choices }>
													<TouchableOpacity
														style={
															painLevel > 5
																? styles.worstButton
																: styles.activeButton
														}>
														<Text
															style={
																painLevel > 5
																	? styles.worstButtonText
																	: styles.activeButtonText
															}>
															worst
														</Text>
													</TouchableOpacity>
												</View>
											</View>
										</View>

										<View style={ styles.symtamsContainer }>
											<Text style={ styles.questionText }>
												Sensitivity to temperature
											</Text>

											<View style={ styles.questionContainer }>
												<CustomButton
													button={
														props.values.sensivity_temperature === 'mild'
															? 'activeButton'
															: 'issueButton'
													}
													place_of_issue="mild"
													onPress={ () =>
														props.setFieldValue('sensivity_temperature', 'mild')
													}
													value={ props.values.sensivity_temperature }
													onBlur={ props.handleBlur('sensivity_temperature') }
													secureTextEntry={ false }
												/>
												<CustomButton
													button={
														props.values.sensivity_temperature === 'moderate'
															? 'activeButton'
															: 'issueButton'
													}
													place_of_issue="moderate"
													onPress={ () =>
														props.setFieldValue(
															'sensivity_temperature',
															'moderate'
														)
													}
													value={ props.values.sensivity_temperature }
													onBlur={ props.handleBlur('sensivity_temperature') }
													secureTextEntry={ false }
												/>
												<CustomButton
													button={
														props.values.sensivity_temperature === 'severe'
															? 'activeButton'
															: 'issueButton'
													}
													place_of_issue="severe"
													onPress={ () =>
														props.setFieldValue(
															'sensivity_temperature',
															'severe'
														)
													}
													value={ props.values.sensivity_temperature }
													onBlur={ props.handleBlur('sensivity_temperature') }
													secureTextEntry={ false }
												/>
												<CustomButton
													button={
														props.values.sensivity_temperature === 'none'
															? 'activeButton'
															: 'issueButton'
													}
													place_of_issue="none"
													onPress={ () =>
														props.setFieldValue('sensivity_temperature', 'none')
													}
													value={ props.values.sensivity_temperature }
													onBlur={ props.handleBlur('sensivity_temperature') }
													secureTextEntry={ false }
												/>
											</View>
										</View>
										<View style={ styles.symtamsContainer }>
											<Text style={ styles.questionText }>
												Tender (Painful to touch/bite)
											</Text>
											<View style={ styles.questionContainer }>
												<View style={ styles.radioContainer }>
													<RadioButton
														button={
															props.values.tender === true
																? 'activeButton'
																: 'issueButton'
														}
														type="Yes"
														onPress={ () => props.setFieldValue('tender', true) }
														value={ props.values.tender }
														onBlur={ props.handleBlur('tender') }
														secureTextEntry={ false }
													/>
													<RadioButton
														button={
															props.values.tender === false
																? 'activeButton'
																: 'issueButton'
														}
														type="No"
														onPress={ () => props.setFieldValue('tender', false) }
														value={ props.values.tender }
														onBlur={ props.handleBlur('tender') }
														secureTextEntry={ false }
													/>
												</View>
											</View>
										</View>
										<View style={ styles.symtamsContainer }>
											<Text style={ styles.questionText }>
												Are you able to identify the exact tooth
											</Text>
											<View style={ styles.questionContainer }>
												<View style={ styles.radioContainer }>
													<RadioButton
														button={
															props.values.tooth_issue_identified === true
																? 'activeButton'
																: 'issueButton'
														}
														type="Yes"
														onPress={ () =>
															props.setFieldValue(
																'tooth_issue_identified',
																true
															)
														}
														value={ props.values.tooth_issue_identified }
														onBlur={ props.handleBlur('tooth_issue_identified') }
														secureTextEntry={ false }
													/>
													<RadioButton
														button={
															props.values.tooth_issue_identified === false
																? 'activeButton'
																: 'issueButton'
														}
														type="No"
														onPress={ () =>
															props.setFieldValue(
																'tooth_issue_identified',
																false
															)
														}
														value={ props.values.tooth_issue_identified }
														onBlur={ props.handleBlur('tooth_issue_identified') }
														secureTextEntry={ false }
													/>
												</View>
											</View>
										</View>
										<View style={ styles.symtamsContainer }>
											<Text style={ styles.questionText }>Onset</Text>

											<View style={ styles.questionContainer }>
												<CustomButton
													button={
														props.values.onset === 'sudden'
															? 'activeButton'
															: 'issueButton'
													}
													place_of_issue="sudden"
													onPress={ () => props.setFieldValue('onset', 'sudden') }
													value={ props.values.onset }
													onBlur={ props.handleBlur('onset') }
													secureTextEntry={ false }
												/>
												<CustomButton
													button={
														props.values.onset === 'gradual'
															? 'activeButton'
															: 'issueButton'
													}
													place_of_issue="gradual"
													onPress={ () =>
														props.setFieldValue('onset', 'gradual')
													}
													value={ props.values.onset }
													onBlur={ props.handleBlur('onset') }
													secureTextEntry={ false }
												/>
											</View>
										</View>
										<View style={ styles.step2Style }>
											<TouchableOpacity
												style={ globalStyles.secondaryButton }
												onPress={ () => showStep2Screen('three') }>
												<View style={ styles.arrowWrap }>
													<Text style={ globalStyles.buttonText }>Next </Text>
													<Image source={ arrow } style={ styles.arrow } />
												</View>
											</TouchableOpacity>
										</View>
									</View>
							  )
							: showStep3
							? props => (
									<View>
										<Modal
											transparent={ true }
											visible={ isModalVisible }
											style={ styles.modalContainer }>
											<View style={ styles.modalWrap }>
												<View style={ styles.modalTextWrap }>
													<Text style={ styles.modalText }>
														save for future reference
													</Text>
													<NormalTextInput
														lable="Name the file"
														onChangeText={ props.handleChange('file_name') }
														value={ props.values.file_name }
														onBlur={ props.handleBlur('file_name') }
														secureTextEntry={ false }
													/>
													<Text>
														Lorem Ipsum is simply dummy text of the printing and
														typesetting industry.
													</Text>
													<TouchableOpacity
														style={ styles.consultButton }
														onPress={ props.handleSubmit }>
														<Text style={ styles.loginText }>save as notes</Text>
													</TouchableOpacity>
												</View>
											</View>
										</Modal>
										<Modal transparent={ true } visible={ isSuccessModalVisible }>
											<View style={ styles.modalWrap }>
												<View style={ styles.successModalTextWrap }>
													<View style={ styles.successTextWrap }>
														<Text style={ styles.successModalText1 }>
															success
														</Text>
														<Text style={ styles.successModalText2 }>
															your question saved as notes
														</Text>
													</View>

													<TouchableOpacity
														style={ styles.continueButton }
														onPress={ goHome }>
														<Text style={ styles.continueButtonText }>
															Continue
														</Text>
													</TouchableOpacity>
												</View>
											</View>
										</Modal>
										<NormalTextInput
											lable="When did the issue start"
											onChangeText={ props.handleChange('issue_start_date') }
											value={ props.values.issue_start_date }
											onBlur={ props.handleBlur('issue_start_date') }
											secureTextEntry={ false }
										/>
										<View style={ styles.symtamsContainer }>
											<Text style={ styles.questionText }>Swelling size</Text>

											<View style={ styles.questionContainer }>
												<CustomButton
													button={
														props.values.swelling_size === 'none'
															? 'activeButton'
															: 'issueButton'
													}
													place_of_issue="none"
													onPress={ () =>
														props.setFieldValue('swelling_size', 'none')
													}
													value={ props.values.swelling_size }
													onBlur={ props.handleBlur('swelling_size') }
													secureTextEntry={ false }
												/>
												<CustomButton
													button={
														props.values.swelling_size === 'small'
															? 'activeButton'
															: 'issueButton'
													}
													place_of_issue="small"
													onPress={ () =>
														props.setFieldValue('swelling_size', 'small')
													}
													value={ props.values.swelling_size }
													onBlur={ props.handleBlur('swelling_size') }
													secureTextEntry={ false }
												/>
												<CustomButton
													button={
														props.values.swelling_size === 'medium'
															? 'activeButton'
															: 'issueButton'
													}
													place_of_issue="medium"
													onPress={ () =>
														props.setFieldValue('swelling_size', 'medium')
													}
													value={ props.values.swelling_size }
													onBlur={ props.handleBlur('swelling_size') }
													secureTextEntry={ false }
												/>
												<CustomButton
													button={
														props.values.swelling_size === 'large'
															? 'activeButton'
															: 'issueButton'
													}
													place_of_issue="large"
													onPress={ () =>
														props.setFieldValue('swelling_size', 'large')
													}
													value={ props.values.swelling_size }
													onBlur={ props.handleBlur('swelling_size') }
													secureTextEntry={ false }
												/>
											</View>
										</View>
										<View style={ styles.symtamsContainer }>
											<Text style={ styles.questionText }>Bleeding</Text>
											<View style={ styles.questionContainer }>
												<View style={ styles.radioContainer }>
													<RadioButton
														button={
															props.values.bleeding === true
																? 'activeButton'
																: 'issueButton'
														}
														type="Yes"
														onPress={ () =>
															props.setFieldValue('bleeding', true)
														}
														value={ props.values.bleeding }
														onBlur={ props.handleBlur('bleeding') }
														secureTextEntry={ false }
													/>
													<RadioButton
														button={
															props.values.bleeding === false
																? 'activeButton'
																: 'issueButton'
														}
														type="No"
														onPress={ () =>
															props.setFieldValue('bleeding', false)
														}
														value={ props.values.bleeding }
														onBlur={ props.handleBlur('bleeding') }
														secureTextEntry={ false }
													/>
												</View>
											</View>
										</View>
										<View style={ styles.symtamsContainer }>
											<Text style={ styles.questionText }>Presence of pus ?</Text>
											<View style={ styles.questionContainer }>
												<View style={ styles.radioContainer }>
													<RadioButton
														button={
															props.values.pus_presence === true
																? 'activeButton'
																: 'issueButton'
														}
														type="Yes"
														onPress={ () =>
															props.setFieldValue('pus_presence', true)
														}
														value={ props.values.pus_presence }
														onBlur={ props.handleBlur('pus_presence') }
														secureTextEntry={ false }
													/>
													<RadioButton
														button={
															props.values.pus_presence === false
																? 'activeButton'
																: 'issueButton'
														}
														type="No"
														onPress={ () =>
															props.setFieldValue('pus_presence', false)
														}
														value={ props.values.pus_presence }
														onBlur={ props.handleBlur('pus_presence') }
														secureTextEntry={ false }
													/>
												</View>
											</View>
										</View>
										<View style={ styles.symtamsContainer }>
											<Text style={ styles.questionText }>Loose Tooth</Text>

											<View style={ styles.questionContainer }>
												<CustomButton
													button={
														props.values.tooth_loss === 'No'
															? 'activeButton'
															: 'issueButton'
													}
													place_of_issue="No"
													onPress={ () =>
														props.setFieldValue('tooth_loss', 'No')
													}
													value={ props.values.tooth_loss }
													onBlur={ props.handleBlur('tooth_loss') }
													secureTextEntry={ false }
												/>
												<CustomButton
													button={
														props.values.tooth_loss === 'slight'
															? 'activeButton'
															: 'issueButton'
													}
													place_of_issue="slight"
													onPress={ () =>
														props.setFieldValue('tooth_loss', 'slight')
													}
													value={ props.values.tooth_loss }
													onBlur={ props.handleBlur('tooth_loss') }
													secureTextEntry={ false }
												/>
												<CustomButton
													button={
														props.values.tooth_loss === 'moderate'
															? 'activeButton'
															: 'issueButton'
													}
													place_of_issue="moderate"
													onPress={ () =>
														props.setFieldValue('tooth_loss', 'moderate')
													}
													value={ props.values.tooth_loss }
													onBlur={ props.handleBlur('place_of_issue') }
													secureTextEntry={ false }
												/>
												<CustomButton
													button={
														props.values.tooth_loss === 'loose'
															? 'activeButton'
															: 'issueButton'
													}
													place_of_issue="loose"
													onPress={ () =>
														props.setFieldValue('tooth_loss', 'loose')
													}
													value={ props.values.tooth_loss }
													onBlur={ props.handleBlur('tooth_loss') }
													secureTextEntry={ false }
												/>
											</View>
										</View>
										<NormalTextInput
											lable="Prior history if any or other information"
											onChangeText={ props.handleChange('prior_history') }
											value={ props.values.prior_history }
											onBlur={ props.handleBlur('prior_history') }
											secureTextEntry={ false }
										/>
										<TouchableOpacity
											style={ styles.consultButton }
											onPress={ () => showStep2Screen('four') }>
											<Text style={ styles.loginText }>Consult Dentist</Text>
										</TouchableOpacity>

										<TouchableOpacity
											style={ styles.consultButton }
											onPress={ () => setIsModalVisible(true) }>
											<Text style={ styles.loginText }>
												Safe for future reference
											</Text>
										</TouchableOpacity>
									</View>
							  )
							: props => (
									<View>
										<View style={ styles.healthHistory }>
											<Text
												style={ styles.healthHistoryText }
												onPress={ () => setShowHistoryForm(!showHistoryForm) }>
												health history
											</Text>
										</View>
										{showHistoryForm ? (
											<View style={ styles.historyFormWrapper }>
												<View style={ styles.normalTextInputWrap }>
													<NormalTextInput
														lable="Age"
														onChangeText={ props.handleChange('age') }
														value={ props.values.age }
														onBlur={ props.handleBlur('age') }
														secureTextEntry={ false }
													/>
													<NormalTextInput
														lable="Height"
														onChangeText={ props.handleChange('height') }
														value={ props.values.height }
														onBlur={ props.handleBlur('height') }
														secureTextEntry={ false }
													/>
													<NormalTextInput
														lable="Weight"
														onChangeText={ props.handleChange('weight') }
														value={ props.values.weight }
														onBlur={ props.handleBlur('weight') }
														secureTextEntry={ false }
													/>
												</View>
												<NormalTextInput
													lable="Allergies"
													onChangeText={ props.handleChange('allergies') }
													value={ props.values.allergies }
													onBlur={ props.handleBlur('allergies') }
													secureTextEntry={ false }
												/>
												<NormalTextInput
													lable="Medical conditions"
													placeholder="None"
													onChangeText={ props.handleChange(
														'medical_conditions'
													) }
													value={ props.values.medical_conditions }
													onBlur={ props.handleBlur('medical_conditions') }
													secureTextEntry={ false }
												/>
											</View>
										) : (
											<Text></Text>
										)}
										<View>
											<Text style={ styles.dentistText }>choose a dentist</Text>

											<TextBoxRadioButton options={ options } />
										</View>
										<TouchableOpacity style={ styles.sendButton }>
											<Text style={ styles.loginText }>send question</Text>
										</TouchableOpacity>
									</View>
							  )}
					</Formik>
				</KeyboardAvoidingView>
			</ScrollView>
		</SafeAreaView>
	);
}

/* eslint-enable no-mixed-spaces-and-tabs */

function mapStateToProps(state) {
	return {
		resp: state.journal
	};
}

export default connect(mapStateToProps, {
	getUserNote,
	setUserNote
})(AddQuestion);
