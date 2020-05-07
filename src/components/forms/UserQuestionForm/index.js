import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
	KeyboardAvoidingView,
	Modal,
	Image,
	Platform
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Slider from '@react-native-community/slider';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import * as yup from 'yup';

import styles from './styles';
import globalStyles from '../../../globalStyles';

import RadioButton from '../../textInputs/RadioButton';
import TextInputBoxField from '../../textInputs/TextInputBoxField';
import CustomButton from '../../textInputs/CustomButton';

import plusIcon from '../../../assets/plus.png';
import arrow from '../../../assets/arrow.png';
import NormalTextInput from '../../textInputs/NormalTextInput';
import stepIndicator1 from '../../../assets/stepIndicator1.png';
import stepIndicator2 from '../../../assets/stepIndicator2.png';
import stepIndicator3 from '../../../assets/stepIndicator3.png';
import crossIcon from '../../../assets/cross-Icon.png';
import moment from 'moment';
import { TextInputMask } from 'react-native-masked-text';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';

import {
	getDeleteNote,
	getUserNote,
	createUserNote,
	updateUserNote
} from '../../../state/actions/journal';

/* eslint-disable no-undef */
const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

const userNoteSchema = yup.object({
	description: yup.string().required('Required'),
	place_of_issue: yup.string(),
	side_of_issue: yup.string(),
	pain_level: yup.number(),
	sensivity_temperature: yup.string(),
	tender: yup.string(),
	tooth_issue_identified: yup.string(),
	onset: yup.string(),
	issue_start_date: yup.string(),
	swelling_size: yup.string(),
	bleeding: yup.string(),
	pus_presence: yup.string(),
	tooth_loss: yup.string(),
	prior_history: yup.string(),
	// note_type: yup.string(),
	question: yup.string(),
	note: yup.string(),
	pain_type: yup.string(),
	reference_name: yup.string().required('Required'),
	media: yup.array(),
	title: yup.string().required('Required')
});

const imageOptions = {
	title: 'Choose Image or Video',
	customButtons: [
		{ name: 'image', title: 'Take a Photo' },
		{ name: 'video', title: 'Take a Video' }
	],
	chooseFromLibraryButtonTitle: 'Choose from gallery',
	takePhotoButtonTitle: null
};
var tempImage = [];
var preview = [];
var tempMedia = [];

