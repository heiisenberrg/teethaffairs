import React, { useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	SafeAreaView,
	ScrollView,
	Modal
} from 'react-native';

import styles from './styles';
import globalStyles from '../../globalStyles';
import {
	getDeleteNote,
	setDeleteNote,
	getUserNote,
	setUserNote
} from '../../state/actions/journal';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import Icon from '../global/Icon';
import View1 from '../global/View';

var date = new Date().getDate();
var month = new Date();
var year = new Date().getFullYear();
const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

function UserRemoteConsultationRequest(props) {
	const { route, navigation, getDeleteNote } = props;
	const [ isDeleteModalVisible, setIsDeleteModalVisible ] = useState(false);

	const { previewNote } = route.params;

	const handleDeleteNote = noteId => {
		getDeleteNote(noteId, onGetDeleteNoteSuccess, onGetDeleteNoteFailure);
	};

	const onGetDeleteNoteSuccess = () => {
		setIsDeleteModalVisible(false);
		navigation.navigate('AddDentalNote');
	};
	const onGetDeleteNoteFailure = () => {
		alert('Something went wrong');
	};

	return (
		<SafeAreaView>
			<ScrollView
				contentContainerStyle={ styles.container }
				showsVerticalScrollIndicator={ false }>
				<View>
					<View style={ styles.profileContainer }>
						<View style={ styles.profileWrapper }>
							<View style={ styles.title }>
								<View1 style={ styles.circleWrapper }>
									<Icon type={ 'Ionicons' } name={ 'ios-chatbubbles' } size={ 40 } />
								</View1>
								<View>
									<Text style={ styles.descriptionText }>
										{/* {previewNote.title} */}i have a swelling that is
										painful, started last night.
									</Text>
									<View style={ styles.miniProfileImageWrap }>
										<View style={ styles.miniProfileImageWrap1 }>
											<Image
												source={ require('../../assets/profile-pic.png') }
												style={ styles.image3 }
											/>
											<Text style={ styles.dateText }>virat kohli</Text>
										</View>
										<View style={ styles.miniProfileImageWrap2 }>
											<Image
												source={ require('../../assets/time.png') }
												style={ styles.timeImage }
											/>
											<Text style={ styles.dateText }>
												{date}&nbsp;{monthNames[month.getMonth()]}
												&nbsp;{year}
											</Text>
										</View>
									</View>
								</View>
							</View>
							<Text style={ styles.queryDetailText }>patient details</Text>
							<View style={ styles.tableStyle }>
								<View style={ styles.row }>
									<Text style={ styles.headerText }>name:</Text>
									<Text style={ styles.patientText }>john deo</Text>
								</View>
								<View style={ styles.row }>
									<Text style={ styles.headerText }>age:</Text>
									<Text style={ styles.patientText }>45</Text>
								</View>
								<View style={ styles.row }>
									<Text style={ styles.headerText }>weight:</Text>
									<Text style={ styles.patientText }>N/A</Text>
								</View>
								<View style={ styles.row }>
									<Text style={ styles.headerText }>weight</Text>
									<Text style={ styles.patientText }>58</Text>
								</View>
							</View>
							<View style={ styles.tableStyle }>
								<View style={ styles.row }>
									<Text style={ styles.headerText }>allergies:</Text>
									<Text style={ styles.patientText }>penicillin</Text>
									<Text style={ styles.patientText }>amaxicillin</Text>
									<Text style={ styles.patientText }>tetracycline</Text>
								</View>
								<View style={ styles.row }>
									<Text style={ styles.headerText }>medical conditions:</Text>
									<Text style={ styles.patientText }>none</Text>
								</View>
								<View style={ styles.row }>
									<Text style={ styles.headerText }>taking any medications:</Text>
									<Text style={ styles.patientText }>penicillin</Text>
									<Text style={ styles.patientText }>amaxicillin</Text>
									<Text style={ styles.patientText }>tetracycline</Text>
								</View>
							</View>
							<View />

							<Text style={ styles.queryDetailText }>attachments</Text>

							<View style={ styles.imageContainer }>
								{/* {previewNote.media && previewNote.media.length > 0 && previewNote.media.map((data, index) => {
											return (
												<View key={ index }
												style={ styles.imagePreview1 }>
													<Image source={ { uri: data.media }  } style={ styles.image } />
												</View>
											);
										})} */}
							</View>
							<Text style={ styles.queryDetailText }>details</Text>

							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>Question</Text>
								{/* {previewNote.place_of_issue !== '' ? (
											<Text style={ styles.patientDetails }>
												{previewNote.place_of_issue}
											</Text>
										) : ( */}
								<Text style={ styles.patientDetails }>NA</Text>
								{/* )} */}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>Description</Text>
								{/* {previewNote.place_of_issue !== '' ? (
											<Text style={ styles.patientDetails }>
												{previewNote.place_of_issue}
											</Text>
										) : ( */}
								<Text style={ styles.patientDetails }>NA</Text>
								{/* )} */}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>Where is the issue ?</Text>
								{/* {previewNote.place_of_issue !== '' ? (
											<Text style={ styles.patientDetails }>
												{previewNote.place_of_issue}
											</Text>
										) : ( */}
								<Text style={ styles.patientDetails }>NA</Text>
								{/* )} */}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>Where side ?</Text>
								{/* <Text style={ styles.patientDetails } /> */}
								{/* {previewNote.side_of_issue !== '' ? (
											<Text style={ styles.patientDetails }>
												{previewNote.side_of_issue}
											</Text>
										) : ( */}
								<Text style={ styles.patientDetails }>NA</Text>
								{/* )} */}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>Pain level</Text>
								{/* {previewNote.pain_level !== 0 ? (
											<Text style={ styles.patientDetails }>
												{previewNote.pain_level}/ 10
											</Text>
										) : ( */}
								<Text style={ styles.patientDetails }>NA</Text>
								{/* )} */}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>Pain Type</Text>
								{/* {previewNote.pain_level !== 0 ? (
											<Text style={ styles.patientDetails }>
												{previewNote.pain_level}/ 10
											</Text>
										) : ( */}
								<Text style={ styles.patientDetails }>NA</Text>
								{/* )} */}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>Sensitivity to temperature</Text>
								{/* {previewNote.sensivity_temperature !== '' ? (
											<Text style={ styles.patientDetails }>
												{previewNote.sensivity_temperature}
											</Text>
										) : ( */}
								<Text style={ styles.patientDetails }>NA</Text>
								{/* )} */}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>
									Are you able to identify the exact tooth that has the issue ?
								</Text>
								{/* {previewNote.tooth_issue_identified ? (
											<Text style={ styles.patientDetails }>Yes</Text>
										) : ( */}
								<Text style={ styles.patientDetails }>No</Text>
								{/* )} */}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>Onset</Text>
								{/* {previewNote.onset !== '' ? (
											<Text style={ styles.patientDetails }>
												{previewNote.onset}
											</Text>
										) : ( */}
								<Text style={ styles.patientDetails }>NA</Text>
								{/* )} */}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>When did the issue start?</Text>
								{/* {previewNote.issue_start_date !== '' ? (
											<Text style={ styles.patientDetails }>
												{previewNote.issue_start_date}
											</Text>
										) : ( */}
								<Text style={ styles.patientDetails }>NA</Text>
								{/* )} */}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>Swelling size </Text>
								{/* {previewNote.swelling_size !== '' ? (
											<Text style={ styles.patientDetails }>
												{previewNote.swelling_size}
											</Text>
										) : ( */}
								<Text style={ styles.patientDetails }>NA</Text>
								{/* )} */}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>Bleeding </Text>
								{/* {previewNote.bleeding ? (
											<Text style={ styles.patientDetails }>Yes</Text>
										) : ( */}
								<Text style={ styles.patientDetails }>No</Text>
								{/* )} */}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>Presence of pus ?</Text>
								{/* {previewNote.pus_presence ? (
											<Text style={ styles.patientDetails }>Yes</Text>
										) : ( */}
								<Text style={ styles.patientDetails }>No</Text>
								{/* )} */}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>Loose tooth ?</Text>
								{/* {previewNote.tooth_loss !== '' ? (
											<Text style={ styles.patientDetails }>
												{previewNote.tooth_loss}
											</Text>
										) : ( */}
								<Text style={ styles.patientDetails }>NA</Text>
								{/* )} */}
							</View>
							<View style={ styles.remoteCloseButton }>
								<TouchableOpacity
									style={ globalStyles.primaryButton }
									onPress={ () => navigation.navigate('DentalHistory') }>
									<Text style={ globalStyles.buttonText }>close</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
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
									source={ require('../../assets/cross.png') }
									style={ styles.closeIcon1 }
								/>
							</TouchableOpacity>

							<Image
								source={ require('../../assets/bin-icon.png') }
								style={ styles.successIcon }
							/>
							<Text style={ styles.successModalText1 }>
								Are you sure want to delete the items
							</Text>
						</View>
						<View style={ styles.modalButtonContainer }>
							<TouchableOpacity
								style={ styles.continueButton }
								onPress={ () => handleDeleteNote(previewNote.id) }>
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
		</SafeAreaView>
	);
}

function mapStateToProps(state) {
	return {
		resp: state.journal
	};
}

export default connect(
	mapStateToProps,
	{ getUserNote, setUserNote, getDeleteNote, setDeleteNote }
)(UserRemoteConsultationRequest);
