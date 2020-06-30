import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	Modal,
	TextInput,
	Image,
	Platform
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Slider from '@react-native-community/slider';
import { connect } from 'react-redux';
import Loader from '../../global/Loader';

import { Formik } from 'formik';
import * as yup from 'yup';

import styles from './styles';
import globalStyles from '../../../globalStyles';

import RadioButton from '../../textInputs/RadioButton';
import TextInputBoxField from '../../textInputs/TextInputBoxField';
import CustomButton from '../../textInputs/CustomButton';

import arrow from '../../../assets/arrow.png';
import NormalTextInput from '../../textInputs/NormalTextInput';
import stepIndicator1 from '../../../assets/stepIndicator1.png';
import stepIndicator2 from '../../../assets/stepIndicator2.png';
import stepIndicator3 from '../../../assets/stepIndicator3.png';
import crossIcon from '../../../assets/cross-Icon.png';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import {
	getDeleteNote,
	getUserNote,
	createUserNote,
	updateUserNote
} from '../../../state/actions/journal';

import FlashMessage from '../../../components/global/FlashMessage';
import Icon from '../../../components/global/Icon';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0;

const step1Schema = yup.object({
	title: yup
		.string()
		.trim()
		.required(),
	description: yup
		.string()
		.trim()
		.required()
	// place_of_issue: yup.array().required(),
	// side_of_issue: yup.string().required()
});

const step2Schema = yup.object({
	pain_level: yup.number().required(),
	pain_type: yup.string().required(),
	sensivity_temperature: yup.string().required(),
	tender: yup.string().required(),
	tooth_issue_identified: yup.string().required(),
	onset: yup.string().required()
});

