import React, { useState, useEffect } from 'react';
import {
	Image,
	FlatList,
	ScrollView,
	TouchableOpacity,
	TextInput,
	Modal
} from 'react-native';
import Toast from '../../components/Toast';
import FlashMessage from '../../components/global/FlashMessage';
import View from '../global/View';
import Text from '../global/Text';
import Icon from '../global/Icon';
import styles from './style';
import moment from 'moment';
import { connect } from 'react-redux';
import {
	answerQuestion,
	rejectQuestion,
	verifyPin
} from '../../state/actions/doctor';
import ImagePreviewer from '../../components/global/ImagePreviewer';
import { CommonActions } from '@react-navigation/native';
import Video from 'react-native-video';
import VideoPreviewer from '../../components/global/VideoPreviewer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import remoteStyles from '../UserRemoteConsultation/styles';

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

const followUp = [
	'Immediate office visit is necessary (its an emergency, nothing can be more important than addressing this issue immediately, if after hours go to a hospital emergency department)',
	'Set up an office visit as soon as possible (Don’t wait until it becomes an emergency)',
	'Follow up in person if issue does not resolve in a few days.',
	'Schedule an office when convenient within 2-3 months, do not wait till issue gets worse.'
];

const rejectReasons = [
	'Unclear questions',
	'Too complex/Beyond scope for Remote Consultation'
];

var medications_array = [];

