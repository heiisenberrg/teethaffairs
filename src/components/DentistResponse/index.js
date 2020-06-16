import React, { useState, useEffect } from 'react';
import {
	Image,
	FlatList,
	ScrollView,
	TouchableOpacity,
	Modal,
	TextInput
} from 'react-native';
import View from '../global/View';
import Text from '../global/Text';
import Icon from '../global/Icon';
import styles from './styles';
import moment from 'moment';
import { connect } from 'react-redux';
import { verifyPin } from '../../state/actions/doctor';
import ImagePreviewer from '../../components/global/ImagePreviewer';
import VideoPreviewer from '../../components/global/VideoPreviewer';
import FlashMessage from '../../components/global/FlashMessage';
import Video from 'react-native-video';

const detail = [
	{
		question: 'Question',
		answer: 'title',
		type: 'string'
	},
	{
		question: 'Description',
		answer: 'description',
		type: 'string'
	},
	{
		question: 'Where is the issue?',
		answer: 'place_of_issue',
		type: 'string'
	},
	{
		question: 'Which side?',
		answer: 'side_of_issue',
		type: 'string'
	},
	{
		question: 'Pain level',
		answer: 'pain_level',
		type: 'number'
	},
	{
		question: 'Pain type',
		answer: 'pain_type',
		type: 'string'
	},
	{
		question: 'Sensitivity to temperature',
		answer: 'sensivity_temperature',
		type: 'string'
	},
	{
		question: 'Tender (Painful to Touch/bite)',
		answer: 'tender',
		type: 'boolean'
	},
	{
		question: 'Are you able to identify the exact tooth that has the issue',
		answer: 'tooth_issue_identified',
		type: 'boolean'
	},
	{
		question: 'Onset',
		answer: 'onset',
		type: 'string'
	},
	{
		question: 'When did the issue start',
		answer: 'issue_start_date',
		type: 'string'
	},
	{
		question: 'Swelling size',
		answer: 'swelling_size',
		type: 'string'
	},
	{
		question: 'Bleeding',
		answer: 'bleeding',
		type: 'boolean'
	},
	{
		question: 'Presence of pus',
		answer: 'pus_presence',
		type: 'boolean'
	},
	{
		question: 'Loose tooth',
		answer: 'tooth_loss',
		type: 'string'
	},
	{
		question: 'Prior History',
		answer: 'prior_history',
		type: 'string'
	}
];

const pharmacies = [
	'ABC Pharmacy, New York',
	'Best Care Pharmacy, New York',
	'Arrow Central Pharmacy, New York',
	'Grand Health Pharmacy, New York',
	'Medilane Pharmacy, New York'
];

