import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Platform } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import RadioButton from '../../../components/textInputs/RadioButton';
import RNFetchBlob from 'rn-fetch-blob';
import { Formik } from 'formik';
import * as yup from 'yup';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { createDentalVisits } from '../../../state/actions/journal';

import { uploadFile } from '../../../utilities/api-request';

import styles from './styles';
import globalStyles from '../../../globalStyles';

const dentalVisitSchema = yup.object({
	visit_reason: yup.string().required(),
	visit_description: yup.string().required(),
	visit_experience: yup.string().required(),
	fees_paid: yup.string().required(),
	insurance_used: yup.string().required(),
	media: yup.array()
});

const imageOptions = {
	title: 'Choose Image or Video',
	customButtons: [
		{ name: 'image', title: 'Take a Photo' },
		{ name: 'video', title: 'Take a Video' }
	],
	chooseFromLibraryButtonTitle: 'Choose from gallery',
	takePhotoButtonTitle: null,
	noData: true
};

var tempImage = [];
var tempMedia = [];

function DentalVisitForm() {
	// const { createDentalVisits } = props;
	const [ imageSource, setImageSource ] = useState([]);
	const [ enableVideo, setEnableVideo ] = useState(true);
	const [ isVideoUpload, setIsVideoUpload ] = useState(false);

	const handleSubmit = (values) => {
		const { visit_reason, visit_description, visit_experience, insurance_used, fees_paid } = values;

		const data = [
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
		tempImage.map((item) => {
			let uri = item.uri;
			if (Platform.OS === 'ios') {
				uri = uri.replace('file://', '');
			} 
			data.push({
				name: 'media',
				filename: `patient${Date.now()}`,
				data: RNFetchBlob.wrap(uri),
				type: item.type
			});
		});

		const params = {
			method: 'POST',
			path: 'visit/visits/',
			headerConfig: {
				'Content-Type' : 'multipart/form-data'
			},
			data
		};
		uploadFile(params, createDentalVisitsSuccess, createDentalVisitsFailure);
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
								type: customResponse.type
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
				console.log('=====response Camers', response);
				let source = { ...response };
				let media = {
					uri: response.uri,
					name: response.fileName,
					type: response.type
				};

				if (tempMedia.length < 7) {
					tempImage.push(source);
					tempMedia.push(media);
				}
				setImageSource(tempImage);
			}
		});
	};

	const createDentalVisitsSuccess = data => {
		console.log('api success', data);
	};

	const createDentalVisitsFailure = () => {
		// alert('Network error');
	};

	return (
		<View style={ styles.container }>
			<ScrollView>
				<Formik
					initialValues={ {
						visit_reason: '',
						visit_description: '',
						visit_experience: '',
						fees_paid: '',
						insurance_used: '',
						media: []
					} }
					validationSchema={ dentalVisitSchema }
					onSubmit={ (values) => {
						// actions.resetForm();
						handleSubmit(values);
					} }
				>
					{
						(props) => (
						<View style={ styles.dentalVisitWrapper }>
							<View style={ styles.wrapper }>
								<Text style={ styles.title }>reason for visit ?</Text>
								<TextInput
									style={ styles.inputText }
									onChangeText={ props.handleChange('visit_reason') }
									onBlur={ props.handleBlur('visit_reason') }
									value={ props.values.visit_reason }
									underlineColorAndroid="transparent"
									placeholderTextColor="grey"
								/>
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
									placeholderTextColor="grey"
									numberOfLines={ 5 }
									multiline={ true }
								/>
							</View>

							<View style={ styles.wrapper }>
								<Text style={ styles.title }>experience of that visit</Text>
								<TextInput
									style={ [ styles.inputText ] }
									value={ props.values.visit_experience }
									textAlignVertical="top"
									onChangeText={ props.handleChange('visit_experience') }
									onBlur={ props.handleBlur('visit_experience') }
									underlineColorAndroid="transparent"
									placeholderTextColor="grey"
								/>
							</View>

							{/* <View style={ styles.wrapper }>
								<Text style={ styles.title }>dentist name</Text>
								<TextInput
									style={ styles.inputText }
									underlineColorAndroid="transparent"
									placeholderTextColor="grey"
								/>
							</View> */}

							<View style={ styles.wrapper }>
								<Text style={ styles.title }>fees paid</Text>
								<TextInput
									style={ styles.inputText }
									onChangeText={ props.handleChange('fees_paid') }
									onBlur={ props.handleBlur('fees_paid') }
									value={ props.values.fees_paid }
									underlineColorAndroid="transparent"
									placeholderTextColor="grey"
								/>
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
										onPress={  () => props.setFieldValue('insurance_used', 'yes', false) }
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
										onPress={ () => props.setFieldValue('insurance_used', 'no', false) }
										onBlur={ props.handleBlur('insurance_used') }
										value={ props.values.insurance_used }
										secureTextEntry={ false }
									/>
								</View>
							</View>

							<View style={ styles.wrapper }>
								<Text style={ styles.title }>add files</Text>
								<View style={ styles.fileContainer }>
									<TouchableOpacity
										style={ styles.addTile }
										onPress={ takeImageHandler }
										activeOpacity={ 0.7 }
									>
										<SimpleLineIcons name="plus" size={ 20 } color="#0A8A7B" />
									</TouchableOpacity>
									{
										imageSource.length > 0 ?
										(
											imageSource.map((img, index) => {
												return (
													<View
														key={ `image_${index}` }
														style={ styles.imagePreview }>
														<Image source={ img } style={ styles.image } />
													</View>
												);
											})
										)
										:
										<View style={ styles.textContainer }>
											<Text
												style={ styles.lightText }
											>Add Images or Video through the camera or adding it from the gallery (Optional)</Text>
										</View>
									}
								</View>
								<Modal transparent={ true } visible={ isVideoUpload }>
									<View style={ styles.modalWrap }>
										<View style={ styles.modalTextWrap }>
											<TouchableOpacity
												onPress={ () => setIsVideoUpload(false) }>
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
								activeOpacity={ 0.8 }
							>
								<Text style={ globalStyles.buttonText }>add</Text>
							</TouchableOpacity>

						</View>
						)
					}
				</Formik>
			</ScrollView>
		</View>
	);
}

export default connect(null, {
	createDentalVisits
})(DentalVisitForm);