const step3Schema = yup.object({
	issue_start_date: yup
		.string()
		.trim()
		.required(),
	swelling_size: yup.string().required(),
	bleeding: yup.string().required(),
	pus_presence: yup.string().required(),
	prior_history: yup
		.string()
		.trim()
		.required(),
	tooth_loss: yup.string().required()
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

function AddQuestion(props) {
	var tempImage = [];
	var preview = [];
	var tempMedia = [];

	const {
		navigation,
		getDeleteNote,
		createUserNote,
		updateUserNote,
		route,
		loading
	} = props;
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
	const [ saveDetails, setSaveDetails ] = useState({});
	const [ placeOfIssue, setPlaceOfIssue ] = useState([]);
	const [ sideOfIssue, setSideOfIssue ] = useState([]);

	let initialValues = {};
	const doesEditEnabled = route && route.params && route.params.data;
	if (doesEditEnabled) {
		const { data } = route.params;
		initialValues = {
			pain_level: data.pain_level ? data.pain_level : 0,
			description: data.description ? data.description : '',
			// place_of_issue: data.place_of_issue ? data.place_of_issue : [],
			// side_of_issue: data.side_of_issue ? data.side_of_issue : '',
			sensivity_temperature: data.sensivity_temperature
				? data.sensivity_temperature
				: '',
			tender: data.tender ? data.tender : '',
			tooth_issue_identified: data.tooth_issue_identified
				? data.tooth_issue_identified
				: '',
			onset: data.onset ? data.onset : '',
			issue_start_date: data.issue_start_date ? data.issue_start_date : '',
			swelling_size: data.swelling_size ? data.swelling_size : '',
			bleeding: data.bleeding ? data.bleeding : '',
			pus_presence: data.pus_presence ? data.pus_presence : '',
			tooth_loss: data.tooth_loss ? data.tooth_loss : '',
			prior_history: data.prior_history ? data.prior_history : '',
			title: data.title ? data.title : '',
			pain_type: data.pain_type ? data.pain_type : '',
			reference_name: data.reference_name ? data.reference_name : '',
			media: data.media && data.media.length > 0 ? data.media : []
		};
	} else {
		initialValues = {
			pain_level: 0,
			description: '',
			// place_of_issue: [],
			// side_of_issue: '',
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
			title: '',
			pain_type: '',
			reference_name: '',
			media: []
		};
	}

	const handleSubmit = details => {
		if (referenceName.trim() === '') {
			FlashMessage.message(
				'Alert',
				'Please enter the reference name to save',
				'red'
			);
			return;
		}
		let userNotes = {
			...details,
			reference_name: referenceName,
			place_of_issue: placeOfIssue,
			side_of_issue: sideOfIssue
		};
		console.warn('inside submit', userNotes);
		setReferenceName(userNotes.reference_name);
		setIsModalVisible(false);
		const painLevel = userNotes.pain_level;
		var data = [
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
				data: userNotes.issue_start_date ? userNotes.issue_start_date : ''
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
		imageSource.map(item => {
			data.push({
				name: 'media',
				filename: `note${Date.now()}`,
				data:
					Platform.OS === 'android'
						? RNFetchBlob.wrap(item[0].uri)
						: RNFetchBlob.wrap(item[0].uri.replace('file://', '')),
				type: item[0].type
			});
		});
		if (updateNote === false) {
			createUserNote(data, onGetUserNoteSuccess, onGetUserNoteFailure);
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
				/* eslint-disable no-undef */
				updatedNote,
				(id = props.route.params.data.id),
				onGetUserNoteSuccess,
				onGetUserNoteFailure
			);
			/* eslint-enable no-undef */
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
			navigation.pop(2);
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
							if (source.didCancel !== true) {
								media = {
									uri: customResponse.uri,
									name: customResponse.fileName,
									type: customResponse.fileName
								};
								if (tempMedia.length < 5) {
									tempImage.push(source);
									tempMedia.push(media);
								}
								setImageSource([ ...imageSource, tempImage ]);
							}
						} else {
							if (source.didCancel !== true) {
								if (enableVideo) {
									media = {
										uri: customResponse.uri,
										path: customResponse.path
									};
									setEnableVideo(false);
									if (tempMedia.length < 5) {
										tempImage.push(source);
										tempMedia.push(media);
									}
									setImageSource([ ...imageSource, tempImage ]);
								} else {
									setIsVideoUpload(true);
								}
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
				if (tempMedia.length < 5) {
					tempImage.push(source);
					tempMedia.push(media);
				}
				setImageSource([ ...imageSource, tempImage ]);
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
			setSaveDetails(props.route.params.data);
			setReferenceName(
				props.route.params.data.reference_name
					? props.route.params.data.reference_name
					: ''
			);
			setPlaceOfIssue(
				props.route.params.data.place_of_issue
					? props.route.params.data.place_of_issue
					: []
			);
			setSideOfIssue(
				props.route.params.data.side_of_issue
					? props.route.params.data.side_of_issue
					: []
			);
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

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<TouchableOpacity
					style={ styles.backButton }
					onPress={ handleBackNavigation }
					activeOpacity={ 0.8 }>
					<Icon type={ 'Ionicons' } name={ 'ios-arrow-back' } size={ 28 } />
				</TouchableOpacity>
			)
		});
	}, [ showStep3, showStep2, showStep1 ]);

	const changePlaceOfIssue = issue => {
		let data = [ ...placeOfIssue ];
		if (placeOfIssue.indexOf(issue) !== -1) {
			data.splice(placeOfIssue.indexOf(issue), 1);
			setPlaceOfIssue(data);
		} else {
			data.push(issue);
			setPlaceOfIssue(data);
		}
	};

	const changeSideOfIssue = issue => {
		let data = [ ...sideOfIssue ];
		if (sideOfIssue.indexOf(issue) !== -1) {
			data.splice(sideOfIssue.indexOf(issue), 1);
			setSideOfIssue(data);
		} else {
			data.push(issue);
			setSideOfIssue(data);
		}
	};

	const handleBackNavigation = () => {
		if (showStep1) {
			navigation.goBack();
		} else if (showStep2) {
			setShowStep1(true);
			setShowStep2(false);
			setShowStep3(false);
		} else {
			setShowStep1(false);
			setShowStep2(true);
			setShowStep3(false);
		}
	};
	return (
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
			{showStep1 && (
				<Formik
					initialValues={ { ...initialValues } }
					validationSchema={ step1Schema }
					onSubmit={ (values, actions) => {
						if (values.title !== '' && values.description !== '') {
							// if (imageSource.length === 0) {
							// 	FlashMessage.message('Alert', 'Please upload image or video to continue', 'red');
							// }
							//  else
							if (placeOfIssue.length === 0) {
								FlashMessage.message(
									'Alert',
									'Please select place of issue',
									'red'
								);
							} else if (sideOfIssue.length === 0) {
								FlashMessage.message(
									'Alert',
									'Please select side of issue',
									'red'
								);
							} else {
								actions.resetForm();
								setSaveDetails({
									...saveDetails,
									title: values.title,
									description: values.description
								});
								showStep2Screen('two');
							}
						} else {
							setShowStep1(true);
							setIsModalVisible(false);
							FlashMessage.message('Alert', 'Please fill up all fields', 'red');
						}
					} }>
					{props => (
						<View style={ styles.containerWrapper }>
							<KeyboardAvoidingView
							// behavior="position"
							// keyboardVerticalOffset={keyboardVerticalOffset1}
							>
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
									error={ props.touched.description && props.errors.description }
								/>
							</KeyboardAvoidingView>
							<View style={ styles.imageWrap }>
								<Text style={ styles.addFiles }>Add Files</Text>
								<View style={ styles.imageContainer }>
									{imageSource.length < 5 && (
										<View style={ styles.imagePreview1 }>
											<TouchableOpacity onPress={ takeImageHandler }>
												<SimpleLineIcons
													name="plus"
													size={ 20 }
													color="#0A8A7B"
												/>
											</TouchableOpacity>
										</View>
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
												Add Images or Video through the camera or adding it from
												the gallery (Optional)
											</Text>
										</View>
									)}
								</View>
							</View>
							<Modal transparent={ true } visible={ isVideoUpload }>
								<View style={ styles.modalWrap }>
									<View style={ styles.modalTextWrap }>
										<TouchableOpacity onPress={ () => setIsVideoUpload(false) }>
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
								<Text style={ styles.questionText }>Where is the issue ?</Text>
								<View style={ styles.questionContainer }>
									<CustomButton
										button={
											placeOfIssue.indexOf('teeth') !== -1
												? 'activeButton'
												: 'issueButton'
										}
										place_of_issue="teeth"
										onPress={ () => changePlaceOfIssue('teeth') }
										value={ placeOfIssue.indexOf('teeth') !== -1 ? 'teeth' : '' }
										secureTextEntry={ false }
										custom_style={ true }
									/>
									<CustomButton
										button={
											placeOfIssue.indexOf('gums') !== -1
												? 'activeButton'
												: 'issueButton'
										}
										place_of_issue="gums"
										onPress={ () => changePlaceOfIssue('gums') }
										value={ placeOfIssue.indexOf('gums') !== -1 ? 'gums' : '' }
										secureTextEntry={ false }
										custom_style={ true }
									/>
								</View>
								{props.errors.place_of_issue && (
									<Text style={ styles.errorMessage }>
										{' '}
										Place of issue is a required field
									</Text>
								)}
							</View>
							<View style={ styles.symtamsContainer }>
								<Text style={ styles.questionText }>
									Which side check all that apply ?
								</Text>
								<View style={ styles.questionContainer }>
									<CustomButton
										button={
											sideOfIssue.indexOf('upper') !== -1
												? 'activeButton'
												: 'issueButton'
										}
										place_of_issue="upper"
										onPress={ () => changeSideOfIssue('upper') }
										value={ sideOfIssue.indexOf('upper') !== -1 ? 'upper' : '' }
										secureTextEntry={ false }
									/>
									<CustomButton
										button={
											sideOfIssue.indexOf('lower') !== -1
												? 'activeButton'
												: 'issueButton'
										}
										place_of_issue="lower"
										onPress={ () => changeSideOfIssue('lower') }
										value={ sideOfIssue.indexOf('lower') !== -1 ? 'lower' : '' }
										secureTextEntry={ false }
									/>
									<CustomButton
										button={
											sideOfIssue.indexOf('left') !== -1
												? 'activeButton'
												: 'issueButton'
										}
										place_of_issue="left"
										onPress={ () => changeSideOfIssue('left') }
										value={ sideOfIssue.indexOf('left') !== -1 ? 'left' : '' }
										secureTextEntry={ false }
									/>
									<CustomButton
										button={
											sideOfIssue.indexOf('right') !== -1
												? 'activeButton'
												: 'issueButton'
										}
										place_of_issue="right"
										onPress={ () => changeSideOfIssue('right') }
										value={ sideOfIssue.indexOf('right') !== -1 ? 'right' : '' }
										secureTextEntry={ false }
									/>
								</View>
								{props.errors.side_of_issue && (
									<Text style={ styles.errorMessage }>
										{' '}
										Side of issue is a required field
									</Text>
								)}
							</View>
							<View style={ styles.buttonContainer }>
								<TouchableOpacity
									style={ globalStyles.fullWidthButton }
									onPress={ props.handleSubmit }>
									<View style={ styles.arrowWrap }>
										<Text style={ globalStyles.buttonText }>Next </Text>
										<Image source={ arrow } style={ styles.arrow } />
									</View>
								</TouchableOpacity>
							</View>
						</View>
					)}
				</Formik>
			)}
			{showStep2 && (
				<Formik
					initialValues={ { ...initialValues } }
					validationSchema={ step2Schema }
					onSubmit={ (values, actions) => {
						if (
							values.pain_type !== '' &&
							values.sensivity_temperature !== '' &&
							values.tender !== '' &&
							values.tooth_issue_identified !== '' &&
							values.onset !== ''
						) {
							// if (values.pain_level === 0) {
							// 	FlashMessage.message(
							// 		'Alert',
							// 		'Please fill pain level to continue',
							// 		'red'
							// 	);
							// }
							// else {
							actions.resetForm();
							setSaveDetails({
								...saveDetails,
								pain_type: values.pain_type,
								sensivity_temperature: values.sensivity_temperature,
								tender: values.tender,
								tooth_issue_identified: values.tooth_issue_identified,
								onset: values.onset,
								pain_level: values.pain_level
							});
							showStep2Screen('three');
							// }
						} else {
							setShowStep1(true);
							setIsModalVisible(false);
							FlashMessage.message('Alert', 'Please fill up all fields', 'red');
						}
					} }>
					{props => (
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
												painLevel > 4 ? styles.worstButton : styles.activeButton
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
									{props.errors.pain_type && (
										<Text style={ styles.errorMessage }>
											{' '}
											Pain type is a required field
										</Text>
									)}
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
												props.setFieldValue('sensivity_temperature', 'moderate')
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
												props.setFieldValue('sensivity_temperature', 'severe')
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
									{props.errors.sensivity_temperature && (
										<Text style={ styles.errorMessage }>
											{' '}
											Sensitivity temperature is a required field
										</Text>
									)}
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
									{props.errors.tender && (
										<Text style={ styles.errorMessage }>
											{' '}
											Tender is a required field
										</Text>
									)}
								</View>
								<View style={ styles.symtamsContainer }>
									<Text style={ styles.questionText }>
										Are you able to identify the exact tooth that has the issue?
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
													props.setFieldValue('tooth_issue_identified', true)
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
													props.setFieldValue('tooth_issue_identified', false)
												}
												value={ props.values.tooth_issue_identified }
												onBlur={ props.handleBlur('tooth_issue_identified') }
												secureTextEntry={ false }
											/>
										</View>
									</View>
									{props.errors.tooth_issue_identified && (
										<Text style={ styles.errorMessage }>
											{' '}
											Tooth issue identification is a required field
										</Text>
									)}
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
											onPress={ () => props.setFieldValue('onset', 'gradual') }
											value={ props.values.onset }
											onBlur={ props.handleBlur('onset') }
											secureTextEntry={ false }
											custom_style={ true }
										/>
									</View>
									{props.errors.onset && (
										<Text style={ styles.errorMessage }>
											{' '}
											Onset is a required field
										</Text>
									)}
								</View>
							</View>
							<View style={ styles.buttonContainer }>
								<TouchableOpacity
									style={ globalStyles.fullWidthButton }
									onPress={ props.handleSubmit }>
									<View style={ styles.arrowWrap }>
										<Text style={ globalStyles.buttonText }>Next </Text>
										<Image source={ arrow } style={ styles.arrow } />
									</View>
								</TouchableOpacity>
							</View>
						</View>
					)}
				</Formik>
			)}
			{showStep3 && (
				<Formik
					initialValues={ { ...initialValues } }
					validationSchema={ step3Schema }
					onSubmit={ (values, actions) => {
						console.warn('inside step3', values);
						if (
							values.issue_start_date !== '' &&
							values.swelling_size !== '' &&
							values.bleeding !== '' &&
							values.pus_presence !== '' &&
							values.prior_history !== '' &&
							values.tooth_loss !== ''
						) {
							actions.resetForm();
							setSaveDetails({
								...saveDetails,
								issue_start_date: values.issue_start_date,
								swelling_size: values.swelling_size,
								bleeding: values.bleeding,
								pus_presence: values.pus_presence,
								prior_history: values.prior_history,
								tooth_loss: values.tooth_loss
							});
							setIsModalVisible(true);
						} else {
							setShowStep1(true);
							setIsModalVisible(false);
							FlashMessage.message('Alert', 'Please fill up all fields', 'red');
						}
					} }>
					{props => (
						<View style={ styles.keyboard }>
							<KeyboardAvoidingView
								behavior={ Platform.OS === 'ios' ? 'padding' : '' }
								keyboardVerticalOffset={ keyboardVerticalOffset }>
								<ScrollView
									showsHorizontalScrollIndicator={ false }
									contentContainerStyle={ styles.keyboard1 }>
									<View style={ styles.symtamsContainer }>
										<Text style={ styles.questionText }>
											When did the issue start
										</Text>
										<TextInput
											style={ styles.inputText }
											onChangeText={ props.handleChange('issue_start_date') }
											onBlur={ props.handleBlur('issue_start_date') }
											value={ props.values.issue_start_date }
											placeholder="2 days ago"
											underlineColorAndroid="transparent"
											placeholderTextColor="grey"
										/>
										{props.errors.issue_start_date && (
											<Text style={ styles.errorMessage }>
												{' '}
												Issue start date is a required field
											</Text>
										)}
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
										{props.errors.swelling_size && (
											<Text style={ styles.errorMessage }>
												{' '}
												Swelling size is a required field
											</Text>
										)}
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
										{props.errors.bleeding && (
											<Text style={ styles.errorMessage }>
												{' '}
												Bleeding is a required field
											</Text>
										)}
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
										{props.errors.pus_presence && (
											<Text style={ styles.errorMessage }>
												{' '}
												Pus presence is a required field
											</Text>
										)}
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
													props.values.tooth_loss === 'veryloose'
														? 'activeButton'
														: 'issueButton'
												}
												place_of_issue="very loose"
												onPress={ () =>
													props.setFieldValue('tooth_loss', 'veryloose')
												}
												value={ props.values.tooth_loss }
												onBlur={ props.handleBlur('tooth_loss') }
												secureTextEntry={ false }
											/>
										</View>
										{props.errors.tooth_loss && (
											<Text style={ styles.errorMessage }>
												{' '}
												Tooth loss is a required field
											</Text>
										)}
									</View>
									<Loader loading={ loading } />

									<NormalTextInput
										multiline
										lable="Prior history if any or other information"
										onChangeText={ props.handleChange('prior_history') }
										value={ props.values.prior_history }
										onBlur={ props.handleBlur('prior_history') }
										secureTextEntry={ false }
									/>
									{props.errors.prior_history && (
										<Text style={ styles.errorMessage }>
											{' '}
											Prior history is a required field
										</Text>
									)}
									<TouchableOpacity
										style={ styles.consultButton }
										onPress={ props.handleSubmit }>
										<View style={ styles.arrowWrap }>
											<Text style={ globalStyles.buttonText }>Next </Text>
											<Image source={ arrow } style={ styles.arrow } />
										</View>
									</TouchableOpacity>
								</ScrollView>
							</KeyboardAvoidingView>
						</View>
					)}
				</Formik>
			)}
			{isSuccessModalVisible || isModalVisible ? (
				<Modal transparent={ true } visible={ true }>
					<View style={ styles.modalWrap }>
						<View style={ styles.modalTextWrap }>
							<TouchableOpacity onPress={ goHome }>
								<Image source={ crossIcon } style={ styles.closeIcon } />
							</TouchableOpacity>
							<Text style={ styles.modalText }>save as</Text>
							<NormalTextInput
								saveas="saveas"
								lable="Give it a name for future reference"
								onChangeText={ text => setReferenceName(text) }
								value={ referenceName }
								secureTextEntry={ false }
							/>

							{isSuccessModalVisible ? (
								<TouchableOpacity style={ styles.savedButton }>
									<Text style={ styles.savedButtonText }>saved!</Text>
								</TouchableOpacity>
							) : (
								<TouchableOpacity
									style={ styles.consultButton }
									onPress={ () => handleSubmit(saveDetails) }>
									<Text style={ styles.loginText }>save</Text>
								</TouchableOpacity>
							)}
						</View>
					</View>
				</Modal>
			) : (
				<Text style={ styles.hideText } />
			)}

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
		</ScrollView>
	);
}

function mapStateToProps(state) {
	return {
		resp: state.journal,
		loading: state.journal.loading
	};
}

export default connect(
	mapStateToProps,
	{ getUserNote, getDeleteNote, createUserNote, updateUserNote }
)(AddQuestion);
