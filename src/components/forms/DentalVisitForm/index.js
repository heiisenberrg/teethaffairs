import React, { useState } from 'react';
import {
	Image,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Modal,
	Platform
} from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import RadioButton from '../../../components/textInputs/RadioButton';
import Toast from '../../../components/Toast';
import { Formik } from 'formik';
import * as yup from 'yup';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import RNFetchBlob from 'rn-fetch-blob';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
	createDentalVisits,
	updateDentalVisit
} from '../../../state/actions/journal';
import Video from 'react-native-video';
import styles from './styles';
import globalStyles from '../../../globalStyles';

const dentalVisitSchema = yup.object({
	visit_reason: yup.string().trim().required('Required'),
	visit_description: yup.string().trim().required('Required'),
	visit_experience: yup.string().trim().required('Required'),
	fees_paid: yup.string().trim().required('Required'),
	doctor: yup.string().trim().required('Required'),
	insurance_used: yup.string().trim().required('Required'),
	media: yup.array()
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
var tempMedia = [];

function DentalVisitForm(props) {
	const { route, updateDentalVisit, navigation, createDentalVisits } = props;
	let initialValues = {};
	const doesEditEnabled = route && route.params && route.params.visit;
	if (doesEditEnabled) {
		const { visit } = route.params;
		initialValues = {
			visit_reason: visit.visit_reason,
			visit_description: visit.visit_description,
			visit_experience: visit.visit_experience,
			fees_paid: visit.fees_paid,
			insurance_used: visit.insurance_used ? 'yes' : 'no',
			media: visit.media,
			doctor: visit.doctor
		};
	} else {
		initialValues = {
			visit_reason: '',
			visit_description: '',
			visit_experience: '',
			fees_paid: '',
			insurance_used: '',
			doctor: '',
			media: []
		};
	}

	const [ imageSource, setImageSource ] = useState([]);
	const [ enableVideo, setEnableVideo ] = useState(true);
	const [ showModal, setShowModal ] = useState(false);
	const [ isVideoUpload, setIsVideoUpload ] = useState(false);
	const [ showDropDown, setShowDropDown ] = useState(false);
	const ratings = [ 'very good', 'good', 'moderate', 'ok', 'bad' ];

	const handleSubmit = async (values, actions) => {
		if (route && route.params && route.params.visit) {
			const { visit } = route.params;
			const data = {
				visit_reason: values.visit_reason,
				visit_description: values.visit_description,
				visit_experience: values.visit_experience,
				fees_paid: values.fees_paid,
				insurance_used: values.insurance_used,
				doctor: values.doctor
			};
			await updateDentalVisit(
				visit.id,
				data,
				editDentalVisitsSuccess,
				editDentalVisitsFailure
			);
		} else {
			const {
				visit_reason,
				visit_description,
				visit_experience,
				insurance_used,
				fees_paid,
				doctor
			} = values;
			const data = [
				{
					name: 'doctor',
					data: doctor
				},
				{
					name: 'visit_reason',
					data: visit_reason
				},
				{
					name: 'visit_description',
					data: visit_description
				},
				{
					name: 'visit_experience',
					data: visit_experience
				},
				{
					name: 'insurance_used',
					data: insurance_used
				},
				{
					name: 'fees_paid',
					data: fees_paid
				}
			];
			tempImage.map(item => {
				data.push({
					name: 'media',
					filename: `patient${Date.now()}`,
					data:
						Platform.OS === 'android'
							? RNFetchBlob.wrap(item.uri)
							: RNFetchBlob.wrap(item.uri.replace('file://', '')),
					type: item.type
				});
			});
			await createDentalVisits(data, createDentalVisitsSuccess);
			actions.resetForm();
		}
	};

	const takeImageHandler = () => {
		ImagePicker.showImagePicker(imageOptions, response => {
			console.warn('image upload response', response);
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
						let source = {
							...customResponse,
							media: customResponse.uri
						};
						let media;
						if (response.customButton === 'image') {
							media = {
								uri: customResponse.uri,
								name: customResponse.fileName,
								type: customResponse.type
							};

							if (tempMedia.length < 7) {
								tempImage.push(source);
								tempMedia.push(media);
							}
							setImageSource([ ...tempImage ]);
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
								setImageSource([ ...tempImage ]);
							} else {
								setIsVideoUpload(true);
							}
						}
					}
				);
			} else if (response.uri && response.uri !== '') {
				let source = {
					...response,
					media: response.uri
				};
				let media = {
					uri: response.uri,
					name: response.fileName,
					type: response.type
				};

				if (tempMedia.length < 7) {
					tempImage.push(source);
					tempMedia.push(media);
				}
				setImageSource([ ...tempImage ]);
			}
		});
	};

	const createDentalVisitsSuccess = () => {
		setShowModal(true);
		setImageSource([]);
		tempImage = [];
	};

	const editDentalVisitsSuccess = () => {
		setShowModal(true);
		setImageSource([]);
	};

	const editDentalVisitsFailure = () => {};

	const handleToastSuccess = () => {
		setShowModal(false);
		navigation.goBack();
	};

	return (
		<View>
			<ScrollView
				contentContainerStyle={ styles.container }
				showsVerticalScrollIndicator={ false }>
				<Formik
					initialValues={ {
						...initialValues
					} }
					validationSchema={ dentalVisitSchema }
					enableReinitialize
					onSubmit={ (values, actions) => {
						handleSubmit(values, actions);
					} }>
					{props => (
						<View style={ styles.dentalVisitWrapper }>
							<View style={ styles.wrapper }>
								<Text style={ styles.title }>reason for visit ?</Text>
								<TextInput
									textAlignVertical="top"
									style={ styles.inputText }
									onChangeText={ props.handleChange('visit_reason') }
									onBlur={ props.handleBlur('visit_reason') }
									value={ props.values.visit_reason }
									error={
										props.touched.visit_reason && props.errors.visit_reason
									}
									underlineColorAndroid="transparent"
									placeholderTextColor="grey"
								/>
								<Text style={ styles.errorText }>
									{props.touched.visit_reason && props.errors.visit_reason}
								</Text>
							</View>

							<View style={ styles.wrapper }>
								<Text style={ styles.title }>detailed description</Text>
								<TextInput
									style={ [ styles.inputText, styles.inputTextExpanded ] }
									value={ props.values.visit_description }
									textAlignVertical="top"
									onChangeText={ props.handleChange('visit_description') }
									onBlur={ props.handleBlur('visit_description') }
									underlineColorAndroid="transparent"
									error={
										props.touched.visit_description &&
										props.errors.visit_description
									}
									placeholderTextColor="grey"
									numberOfLines={ 5 }
									multiline={ true }
								/>
								<Text style={ styles.errorText }>
									{props.touched.visit_description &&
										props.errors.visit_description}
								</Text>
							</View>

							<TouchableOpacity style={ [ styles.wrapper ] }>
								<Text style={ styles.title }>experience of that visit</Text>
								<TouchableOpacity
									style={ [ styles.inputText, styles.flexRow ] }
									onPress={ () => setShowDropDown(!showDropDown) }>
									<Text>{props.values.visit_experience}</Text>
									<View style={ styles.flexEnd }>
										<Ionicons
											name={ 'ios-arrow-down' }
											size={ 20 }
											color={ '#A1A1A1' }
										/>
									</View>
								</TouchableOpacity>
							</TouchableOpacity>

							{showDropDown && (
								<View style={ styles.dropdownContainer }>
									{ratings.map((item, index) => {
										return (
											<TouchableOpacity
												key={ `index-${index}` }
												style={ styles.dropDownContent }
												onPress={ () => [
													props.setFieldValue('visit_experience', item, true),
													setShowDropDown(!showDropDown)
												] }>
												<Text style={ styles.experienceText }>{item}</Text>
											</TouchableOpacity>
										);
									})}
								</View>
							)}
							<Text style={ styles.errorText }>
								{props.touched.visit_experience &&
									props.errors.visit_experience}
							</Text>

							<View style={ styles.wrapper }>
								<Text style={ styles.title }>dentist name</Text>
								<TextInput
									style={ styles.inputText }
									onChangeText={ props.handleChange('doctor') }
									onBlur={ props.handleBlur('doctor') }
									value={ props.values.doctor }
									error={ props.touched.doctor && props.errors.doctor }
									underlineColorAndroid="transparent"
									placeholderTextColor="grey"
								/>
								<Text style={ styles.errorText }>
									{props.touched.doctor && props.errors.doctor}
								</Text>
							</View>

							<View style={ styles.wrapper }>
								<Text style={ styles.title }>fees paid</Text>
								<TextInput
									style={ styles.inputText }
									onChangeText={ props.handleChange('fees_paid') }
									onBlur={ props.handleBlur('fees_paid') }
									value={ props.values.fees_paid }
									underlineColorAndroid="transparent"
									error={ props.touched.fees_paid && props.errors.fees_paid }
									placeholderTextColor="grey"
									keyboardType="numeric"
								/>
								<Text style={ styles.errorText }>
									{props.touched.fees_paid && props.errors.fees_paid}
								</Text>
							</View>

							<View style={ styles.wrapper }>
								<Text style={ styles.title }>insurance used</Text>
								<View style={ styles.radioContainer }>
									<RadioButton
										button={
											props.values.insurance_used === 'yes'
												? 'activeButton'
												: 'issueButton'
										}
										type="Yes"
										onPress={ () =>
											props.setFieldValue('insurance_used', 'yes', true)
										}
										onBlur={ props.handleBlur('insurance_used') }
										value={ props.values.insurance_used }
										secureTextEntry={ false }
									/>
									<RadioButton
										button={
											props.values.insurance_used === 'no'
												? 'activeButton'
												: 'issueButton'
										}
										type="No"
										onPress={ () =>
											props.setFieldValue('insurance_used', 'no', false)
										}
										onBlur={ props.handleBlur('insurance_used') }
										value={ props.values.insurance_used }
										secureTextEntry={ false }
									/>
								</View>
								<Text style={ styles.errorText }>
									{props.touched.insurance_used && props.errors.insurance_used}
								</Text>
							</View>

							<View style={ styles.wrapper }>
								{!doesEditEnabled && <Text style={ styles.title }>files</Text>}
								<View style={ styles.fileContainer }>
									{!doesEditEnabled && (
										<TouchableOpacity
											style={ styles.addTile }
											onPress={ takeImageHandler }
											activeOpacity={ 0.7 }>
											<SimpleLineIcons name="plus" size={ 20 } color="#0A8A7B" />
										</TouchableOpacity>
									)}

									{imageSource.length > 0
										? imageSource.map((img, index) => {
												return img.mime_type === 'application/octet-stream' ? (
													<View
														key={ `image_${index}` }
														style={ styles.imagePreview }>
														<Video
															source={ { uri: img.media } }
															style={ styles.image }
														/>
													</View>
												) : (
													<View
														key={ `image_${index}` }
														style={ styles.imagePreview }>
														<Image
															source={ { uri: img.media } }
															style={ styles.image }
														/>
													</View>
												);
										})
										: !doesEditEnabled && (
												<View style={ styles.textContainer }>
													<Text style={ styles.lightText }>
														Add Images or Video through the camera or adding it
														from the gallery (Optional)
													</Text>
												</View>
										)}
								</View>
								<Modal transparent={ true } visible={ isVideoUpload }>
									<View style={ styles.modalWrap }>
										<View style={ styles.modalTextWrap }>
											<TouchableOpacity onPress={ () => setIsVideoUpload(false) }>
												<EntypoIcon name="cross" size={ 14 } color="red" />
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
							</View>

							<TouchableOpacity
								style={ [ globalStyles.secondaryButton, styles.button ] }
								onPress={ props.handleSubmit }
								activeOpacity={ 0.8 }>
								<Text style={ globalStyles.buttonText }>
									{doesEditEnabled ? 'update' : 'add'}
								</Text>
							</TouchableOpacity>
						</View>
					)}
				</Formik>
				<Toast
					title="success"
					message="dental visit saved to your list successfully."
					showModal={ showModal }
					handleSubmit={ handleToastSuccess }
					showClose={ false }
					successButtontext="Continue"
				/>
			</ScrollView>
		</View>
	);
}

export default connect(
	null,
	{
		createDentalVisits,
		updateDentalVisit
	}
)(DentalVisitForm);