function RemoteConsultationRequest(props) {
	const { route, navigation, answerQuestion, rejectQuestion, verifyPin } = props;
	const [ isResponse, setIsResponse ] = useState(false);
	const [ isQuestionVisible, setIsQuestionVisible ] = useState(true);
	const [ showModal, setShowModal ] = useState(false);
	const [ modalContent, setModalContent ] = useState('pin');
	const [ pinValue, setPinValue ] = useState('');
	const [ rejectReason, setRejectReason ] = useState('');
	const [ data, setData ] = useState({});
	const [ selectedFollowup, setSelectedFollowup ] = useState('');
	const [ opinion, setOpinion ] = useState('');
	const [ treatment, setTreatment ] = useState('');
	const [ showError, setShowError ] = useState(false);
	const [ uri, setUri ] = useState('');
	const [ enablePreview, setEnablePreview ] = useState(false);
	const [ showToast, setShowToast ] = useState(false);
	const [ medicationsList, setMedicationsList ] = useState([]);
	const [ textInputHolder1, setTextInputHolder1 ] = useState('');
	const [ isImage, setIsImage ] = useState(true);

	let scrollView;

	useEffect(() => {
		setShowModal(!showModal);
		if (route && route.params && Object.keys(route.params).length > 0) {
			setData(route.params.data);
		}
	}, []);

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
			setShowModal(!showModal);
			setModalContent('reject');
		}
	}

	const submit = type => {
		if (!isResponse) {
			if (type === 'answer') {
				setIsResponse(!isResponse);
				setIsQuestionVisible(!isQuestionVisible);
				scrollView.scrollTo({ x: 0, y: 0, animated: true });
			} else if (type === 'reject') {
				setShowModal(!showModal);
			} else if (type === 'confirm') {
				let rejectData = {
					resp_status: false,
					response_text: rejectReasons[rejectReason]
				};
				if (rejectReason === '') {
					FlashMessage.message(
						'Alert',
						'Please choose any one of the options.',
						'#ff4444'
					);
				} else {
					rejectQuestion({ data: rejectData, id: data.id, navigation });
				}
			}
		} else {
			if (
				selectedFollowup !== '' &&
				opinion &&
				treatment &&
				medicationsList.length > 0
			) {
				if (type === 'answer') {
					medications_array = [];
					let answerData = {
						resp_status: true,
						response_text: 'Follow the treatment',
						doctor_opinion: opinion,
						recommended_treatment: treatment,
						recommended_followup: followUp[selectedFollowup],
						recommended_medications: medicationsList.join(' ')
					};
					answerQuestion({
						data: answerData,
						id: data.id,
						onSuccess: () => onAnswerSuccess()
					});
				}
			} else {
				FlashMessage.message('Alert', 'Please fill up all fields', 'red');
			}
		}
	};

	const onAnswerSuccess = () => {
		setShowToast(!showToast);
	};

	const navigateToListScreen = () => {
		setShowToast(!showToast);
		navigation.popToTop();
		navigation.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [ { name: 'AppTabs', key: 'Home' } ]
			})
		);
		navigation.navigate('Home');
	};

	const handlePreview = data => {
		if (data === 'image') {
			setIsImage(true);
		} else {
			setIsImage(false);
		}
		setEnablePreview(!enablePreview);
	};

	const medicationHandler = () => {
		if (textInputHolder1 !== '') {
			medications_array.push(textInputHolder1);
			setMedicationsList(medications_array);
			setTextInputHolder1('');
		}
	};

	const onRemoveMedicationsHandler = remove_item => {
		medications_array = medications_array.filter(data =>
			(data !== remove_item ? data : '')
		);
		setMedicationsList(medications_array);
		setTextInputHolder1('');
	};

	const patientQuestions = () => {
		return (
			<>
				{isResponse && (
					<View style={ styles.mv10 }>
						<View row jC={ 'space-between' }>
							<Text
								s={ 14 }
								lh={ 16 }
								w={ 'bold' }
								c={ '#108F79' }
								style={ styles.upperCase }>
								Question from patient
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
			</>
		);
	};

	const doctorResponse = () => {
		return (
			<View style={ styles.mv10 }>
				<ScrollView>
					<KeyboardAwareScrollView showsVerticalScrollIndicator={ false }>
						<Text
							s={ 14 }
							lh={ 16 }
							w={ 'bold' }
							c={ '#108F79' }
							style={ { ...styles.mv5, ...styles.upperCase } }>
							Response from doctor
						</Text>
						<View style={ styles.mv10 }>
							<Text s={ 14 } lh={ 20 } w={ 'bold' } style={ styles.mv5 }>
								Differential diagnosis/ Opinion/ Issue
							</Text>
							<View style={ styles.textInputContainer }>
								<TextInput
									numberOfLines={ 4 }
									multiline={ true }
									textAlignVertical="top"
									value={ opinion }
									style={ [ styles.p10, styles.flex ] }
									onChangeText={ value => setOpinion(value) }
								/>
							</View>
						</View>
						<View style={ styles.mv10 }>
							<Text s={ 14 } lh={ 20 } w={ 'bold' } style={ styles.mv5 }>
								Recommended treatment / Temporary home care
							</Text>
							<View style={ styles.textInputContainer }>
								<TextInput
									numberOfLines={ 4 }
									multiline={ true }
									textAlignVertical="top"
									value={ treatment }
									style={ [ styles.p10, styles.flex ] }
									onChangeText={ value => setTreatment(value) }
								/>
							</View>
						</View>
						<View style={ styles.mv10 }>
							<Text s={ 14 } lh={ 16 } w={ 'bold' } style={ styles.mv5 }>
								Recommended follow up
							</Text>
							<View style={ styles.mv10 }>
								{followUp &&
									followUp.map((data, index) => {
										return (
											<View row key={ `followup-${index}` } style={ styles.mv10 }>
												<TouchableOpacity
													style={ {
														...styles.followUpContainer,
														...{
															borderColor: '#CAC7C7',
															backgroundColor:
																selectedFollowup === index ? '#00C57D' : 'white'
														}
													} }
													onPress={ () => setSelectedFollowup(index) }>
													<Icon
														type={ 'MaterialCommunityIcons' }
														name={ 'check' }
														color={ 'white' }
														size={ 21 }
													/>
												</TouchableOpacity>
												<Text s={ 13 } lh={ 18 } style={ styles.flex }>
													{data}
												</Text>
											</View>
										);
									})}
							</View>
						</View>
						<View style={ styles.mv10 }>
							<Text s={ 14 } lh={ 16 } w={ 'bold' } style={ styles.mv5 }>
								Recommended medications
							</Text>
							<View style={ remoteStyles.allergiesBox }>
								<View style={ remoteStyles.switchWrapper } />

								<View style={ remoteStyles.MainContainer }>
									<TextInput
										placeholder="Enter Value Here"
										multiline
										onChangeText={ data => setTextInputHolder1(data) }
										value={ textInputHolder1 }
										style={ remoteStyles.textInputStyle }
										underlineColorAndroid="transparent"
									/>
									<TouchableOpacity
										onPress={ medicationHandler }
										activeOpacity={ 0.7 }
										style={ remoteStyles.button }>
										<Image
											style={ remoteStyles.roundButton }
											source={ require('../../assets/round-plus.png') }
										/>
									</TouchableOpacity>
								</View>
								<View style={ remoteStyles.dummy1 }>
									{medicationsList.map((data, index) => {
										return (
											<View
												style={ remoteStyles.enteredAllergiesBox }
												key={ index }>
												<Text key={ index } style={ remoteStyles.enteredAllergies }>
													{data}
												</Text>
												<TouchableOpacity
													onPress={ () => onRemoveMedicationsHandler(data) }>
													<Text style={ remoteStyles.crossText1 }>X</Text>
												</TouchableOpacity>
											</View>
										);
									})}
								</View>
								<Text style={ remoteStyles.infoText }>
									Type none if no medications
								</Text>
							</View>
							<View row style={ styles.mv10 }>
								<View style={ styles.flex } />
							</View>
						</View>
					</KeyboardAwareScrollView>
				</ScrollView>
			</View>
		);
	};

	const patientDetails = () => {
		return (
			<View style={ styles.mv10 }>
				<Text
					s={ 14 }
					lh={ 16 }
					w={ 'bold' }
					c={ '#108F79' }
					style={ { ...styles.mv10, ...styles.upperCase } }>
					Patient details
				</Text>
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
					numColumns={ 4 }
					data={ data.media }
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
											key={ `${item}-${index}` }
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
		return (
			<View style={ styles.mb20 }>
				<TouchableOpacity
					style={ [ styles.buttonContainer, styles.mv10 ] }
					onPress={ () => submit('answer') }>
					<Text s={ 16 } lh={ 16 } w={ 'bold' } c={ 'white' } style={ styles.upperCase }>
						Answer
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={ {
						...styles.buttonContainer,
						...{
							display: !isResponse ? 'flex' : 'none',
							backgroundColor: '#00C57D'
						},
						...styles.mb20
					} }
					onPress={ () => submit('reject') }>
					<Text s={ 16 } lh={ 16 } w={ 'bold' } c={ 'white' } style={ styles.upperCase }>
						Reject
					</Text>
				</TouchableOpacity>
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
							onPress={ () =>
								(modalContent === 'pin'
									? [ setShowModal(!showModal), navigation.goBack() ]
									: setShowModal(!showModal))
							}>
							<Icon
								type={ 'MaterialCommunityIcons' }
								name={ 'close' }
								color={ '#767676' }
								size={ 22 }
							/>
						</TouchableOpacity>
						{modalContent === 'pin' && (
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
									<Text
										center
										c={ 'red' }
										style={ [ styles.upperCase, styles.mv10 ] }>
										Enter a valid pin
									</Text>
								)}
								<TouchableOpacity
									style={ styles.okButton }
									onPress={ () => submitPin() }>
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
						)}
						{modalContent !== 'pin' && (
							<>
								<View row center>
									<Text
										s={ 18 }
										w={ 'bold' }
										lh={ 16 }
										style={ { ...styles.upperCase, ...styles.p10 } }
										c={ '#108F79' }>
										Reason for Reject
									</Text>
								</View>
								<View style={ styles.mv10 }>
									{rejectReasons &&
										rejectReasons.map((data, index) => {
											return (
												<View
													key={ `rejectedreasons-${index}` }
													row
													style={ styles.mv10 }>
													<TouchableOpacity
														style={ styles.radioContainer }
														onPress={ () => setRejectReason(index) }>
														<View
															style={ {
																...styles.radioGroup,
																...{
																	backgroundColor:
																		rejectReason === index ? '#33D197' : 'white'
																}
															} }
														/>
													</TouchableOpacity>
													<Text>{data}</Text>
												</View>
											);
										})}
								</View>
								<View row center>
									<Text>Patient will not be charged</Text>
								</View>
								<TouchableOpacity
									style={ [ styles.buttonContainer, styles.mv10 ] }
									onPress={ () => submit('confirm') }>
									<Text
										s={ 16 }
										lh={ 16 }
										w={ 'bold' }
										c={ 'white' }
										style={ styles.upperCase }>
										Confirm
									</Text>
								</TouchableOpacity>
							</>
						)}
					</View>
				</View>
			</Modal>
		);
	};

	const toast = () => {
		return (
			<Toast
				title="Success"
				message="Successfully submitted the answer"
				showModal={ showToast }
				handleSubmit={ navigateToListScreen }
				showClose={ false }
				successButtontext="Continue"
			/>
		);
	};

	return (
		<ScrollView
			showsVerticalScrollIndicator={ false }
			style={ styles.scrollViewContainer }
			ref={ ref => {
				scrollView = ref;
			} }>
			{!isResponse && (
				<View row jC={ 'center' }>
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
							<Image
								style={ styles.profileImage }
								source={ require('../../assets/profile.png') }
							/>
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
			)}
			{patientQuestions()}
			{isResponse && doctorResponse()}
			{actionButtons()}
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
			{toast()}
		</ScrollView>
	);
}

const mapDispatchToProps = dispatch => ({
	answerQuestion: (data, onSuccess, onFailure) =>
		dispatch(answerQuestion(data, onSuccess, onFailure)),
	rejectQuestion: (data, onSuccess, onFailure) =>
		dispatch(rejectQuestion(data, onSuccess, onFailure)),
	verifyPin: (data, onSuccess, onFailure) =>
		dispatch(verifyPin(data, onSuccess, onFailure))
});

export default connect(
	null,
	mapDispatchToProps
)(RemoteConsultationRequest);