function DentistResponse(props) {
	const { route, navigation, verifyPin, user } = props;
	const [ isResponse ] = useState(true);
	const [ isQuestionVisible, setIsQuestionVisible ] = useState(true);
	const [ showModal, setShowModal ] = useState(false);
	const [ showVerifyPinModal, setShowVerifyPinModal ] = useState(true);
	const [ showError, setShowError ] = useState(false);
	const [ pinValue, setPinValue ] = useState('');
	const [ data, setData ] = useState({});
	const [ searchValue, setSearchValue ] = useState('');
	const [ showDropDown, setShowDropDown ] = useState(false);
	const [ filteredPharmacies, setFilteredPharmacies ] = useState([]);
	const [ selectedPharmacy, setSelectedPharmacy ] = useState('');
	const [ uri, setUri ] = useState('');
	const [ enablePreview, setEnablePreview ] = useState(false);
	const [ isImage, setIsImage ] = useState(true);

	useEffect(() => {
		if (route && route.params && Object.keys(route.params).length > 0) {
			setData(route.params.data);
		}
	}, []);

	const filterPharmacies = value => {
		let filteredData = pharmacies;
		if (value !== '') {
			filteredData = [];
			pharmacies.map(x => {
				if (x.includes(value)) {
					filteredData.push(x);
				}
			});
		}
		setFilteredPharmacies(filteredData);
		setShowDropDown(true);
	};

	const handlePreview = data => {
		if (data === 'image') {
			setIsImage(true);
		} else {
			setIsImage(false);
		}
		setEnablePreview(!enablePreview);
	};

	const selectPharmacy = item => {
		let data = [ ...selectedPharmacy ];
		if (data.indexOf(item) !== -1) {
			data.splice(data.indexOf(item), 1);
		} else {
			data.push(item);
		}
		setSelectedPharmacy(data);
		setSearchValue(item);
		setShowDropDown(!showDropDown);
	};

	const submitPin = () => {
		if (pinValue !== '') {
			verifyPin(
				{
					secret_pin: pinValue,
					question_id: data.id
				},
				verifyPinSuccess,
				() => setShowError(!showError)
			);
		} else {
			FlashMessage.message('Alert', 'Please enter the pin to continue', 'red');
		}
	};

	function verifyPinSuccess(response) {
		if (response && response.error_code === 2001) {
			FlashMessage.message('Alert', 'Invalid PIN', 'red');
			navigation.goBack();
		} else {
			setShowVerifyPinModal(!showVerifyPinModal);
		}
	}

	const naviagteToNote = () => {
		navigation.navigate('Note Preview', { previewNote: data });
	};

	const patientQuestions = () => {
		return (
			<View style={ styles.ph20 }>
				{isResponse && (
					<View style={ styles.mv10 }>
						<View row jC={ 'space-between' }>
							<Text
								s={ 14 }
								lh={ 16 }
								w={ 'bold' }
								c={ '#108F79' }
								style={ styles.upperCase }>
								Patient details
							</Text>
							<TouchableOpacity
								style={ styles.arrowContainer }
								onPress={ () => setIsQuestionVisible(!isQuestionVisible) }>
								<Icon
									type={ 'Ionicons' }
									name={
										!isQuestionVisible
											? 'md-arrow-dropright'
											: 'md-arrow-dropdown'
									}
									size={ 18 }
									color={ 'grey' }
								/>
							</TouchableOpacity>
						</View>
					</View>
				)}
				{isQuestionVisible && (
					<>
						{patientDetails()}
						{attachments()}
						{details()}
					</>
				)}
				{modal()}
			</View>
		);
	};

	const patientDetails = () => {
		return (
			<View style={ styles.mv10 }>
				<View row center style={ styles.flexColumnContainer }>
					<View style={ styles.flexColumn }>
						<Text s={ 14 } lh={ 16 } w={ 'bold' }>
							Name:
						</Text>
						<Text s={ 14 } lh={ 16 } style={ styles.mv5 }>
							{data.patient_name ? data.patient_name : 'N/A'}
						</Text>
					</View>
					<View style={ styles.flexColumn }>
						<Text s={ 14 } lh={ 16 } w={ 'bold' }>
							Age:
						</Text>
						<Text s={ 14 } lh={ 16 } style={ styles.mv5 }>
							{data.age ? data.age : 'N/A'}
						</Text>
					</View>
					<View style={ styles.flexColumn }>
						<Text s={ 14 } lh={ 16 } w={ 'bold' }>
							Height:
						</Text>
						<Text s={ 14 } lh={ 16 } style={ styles.mv5 }>
							{data.height ? data.height : 'N/A'}
						</Text>
					</View>
					<View style={ styles.flexColumn }>
						<Text s={ 14 } lh={ 16 } w={ 'bold' }>
							Weight:
						</Text>
						<Text s={ 14 } lh={ 16 } style={ styles.mv5 }>
							{data.weight ? data.weight : 'N/A'}
						</Text>
					</View>
				</View>
				<View row style={ styles.flexColumnContainer }>
					<View style={ styles.flexColumn }>
						<Text s={ 14 } lh={ 16 } w={ 'bold' }>
							Allergies:
						</Text>
						<Text s={ 14 } lh={ 16 } style={ styles.mv5 }>
							{data.allergies ? data.allergies.join(', ') : 'N/A'}
						</Text>
					</View>
					<View style={ styles.flexColumn }>
						<Text s={ 14 } lh={ 16 } w={ 'bold' }>
							Medical Conditions:
						</Text>
						<Text s={ 14 } lh={ 16 } style={ styles.mv5 }>
							{data.medical_conditions
								? data.medical_conditions.join(', ')
								: 'N/A'}
						</Text>
					</View>
					<View style={ styles.flexColumn }>
						<Text s={ 14 } lh={ 16 } w={ 'bold' }>
							Taking any medications:
						</Text>
						<Text s={ 14 } lh={ 16 } style={ styles.mv5 }>
							{data.medications ? data.medications.join(', ') : 'N/A'}
						</Text>
					</View>
				</View>
			</View>
		);
	};

	const attachments = () => {
		return (
			<View style={ styles.mv10 }>
				<Text s={ 14 } lh={ 16 } w={ 'bold' } c={ '#108F79' } style={ styles.upperCase }>
					Attachments
				</Text>
				<FlatList
					numColumns={ 6 }
					data={ data.media }
					ListEmptyComponent={ () => (
						<View center>
							<Text>No attachments</Text>
						</View>
					) }
					renderItem={ ({ item, index }) => {
						return (
							<View>
								{item.mime_type === 'application/octet-stream' ? (
									<TouchableOpacity
										activeOpacity={ 0.9 }
										onPress={ () => [ setUri(item.media), handlePreview('video') ] }
										key={ `${item}-${index}` }>
										<Video
											source={ {
												uri: item.media
											} }
											style={ styles.attachmentImage }
										/>
									</TouchableOpacity>
								) : (
									<TouchableOpacity
										activeOpacity={ 0.9 }
										onPress={ () => [ setUri(item.media), handlePreview('image') ] }
										key={ `${item}-${index}` }>
										<Image
											style={ styles.attachmentImage }
											source={ {
												uri: item.media
											} }
										/>
									</TouchableOpacity>
								)}
							</View>
						);
					} }
					extraData={ data }
				/>
			</View>
		);
	};

	const questionAnswers = ({ item, index }) => {
		return (
			<View key={ `questions-${index}` } style={ styles.mv5 }>
				<Text s={ 14 } lh={ 20 } w={ 'bold' }>
					{item.question}
				</Text>
				<Text s={ 14 } lh={ 16 }>
					{item.type === 'string'
						? data[item.answer]
							? data[item.answer]
							: 'N/A'
						: item.type === 'number'
						? `${data[item.answer]}/10`
						: item.type === 'boolean'
						? data[item.answer]
							? 'Yes'
							: 'No'
						: item.type === 'date'
						? data[item.answer]
							? moment(data[item.answer]).format('MMM DD, YYYY')
							: 'N/A'
						: 'N/A'}
				</Text>
			</View>
		);
	};

	const details = () => {
		return (
			<View style={ styles.mv10 }>
				<Text s={ 14 } lh={ 16 } w={ 'bold' } c={ '#108F79' } style={ styles.upperCase }>
					Details
				</Text>
				<FlatList data={ detail } renderItem={ questionAnswers } />
			</View>
		);
	};

	const actionButtons = () => {
		/* eslint-disable no-unused-vars */
		const docData =
			Object.keys(data).length !== 0 &&
			data.question_info &&
			data.question_info[0];
		return (
			<View style={ { ...styles.mb20, ...styles.ph20 } }>
				{/* {data && data.responded && (
					<View style={styles.actionButtons}>
						<Text s={14} c={'#848484'} center>
							To request a prescription for these medications, click the
							“Request prescription” button below and select your pharmacy. You
							will be charged $10 to request this prescription.
						</Text>
					</View>
				)} */}
				{data && data.responded && data.rejected && (
					<TouchableOpacity
						style={ [ styles.buttonContainer, styles.mv10 ] }
						onPress={ () =>
							// data.rejected ? naviagteToNote() : setShowModal(!showModal)
							naviagteToNote()
						}>
						<Text
							s={ 16 }
							lh={ 16 }
							w={ 'bold' }
							c={ 'white' }
							style={ styles.upperCase }>
							{/* {data.rejected ? 'Edit question' : 'Request prescription'} */}
							Edit question
						</Text>
					</TouchableOpacity>
				)}
				{/* {data && data.responded && (
					<View style={ styles.m15 }>
						<View row style={ styles.actionables }>
							<Icon
								type={ 'MaterialCommunityIcons' }
								name={ 'phone' }
								size={ 22 }
								color={ '#7C7C7C' }
							/>
							<Text s={ 14 } style={ styles.actionableText }>
								Call Dr. {docData.doctor_name ? docData.doctor_name : 'N/A'}{' '}
								office to set up an appoinment
							</Text>
						</View>

						<View row style={ { ...styles.actionables, ...styles.mv10 } }>
							<Icon
								type={ 'Ionicons' }
								name={ 'ios-at' }
								size={ 22 }
								color={ '#7C7C7C' }
							/>
							<Text s={ 14 } style={ styles.actionableText }>
								Contact by email{' '}
								{docData.doctor_email ? docData.doctor_email : 'N/A'}
							</Text>
						</View>

						<View row style={ styles.actionables }>
							<Icon
								type={ 'FontAwesome5' }
								name={ 'map-marked-alt' }
								size={ 22 }
								color={ '#7C7C7C' }
							/>
							<Text s={ 14 } style={ styles.actionableText }>
								Directions to Dr {docData.doctor_name}'s office Joe Dental,{' '}
								{docData.address1}, {docData.address2}
							</Text>
						</View>

						<View row style={ styles.actionables }>
							<Icon
								type={ 'MaterialCommunityIcons' }
								name={ 'doctor' }
								size={ 24 }
								color={ '#7C7C7C' }
							/>
							<Text s={ 14 } style={ styles.actionableText }>
								Find an other Teethaffairs dentist near you at the moment.
							</Text>
						</View>
					</View>
				)} 
					{/* will be implemented this feature in future*/}
			</View>
		);
	};

	const modal = () => {
		return (
			<Modal transparent={ true } visible={ showModal }>
				<View style={ styles.modalContainer }>
					<View style={ styles.modalContent }>
						<TouchableOpacity
							style={ styles.crossButton }
							onPress={ () => setShowModal(!showModal) }>
							<Icon
								type={ 'MaterialCommunityIcons' }
								name={ 'close' }
								color={ '#767676' }
								size={ 22 }
							/>
						</TouchableOpacity>
						<View>
							<Text
								s={ 16 }
								lh={ 30 }
								c={ '#0A8A7B' }
								center
								w={ 'bold' }
								style={ styles.upperCase }>
								Request prescription
							</Text>
							<Text s={ 14 } lh={ 30 }>
								Select Pharmacy , within your zipcode
							</Text>
							<View row style={ styles.mv10 }>
								<View style={ styles.flex }>
									<View row center style={ styles.searchContent }>
										<TextInput
											textAlignVertical="top"
											style={ [ styles.p10, styles.flex ] }
											value={ searchValue }
											onChangeText={ value => [
												setSearchValue(value),
												filterPharmacies(value)
											] }
										/>
										<TouchableOpacity
											style={ styles.m10 }
											onPress={ () => setShowDropDown(!showDropDown) }>
											<Icon
												type={ 'Ionicons' }
												name={ 'ios-search' }
												size={ 18 }
												color={ 'grey' }
											/>
										</TouchableOpacity>
									</View>
									{showDropDown && (
										<View style={ styles.dropdownContainer }>
											<ScrollView
												automaticallyAdjustContentInsets={ false }
												contentContainerStyle={ styles.flexGrow }
												showsVerticalScrollIndicator={ false }>
												{filteredPharmacies &&
													filteredPharmacies.map((item, index) => {
														return (
															<TouchableOpacity
																row
																key={ `index-${index}` }
																style={ styles.dropdownContent }
																onPress={ () => selectPharmacy(item) }>
																<Text>{item}</Text>
															</TouchableOpacity>
														);
													})}
											</ScrollView>
										</View>
									)}
								</View>
							</View>
							<TouchableOpacity style={ [ styles.buttonContainer, styles.mv10 ] }>
								<Text
									s={ 16 }
									lh={ 16 }
									w={ 'bold' }
									c={ 'white' }
									style={ styles.upperCase }>
									Send
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		);
	};

	const verifyPinModal = () => {
		return (
			<Modal transparent={ true } visible={ showVerifyPinModal }>
				<View style={ styles.modalContainer }>
					<View style={ styles.modalContent }>
						<TouchableOpacity
							style={ styles.crossButton }
							onPress={ () => [
								setShowVerifyPinModal(!showVerifyPinModal),
								navigation.goBack()
							] }>
							<Icon
								type={ 'MaterialCommunityIcons' }
								name={ 'close' }
								color={ '#767676' }
								size={ 22 }
							/>
						</TouchableOpacity>
						<>
							<View row center>
								<Text s={ 18 } w={ 'bold' } lh={ 16 } style={ styles.p10 }>
									Enter Pin Number
								</Text>
							</View>
							<View row center style={ styles.pb10 }>
								<Text s={ 15 } lh={ 16 }>
									Enter the Pin number sent to your emailId
								</Text>
							</View>
							<View row center style={ styles.searchContent }>
								<TextInput
									style={ [ styles.p10, styles.flex ] }
									value={ pinValue }
									keyboardType={ 'number-pad' }
									onChangeText={ value => setPinValue(value) }
								/>
							</View>
							{showError && (
								<Text center c={ 'red' } style={ [ styles.upperCase, styles.mv10 ] }>
									Enter a valid pin
								</Text>
							)}
							<TouchableOpacity style={ styles.okButton } onPress={ submitPin }>
								<Text
									s={ 16 }
									lh={ 16 }
									w={ 'bold' }
									c={ 'white' }
									center
									style={ styles.upperCase }>
									OK
								</Text>
							</TouchableOpacity>
						</>
					</View>
				</View>
			</Modal>
		);
	};

	const doctorResponse = () => {
		const docData =
			Object.keys(data).length !== 0 &&
			data.question_info &&
			data.question_info[0];
		return (
			<View style={ styles.doctorResponseContainer }>
				<View row jC={ 'center' } style={ styles.avatarContainer }>
					<View center style={ styles.doctorImage }>
						<Image
							style={ styles.doctorImage }
							source={
								docData?.doctor_pic?.profile_pic
									? { uri: docData?.doctor_pic?.profile_pic }
									: require('../../assets/profile.png')
							}
						/>
					</View>
					<View style={ styles.doctorNameContainer }>
						<View jC={ 'space-between' } aI={ 'flex-start' }>
							<Text s={ 14 } lh={ 26 } w={ '500' }>
								Dr. {docData.doctor_name}
							</Text>
							<Text s={ 14 } lh={ 16 } w={ '500' } c={ '#B8B8B8' }>
								Dentist , {docData.city}, Lic no : {docData.license_no}
							</Text>
							<Text s={ 14 } lh={ 26 } w={ '500' } c={ '#B8B8B8' }>
								{docData && docData.responded_on && (
									<Text style={ styles.addressText }>
										Answered {moment(docData.responded_on).fromNow()}
									</Text>
								)}
							</Text>
						</View>
					</View>
				</View>
				<View style={ { ...styles.mv10, ...styles.ph20 } }>
					<Text s={ 14 } lh={ 20 } w={ '500' } c={ '#4A4A4A' }>
						{docData.response_text ? docData.response_text : 'N/A'}
					</Text>
					<View style={ styles.mv10 }>
						<Text s={ 14 } lh={ 30 } w={ 'bold' }>
							Recommended treatment:
						</Text>
						<Text s={ 14 } lh={ 16 } c={ '#4A4A4A' }>
							{docData.recommended_treatment
								? docData.recommended_treatment
								: '-'}
						</Text>
					</View>
					<View style={ styles.mv10 }>
						<Text s={ 14 } lh={ 30 } w={ 'bold' }>
							Recommended follow up:
						</Text>
						<Text s={ 14 } lh={ 16 } c={ '#4A4A4A' }>
							{docData.followup ? docData.followup : '-'}
						</Text>
					</View>
					<View style={ styles.mv10 }>
						<Text s={ 14 } lh={ 30 } w={ 'bold' }>
							Recommended medications:
						</Text>
						<Text s={ 14 } lh={ 16 } c={ '#4A4A4A' }>
							{docData.recommended_medications
								? docData.recommended_medications
								: '-'}
						</Text>
						{/* <Text s={ 14 } lh={ 18 } c={ '#4A4A4A' } style={ styles.pV3 }>
							1. Medications are not to be taken in empty stomach unless
							specifically instructed.
						</Text>
						<Text s={ 14 } lh={ 20 } c={ '#4A4A4A' } style={ styles.pV3 }>
							2. Medications are not to be taken in empty stomach unless
							specifically instructed.
						</Text>
						<Text s={ 14 } lh={ 20 } c={ '#4A4A4A' } style={ styles.pV3 }>
							3. Medications are not to be taken in empty stomach unless
							specifically instructed.
						</Text> */}
					</View>
					<View style={ styles.mv10 }>
						<Text s={ 14 } lh={ 30 } w={ 'bold' }>
							Doctor Opinion:
						</Text>
						<Text s={ 14 } lh={ 16 } c={ '#4A4A4A' }>
							{docData.doctor_opinion ? docData.doctor_opinion : '-'}
						</Text>
					</View>
				</View>
			</View>
		);
	};

	return (
		<ScrollView
			showsVerticalScrollIndicator={ false }
			style={ styles.scrollViewContainer }>
			<View row jC={ 'center' } style={ { ...styles.ph20, ...styles.mv20 } }>
				<View center style={ styles.container }>
					<Icon type={ 'Ionicons' } name={ 'ios-chatbubbles' } size={ 40 } />
				</View>
				<View style={ styles.content }>
					<View row jC={ 'space-between' } aI={ 'flex-start' }>
						<Text s={ 14 } lh={ 16 } w={ '500' }>
							{data.title ? data.title : ''}
						</Text>
					</View>
					<View row aI={ 'flex-start' } style={ styles.mv10 }>
						{data.patient_pic !== undefined && data.patient_pic !== null ? (
							data.patient_pic.profile_pic !== '' &&
							data.patient_pic.profile_pic !== null &&
							data.patient_pic.profile_pic !== undefined ? (
								<Image
									style={ styles.profileImage }
									source={ { uri: data.patient_pic.profile_pic } }
								/>
							) : (
								<Image
									style={ styles.profileImage }
									source={ require('../../assets/profile.png') }
								/>
							)
						) : (
							<Image
								style={ styles.profileImage }
								source={ require('../../assets/profile.png') }
							/>
						)}
						<Text s={ 14 } lh={ 16 } c={ '#B8B8B8' } style={ styles.ph10 }>
							{data.patient_name ? data.patient_name : ''}
						</Text>
						<Text s={ 14 } lh={ 16 } c={ '#B8B8B8' } style={ styles.ph10 }>
							{data.question_asked_on
								? moment(data.question_asked_on).format('MMM DD, YYYY')
								: ''}
						</Text>
					</View>
				</View>
			</View>
			{patientQuestions()}
			{data && (data.answered || data.rejected) && doctorResponse()}
			{data &&
				(data.answered || data.rejected) &&
				user &&
				user.user_type !== 'DOCTOR' &&
				actionButtons()}
			{isImage ? (
				<ImagePreviewer
					uri={ uri }
					enablePreview={ enablePreview }
					handlePreview={ handlePreview }
				/>
			) : (
				<VideoPreviewer
					uri={ uri }
					enablePreview={ enablePreview }
					handlePreview={ handlePreview }
				/>
			)}
			{user && user.user_type === 'DOCTOR' && verifyPinModal()}
		</ScrollView>
	);
}

const mapStateToProps = state => {
	return {
		user: state.user.user
	};
};

const mapDispatchToProps = dispatch => ({
	verifyPin: (data, onSuccess, onFailure) =>
		dispatch(verifyPin(data, onSuccess, onFailure))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DentistResponse);
