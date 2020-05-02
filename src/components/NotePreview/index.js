import React, { useState, useEffect } from 'react';
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
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

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

function NotePreview(props) {
	const { route, navigation, getDeleteNote } = props;
	const [ isDeleteModalVisible, setIsDeleteModalVisible ] = useState(false);

	const { previewNote } = route.params;

	const handleDeleteNote = (noteId) => {
		getDeleteNote(noteId, onGetDeleteNoteSuccess, onGetDeleteNoteFailure);
	};

	const onGetDeleteNoteSuccess = () => {
		setIsDeleteModalVisible(false);
		navigation.navigate('AddDentalNote');
	};
	const onGetDeleteNoteFailure = () => {
		alert('Something went wrong');
	};

	const handleRemote = (id) => {
		navigation.navigate('RemoteConsultation', { id });
	};

	const handleEdit = () => {
		navigation.navigate('AddQuestion', { data: previewNote, updateNotes: true });
	};

	useEffect(function () {
		navigation.setOptions({
			title: previewNote.reference_name
		});
	}, []);

	return (
		<SafeAreaView>
			<ScrollView
				contentContainerStyle={ styles.container }
				showsVerticalScrollIndicator={ false }>
				<View>
					<View style={ styles.remoteButtonWrap }>
						<TouchableOpacity
							style={ globalStyles.secondaryButton }
							onPress={ () => handleRemote(previewNote.id) }>
							<Text style={ globalStyles.buttonText }>
								start remote consultation
							</Text>
						</TouchableOpacity>
					</View>
					<View style={ styles.contentWrapText }>
						<Text style={ styles.contentText }>
							Remote consultation fees $20.00 Prescription request fee $10.00.
							(Option to request RX will be provided) Note: You will NOT be
							changed for remote consultation until provider responds. If the
							doctor recommends Rx, you will have the option to accept or deny
						</Text>
					</View>
					<View style={ styles.profileContainer }>
						<View style={ styles.profileWrapper }>
							<View style={ styles.title }>
								<View style={ styles.medicareWrap }>
									<Image
										source={ require('../../assets/medicare1.png') }
										style={ styles.medicare }
									/>
								</View>
								<View>
									<Text style={ styles.descriptionText }>
										{previewNote.title}
									</Text>
									<View style={ styles.miniProfileImageWrap }>
										<View style={ styles.miniProfileImageWrap1 }>
											<Image
												source={ require('../../assets/profile-pic.png') }
												style={ styles.image3 }
											/>
											<Text style={ styles.dateText }>You</Text>
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
								<View style={ styles.deleteEditLogoContainer }>
									<TouchableOpacity
										style={ styles.editWrap }
										onPress={ handleEdit }>
										<AntDesignIcon
											style={ styles.deleteIcon }
											name="edit"
											size={ 15 }
											color="white"
										/>
									</TouchableOpacity>
									<TouchableOpacity
										style={ styles.deleteWrap }
										onPress={ () => setIsDeleteModalVisible(true) }>
										<Image
											source={ require('../../assets/delete-white.png') }
											style={ styles.deleteIcon }
										/>
									</TouchableOpacity>
								</View>
							</View>
							<Text style={ styles.noteText }>{previewNote.description}</Text>
							<View style={ styles.imageContainer }>
								{previewNote.media &&
									previewNote.media.length > 0 &&
									previewNote.media.map((data, index) => {
										return (
											<View key={ index } style={ styles.imagePreview1 }>
												<Image
													source={ { uri: data.media } }
													style={ styles.image }
												/>
											</View>
										);
									})}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>Where is the issue ?</Text>
								{previewNote.place_of_issue !== '' ? (
									<Text style={ styles.patientDetails }>
										{previewNote.place_of_issue}
									</Text>
								) : (
									<Text style={ styles.patientDetails }>NA</Text>
								)}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>Where side ?</Text>
								<Text style={ styles.patientDetails } />
								{previewNote.side_of_issue !== '' ? (
									<Text style={ styles.patientDetails }>
										{previewNote.side_of_issue}
									</Text>
								) : (
									<Text style={ styles.patientDetails }>NA</Text>
								)}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>Pain level</Text>
								{previewNote.pain_level !== 0 ? (
									<Text style={ styles.patientDetails }>
										{previewNote.pain_level}/ 10
									</Text>
								) : (
									<Text style={ styles.patientDetails }>NA</Text>
								)}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>Sensitivity to temperature</Text>
								{previewNote.sensivity_temperature !== '' ? (
									<Text style={ styles.patientDetails }>
										{previewNote.sensivity_temperature}
									</Text>
								) : (
									<Text style={ styles.patientDetails }>NA</Text>
								)}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>
									Are you able to identify the exact tooth that has the issue ?
								</Text>
								{previewNote.tooth_issue_identified ? (
									<Text style={ styles.patientDetails }>Yes</Text>
								) : (
									<Text style={ styles.patientDetails }>No</Text>
								)}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>Onset</Text>
								{previewNote.onset !== '' ? (
									<Text style={ styles.patientDetails }>{previewNote.onset}</Text>
								) : (
									<Text style={ styles.patientDetails }>NA</Text>
								)}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>When did the issue start?</Text>
								{previewNote.issue_start_date !== '' ? (
									<Text style={ styles.patientDetails }>
										{previewNote.issue_start_date}
									</Text>
								) : (
									<Text style={ styles.patientDetails }>NA</Text>
								)}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>Swelling size </Text>
								{previewNote.swelling_size !== '' ? (
									<Text style={ styles.patientDetails }>
										{previewNote.swelling_size}
									</Text>
								) : (
									<Text style={ styles.patientDetails }>NA</Text>
								)}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>Bleeding </Text>
								{previewNote.bleeding ? (
									<Text style={ styles.patientDetails }>Yes</Text>
								) : (
									<Text style={ styles.patientDetails }>No</Text>
								)}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>Presence of pus ?</Text>
								{previewNote.pus_presence ? (
									<Text style={ styles.patientDetails }>Yes</Text>
								) : (
									<Text style={ styles.patientDetails }>No</Text>
								)}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>Loose tooth ?</Text>
								{previewNote.tooth_loss !== '' ? (
									<Text style={ styles.patientDetails }>
										{previewNote.tooth_loss}
									</Text>
								) : (
									<Text style={ styles.patientDetails }>NA</Text>
								)}
							</View>
							<View style={ styles.queryWrapper }>
								<Text style={ styles.queryText }>
									Prior history if any or other information
								</Text>
								{previewNote.prior_history !== '' ? (
									<Text style={ styles.patientDetails }>
										{previewNote.prior_history}
									</Text>
								) : (
									<Text style={ styles.patientDetails }>NA</Text>
								)}
							</View>
							<View style={ styles.remoteCloseButton }>
								<TouchableOpacity
									style={ globalStyles.primaryButton }
									onPress={ () => navigation.navigate('AddDentalNote') }>
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

export default connect(mapStateToProps, {
	getUserNote,
	setUserNote,
	getDeleteNote,
	setDeleteNote
})(NotePreview);