/* eslint-disable no-mixed-spaces-and-tabs */
function AddQuestion(props) {
	const { navigation, getDeleteNote, createUserNote, updateUserNote, route } = props;
	const [ showStep1, setShowStep1 ] = useState(true);
	const [ showStep2, setShowStep2 ] = useState(false);
	const [ showStep3, setShowStep3 ] = useState(false);
	const [ isModalVisible, setIsModalVisible ] = useState(false);
	const [ isSuccessModalVisible, setIsSuccessModalVisible ] = useState(false);
	const [ imageSource, setImageSource ] = useState([]);
	const [ painLevel, setPainLevel ] = useState(0);
	const [ referenceName, setReferenceName ] = useState('');
	const [ enableVideo, setEnableVideo ] = useState(true);
	const [ isVideoUpload, setIsVideoUpload ] = useState(false);
	const [ isDeleteModalVisible, setIsDeleteModalVisible ] = useState(false);
	const [ updateNote, setUpdateNote ] = useState(false);
	const [ isOptionModal, setIsOptionModal ] = useState(false);

	let initialValues = {};
	const doesEditEnabled = route && route.params && route.params.data;
	if(doesEditEnabled) {
		const { data } = route.params;
		initialValues = {
			pain_level: data.pain_level ? data.pain_level : 0,
			description: data.description ? data.description : '',
			place_of_issue: data.place_of_issue ? data.place_of_issue : '',
			side_of_issue: data.side_of_issue ? data.side_of_issue : '',
			sensivity_temperature: data.sensivity_temperature ? data.sensivity_temperature : '',
			tender: data.tender ? data.tender: '',
			tooth_issue_identified: data.tooth_issue_identified ? data.tooth_issue_identified : '',
			onset: data.onset ? data.onset : '',
			issue_start_date: data.issue_start_date ? data.issue_start_date: '',
			swelling_size: data.swelling_size ? data.swelling_size: '',
			bleeding: data.bleeding ? data.bleeding: '',
			pus_presence: data.pus_presence ? data.pus_presence: '',
			tooth_loss: data.tooth_loss ? data.tooth_loss : '',
			prior_history: data.prior_history ? data.prior_history : '',
			// note_type: data.note_type,
			title: data.title ? data.title: '',
			pain_type: data.pain_type ? data.pain_type : '',
			reference_name: data.reference_name ? data.reference_name : '',
			media: data.media && data.media.length > 0 ? data.media : []
		};
	} else {
		initialValues = {
			pain_level: 0,
			description: '',
			place_of_issue: '',
			side_of_issue: '',
			sensivity_temperature: '',
			tender: '',
			tooth_issue_identified: '',
			onset: '',
			issue_start_date: moment().format('YYYY-MM-DD'),
			swelling_size: '',
			bleeding: '',
			pus_presence: '',
			tooth_loss: '',
			prior_history: '',
			// note_type: '',
			title: '',
			pain_type: '',
			reference_name: '',
			media: []
		};
	}

	const handleSubmit = userNotes => {
		setReferenceName(userNotes.reference_name);
		setIsModalVisible(false);
		const painLevel = userNotes.pain_level;
		const data = [
			{
				name: 'description',
				data: userNotes.description
			},
			{
				name: 'title',
				data: userNotes.title
			},
			{
				name: 'place_of_issue',
				data: userNotes.place_of_issue
			},
			{
				name: 'side_of_issue',
				data: userNotes.side_of_issue
			},
			{
				name: 'pain_level',
				data: painLevel ? painLevel.toString() : '0'
			},
			{
				name: 'sensivity_temperature',
				data: userNotes.sensivity_temperature
			},
			{
				name: 'tender',
				data: userNotes.tender ? 'true' : 'false'
			},
			{
				name: 'tooth_issue_identified',
				data: userNotes.tooth_issue_identified ? 'true' : 'false'
			},
			{
				name: 'onset',
				data: userNotes.onset
			},
			{
				name: 'issue_start_date',
				data: userNotes.issue_start_date ? moment(userNotes.issue_start_date).format('YYYY-MM-DD') : ''
			},
			{
				name: 'swelling_size',
				data: userNotes.swelling_size
			},
			{
				name: 'bleeding',
				data: userNotes.bleeding ? 'true' : 'false'
			},
			{
				name: 'pus_presence',
				data: userNotes.pus_presence ? 'true' : 'false'
			},
			{
				name: 'tooth_loss',
				data: userNotes.tooth_loss
			},
			{
				name: 'prior_history',
				data: userNotes.prior_history
			},
			{
				name: 'pain_type',
				data: userNotes.pain_type
			},
			{
				name: 'reference_name',
				data: userNotes.reference_name
			}
		];
		tempMedia.map(item => {
			data.push({
				name: 'media',
				filename: `note${Date.now()}`,
				data: Platform.OS === 'android' ? RNFetchBlob.wrap(item.uri) :  RNFetchBlob.wrap(item.uri.replace('file://', '')),
				type: item.type
			});
		});
		if (updateNote === false) {
			createUserNote(
				data,
				onGetUserNoteSuccess,
				onGetUserNoteFailure
			);
		} else {
			const updatedNote = {
				description: userNotes.description,
				title: userNotes.title,
				place_of_issue: userNotes.place_of_issue,
				side_of_issue: userNotes.side_of_issue,
				pain_level: userNotes.pain_level,
				sensivity_temperature: userNotes.sensivity_temperature,
				tender: userNotes.tender,
				tooth_issue_identified: userNotes.tooth_issue_identified,
				onset: userNotes.onset,
				issue_start_date: userNotes.issue_start_date,
				swelling_size: userNotes.swelling_size,
				bleeding: userNotes.bleeding,
				pus_presence: userNotes.pus_presence,
				tooth_loss: userNotes.tooth_loss,
				prior_history: userNotes.prior_history,
				pain_type: userNotes.pain_type,
				reference_name: userNotes.reference_name
			};
			updateUserNote(
				updatedNote, 
				id = props.route.params.data.id,
				onGetUserNoteSuccess, 
				onGetUserNoteFailure );
		}
	};

	const onGetUserNoteFailure = () => {
		alert('Something went wrong! Please check your internet connection.');
	};

	const onGetUserNoteSuccess = preview_note => {
		preview = preview_note;
		setIsSuccessModalVisible(true);
		setTimeout(() => {
			setIsSuccessModalVisible(false);
			setShowStep1(true), setShowStep3(false);
			navigation.navigate('Note Preview', { previewNote: preview_note });
		}, 1000);
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
		setIsModalVisible(false);
	};

	const takeImageHandler = () => {
		ImagePicker.showImagePicker(imageOptions, response => {
			if (response.didCancel) {
			} else if (response.error) {
			} else if (response.customButton) {
				ImagePicker.launchCamera(
					{
						mediaType: response.customButton,
						videoQuality: 'high',
						quality: 1
					},
					customResponse => {
						let source = { ...customResponse };
						let media;
						if (response.customButton === 'image') {
							media = {
								uri: customResponse.uri,
								name: customResponse.fileName,
								type: customResponse.fileName
							};

							if (tempMedia.length < 7) {
								tempImage.push(source);
								tempMedia.push(media);
							}
							setImageSource(tempImage);
						} else {
							if (enableVideo) {
								media = {
									uri: customResponse.uri,
									path: customResponse.path
								};
								setEnableVideo(false);
								if (tempMedia.length < 7) {
									tempImage.push(source);
									tempMedia.push(media);
								}
								setImageSource(tempImage);
							} else {
								setIsVideoUpload(true);
							}
						}
					}
				);
			} else {
				let source = { ...response };
				let media = {
					uri: response.uri,
					name: response.fileName,
					type: response.fileName
				};

				if (tempMedia.length < 7) {
					tempImage.push(source);
					tempMedia.push(media);
				}
				setImageSource(tempImage);
			}
		});
	};

	const onGetDeleteNoteSuccess = () => {
		setIsDeleteModalVisible(false);
		preview = [];
		navigation.navigate('Home');
	};
	const onGetDeleteNoteFailure = () => {
		alert('Something went wrong');
	};

	const handleDeleteNote = noteId => {
		getDeleteNote(noteId, onGetDeleteNoteSuccess, onGetDeleteNoteFailure);
	};

	useEffect(function() {
		if (props.route.params.updateNotes === true) {
			setUpdateNote(true);
			setPainLevel(props.route.params.data.pain_level);
		} else {
			setUpdateNote(false);
		}
	}, []);

	const gotoNotes = () => {
		setIsOptionModal(!isOptionModal);
		setShowStep1(true), setShowStep3(false);
		navigation.navigate('AddDentalNote');
	};

	const handleRemote = item => {
		setIsOptionModal(!isOptionModal);
		setShowStep1(true), setShowStep3(false);
		navigation.navigate('Note Preview', { preview: item });
	};

	return (
		<SafeAreaView>
			<ScrollView
				contentContainerStyle={ styles.container }
				showsVerticalScrollIndicator={ false }>
				<View style={ styles.stepIndicator }>
					{showStep1 === true ? (
						<Image source={ stepIndicator1 } />
					) : showStep2 === true ? (
						<Image source={ stepIndicator2 } />
					) : showStep3 === true ? (
						<Image source={ stepIndicator3 } />
					) : (
						<Text style={ styles.hideText } />
					)}
				</View>
				<Formik
					initialValues={ { ...initialValues } }
					validationSchema={ userNoteSchema }
					onSubmit={ (values, actions) => {
						actions.resetForm();
						handleSubmit(values);
					} }>
					{showStep1
						? props => (
								<View style={ styles.containerWrapper }>
									<KeyboardAvoidingView
										behavior="position"
										keyboardVerticalOffset={ keyboardVerticalOffset }>
										<TextInputBoxField
											multiline
											lable="Enter your Dental/Oral issue"
											placeholder={
												'Example: I have a swelling that is painful, started last night.'
											}
											onChangeText={ props.handleChange('title') }
											value={ props.values.title }
											onBlur={ props.handleBlur('title') }
											secureTextEntry={ false }
											error={ props.touched.title && props.errors.title }
										/>
										<TextInputBoxField
											multiline
											lable="Notes"
											placeholder={
												'Example: busy with office project and deadline, would like to come in next month unless its an emergency or if this can be resolved with meds'
											}
											onChangeText={ props.handleChange('description') }
											value={ props.values.description }
											onBlur={ props.handleBlur('description') }
											secureTextEntry={ false }
											error={
												props.touched.description && props.errors.description
											}
										/>
									</KeyboardAvoidingView>
									<View style={ styles.imageWrap }>
										<Text style={ styles.addFiles }>Add Files</Text>
										<View style={ styles.imageContainer }>
											{imageSource.length < 7 ? (
												<View style={ styles.imagePreview1 }>
													<TouchableOpacity onPress={ takeImageHandler }>
														<Image source={ plusIcon } />
													</TouchableOpacity>
												</View>
											) : (
												<Text style={ styles.hideText } />
											)}

											{imageSource.length > 0 ? (
												imageSource.map((img, index) => {
													return (
														<View key={ index } style={ styles.imagePreview2 }>
															<Image source={ img } style={ styles.image } />
														</View>
													);
												})
											) : (
												<View style={ styles.cameraTextPreview }>
													<Text style={ styles.cameraText }>
														Add Images or Video through the camera or adding it
														from the gallery (Optional)
													</Text>
												</View>
											)}
										</View>
									</View>
									<Modal transparent={ true } visible={ isVideoUpload }>
										<View style={ styles.modalWrap }>
											<View style={ styles.modalTextWrap }>
												<TouchableOpacity
													onPress={ () => setIsVideoUpload(false) }>
													<Image source={ crossIcon } style={ styles.closeIcon } />
												</TouchableOpacity>
												<Text style={ styles.successModalText }>
													You are not allowed to upload more than a video
												</Text>
												<TouchableOpacity
													style={ styles.consultButton }
													onPress={ () => setIsVideoUpload(false) }>
													<Text style={ styles.loginText }>Okay</Text>
												</TouchableOpacity>
											</View>
										</View>
									</Modal>
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
												custom_style={ true }
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
												custom_style={ true }
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
									<View style={ styles.buttonContainer }>
										<TouchableOpacity
											style={ globalStyles.fullWidthButton }
											onPress={ () => showStep2Screen('two') }>
											<View style={ styles.arrowWrap }>
												<Text style={ globalStyles.buttonText }>Next </Text>
												<Image source={ arrow } style={ styles.arrow } />
											</View>
										</TouchableOpacity>
									</View>
								</View>
						  )
						: showStep2
						? props => (
								<View style={ styles.step2Styles }>
									<View>
										<Text style={ styles.questionText1 }>Pain level</Text>
										<View style={ styles.painContainer }>
											<View style={ styles.choices }>
												<TouchableOpacity style={ styles.activeButton }>
													<Text style={ styles.activeButtonText }>No Pain</Text>
												</TouchableOpacity>
											</View>
											<View style={ styles.slider }>
												<Slider
													step={ 1 }
													value={ painLevel }
													minimumValue={ 0 }
													maximumValue={ 9 }
													onValueChange={ range =>
														props.setFieldValue(
															'pain_level',
															range,
															setPainLevel(range)
														)
													}
													thumbTintColor={ painLevel < 5 ? '#00C1F8' : '#00C1F8' }
													maximumTrackTintColor={
														painLevel < 5 ? '#00C1F8' : '#00C1F8'
													}
													minimumTrackTintColor={
														painLevel < 5 ? '#00C1F8' : '#00C1F8'
													}
												/>
												<Text style={ styles.rangeText }>{painLevel}</Text>
											</View>
											<View style={ styles.choices }>
												<TouchableOpacity
													style={
														painLevel > 4
															? styles.worstButton
															: styles.activeButton
													}>
													<Text
														style={
															painLevel > 4
																? styles.worstButtonText
																: styles.activeButtonText
														}>
														worst pain
													</Text>
												</TouchableOpacity>
											</View>
										</View>
									</View>
									<View style={ styles.centerContainer }>
										<View style={ styles.symtamsContainer }>
											<Text style={ styles.questionText }>Pain Type</Text>
											<View style={ styles.questionContainer }>
												<CustomButton
													button={
														props.values.pain_type === 'throbbing'
															? 'activeButton'
															: 'issueButton'
													}
													place_of_issue="throbbing"
													onPress={ () =>
														props.setFieldValue('pain_type', 'throbbing')
													}
													value={ props.values.pain_type }
													onBlur={ props.handleBlur('pain_type') }
													secureTextEntry={ false }
													custom_style={ true }
												/>
												<CustomButton
													button={
														props.values.pain_type === 'constant'
															? 'activeButton'
															: 'issueButton'
													}
													place_of_issue="constant"
													onPress={ () =>
														props.setFieldValue('pain_type', 'constant')
													}
													value={ props.values.pain_type }
													onBlur={ props.handleBlur('pain_type') }
													secureTextEntry={ false }
													custom_style={ true }
												/>
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
												Are you able to identify the exact tooth that has the
												issue?
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
													custom_style={ true }
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
													custom_style={ true }
												/>
											</View>
										</View>
									</View>
									<View style={ styles.buttonContainer }>
										<TouchableOpacity
											style={ globalStyles.fullWidthButton }
											onPress={ () => showStep2Screen('three') }>
											<View style={ styles.arrowWrap }>
												<Text style={ globalStyles.buttonText }>Next </Text>
												<Image source={ arrow } style={ styles.arrow } />
											</View>
										</TouchableOpacity>
									</View>
								</View>
						  )
						: props => (
							<KeyboardAvoidingView
								behavior="absolute"
								keyboardVerticalOffset={ keyboardVerticalOffset }>
								{isSuccessModalVisible || isModalVisible ? (
									<Modal transparent={ true } visible={ true }>
										<View style={ styles.modalWrap }>
											<View style={ styles.modalTextWrap }>
												<TouchableOpacity onPress={ goHome }>
													<Image
														source={ crossIcon }
														style={ styles.closeIcon }
													/>
												</TouchableOpacity>
												<Text style={ styles.modalText }>save as</Text>
												<NormalTextInput
													saveas="saveas"
													lable="Give it a name for future reference"
													onChangeText={ props.handleChange('reference_name') }
													value={
														props.values.reference_name === ''
															? referenceName
															: props.values.reference_name
													}
													onBlur={ props.handleBlur('reference_name') }
													secureTextEntry={ false }
													error={ props.errors.reference_name }
												/>

												{isSuccessModalVisible ? (
													<TouchableOpacity style={ styles.savedButton }>
														<Text style={ styles.savedButtonText }>saved!</Text>
													</TouchableOpacity>
												) : (
													<TouchableOpacity
														style={ styles.consultButton }
														onPress={ props.handleSubmit }>
														<Text style={ styles.loginText }>save</Text>
													</TouchableOpacity>
												)}
											</View>
										</View>
									</Modal>
								) : (
									<Text style={ styles.hideText } />
								)}
								<View style={ styles.symtamsContainer }>
									<Text style={ styles.questionText }>
										When did the issue start
									</Text>
									<TextInputMask
										style={ styles.maskInput }
										type={ 'datetime' }
										options={ {
											format: 'YYYY-MM-DD'
										} }
										placeholder={ 'YYYY-MM-DD' }
										onChangeText={ props.handleChange('issue_start_date') }
										value={ props.values.issue_start_date }
									/>
								</View>

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
												onPress={ () => props.setFieldValue('bleeding', true) }
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
												onPress={ () => props.setFieldValue('bleeding', false) }
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
												props.values.tooth_loss === 'no'
													? 'activeButton'
													: 'issueButton'
											}
											place_of_issue="no"
											onPress={ () => props.setFieldValue('tooth_loss', 'no') }
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
												props.setFieldValue('tooth_loss', 'veryloose')
											}
											value={ props.values.tooth_loss }
											onBlur={ props.handleBlur('tooth_loss') }
											secureTextEntry={ false }
										/>
									</View>
								</View>
								<NormalTextInput
									multiline
									lable="Prior history if any or other information"
									onChangeText={ props.handleChange('prior_history') }
									value={ props.values.prior_history }
									onBlur={ props.handleBlur('prior_history') }
									secureTextEntry={ false }
								/>
								<TouchableOpacity
									style={ styles.consultButton }
									onPress={ () => setIsModalVisible(true) }>
									<View style={ styles.arrowWrap }>
										<Text style={ globalStyles.buttonText }>Next </Text>
										<Image source={ arrow } style={ styles.arrow } />
									</View>
								</TouchableOpacity>
							</KeyboardAvoidingView>
						  )}
				</Formik>
			</ScrollView>
			<Modal transparent={ true } visible={ isDeleteModalVisible }>
				<View style={ styles.modalWrap }>
					<LinearGradient
						start={ { x: 0.4, y: 0.1 } }
						end={ { x: 0.8, y: 1.1 } }
						colors={ [ '#0F8E79', '#66CC80' ] }
						style={ styles.successModalTextWrap }>
						<View style={ styles.successTextWrap }>
							<TouchableOpacity onPress={ () => setIsDeleteModalVisible(false) }>
								<Image
									source={ require('../../../assets/cross.png') }
									style={ styles.closeIcon1 }
								/>
							</TouchableOpacity>

							<Image
								source={ require('../../../assets/bin-icon.png') }
								style={ styles.successIcon }
							/>
							<Text style={ styles.successModalText1 }>
								Are you sure want to delete the items
							</Text>
						</View>
						<View style={ styles.modalButtonContainer }>
							<TouchableOpacity
								style={ styles.continueButton }
								onPress={ () => handleDeleteNote(preview.id) }>
								<Text style={ styles.continueButtonText }>Yes</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={ styles.continueButton }
								onPress={ () => setIsDeleteModalVisible(false) }>
								<Text style={ styles.continueButtonText }>No</Text>
							</TouchableOpacity>
						</View>
					</LinearGradient>
				</View>
			</Modal>
			<Modal transparent={ true } visible={ isOptionModal }>
				<View style={ styles.modalWrap }>
					<LinearGradient
						start={ { x: 0.4, y: 0.1 } }
						end={ { x: 0.8, y: 1.1 } }
						colors={ [ '#0F8E79', '#66CC80' ] }
						style={ styles.successModalTextWrap }>
						<View style={ styles.successTextWrap }>
							<TouchableOpacity onPress={ () => setIsDeleteModalVisible(false) }>
								<Image
									source={ require('../../../assets/cross.png') }
									style={ styles.closeIcon1 }
								/>
							</TouchableOpacity>
							<Text style={ styles.successModalText1 }>
								Are you want to continue with remote consultation
							</Text>
						</View>
						<View style={ styles.modalButtonContainer }>
							<TouchableOpacity
								style={ styles.continueButton }
								onPress={ () => handleRemote(preview) }>
								<Text style={ styles.continueButtonText }>Yes</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={ styles.continueButton }
								onPress={ gotoNotes }>
								<Text style={ styles.continueButtonText }>No</Text>
							</TouchableOpacity>
						</View>
					</LinearGradient>
				</View>
			</Modal>
		</SafeAreaView>
	);
}

/* eslint-enable no-mixed-spaces-and-tabs */

function mapStateToProps(state) {
	return {
		resp: state.journal
	};
}

export default connect(
	mapStateToProps,
	{ getUserNote, getDeleteNote, createUserNote, updateUserNote }
)(AddQuestion);
