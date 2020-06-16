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
	const [ isDeleteModalVisible, setIsDeleteModalVisible ] = useState(false);

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
							<View style={ styles.doctorResponseWrapper }>
								<View style={ styles.doctorDetails }>
									<View style={ styles.doctorProfile }>
										<Image
											style={ styles.doctorPic }
											source={ require('../../assets/profile.png') }
										/>
									</View>
									<View style={ styles.doctorInfo }>
										<Text style={ styles.doctorNameText }>Dr. bhunaa</Text>
										<Text style={ styles.addressText }>
											Dentist , New York, Lic no: 2555-6564-2564-154
										</Text>
										<Text style={ styles.addressText }>Answered 9 hours ago</Text>
									</View>
								</View>
								<View style={ styles.queryWrapper }>
									{/* {previewNote.place_of_issue !== '' ? (
											<Text style={ styles.patientDetails }>
												{previewNote.place_of_issue}
											</Text>
										) : ( */}
									<Text style={ styles.patientDetails }>
										You have infected and abscessed tooth. This can quickly turn
										into an emergency situation.
									</Text>
									{/* )} */}
								</View>
								<View style={ styles.queryWrapper }>
									<Text style={ styles.queryText }>Recommended treatment:</Text>
									{/* {previewNote.place_of_issue !== '' ? (
											<Text style={ styles.patientDetails }>
												{previewNote.place_of_issue}
											</Text>
										) : ( */}
									<Text style={ styles.patientDetails }>
										Should get this abscess drained followed by a root canal and
										crown or extraction
									</Text>
									{/* )} */}
								</View>
								<View style={ styles.queryWrapper }>
									<Text style={ styles.queryText }>Recommended follow up:</Text>
									{/* {previewNote.place_of_issue !== '' ? (
											<Text style={ styles.patientDetails }>
												{previewNote.place_of_issue}
											</Text>
										) : ( */}
									<Text style={ styles.patientDetails }>
										Set up an office visit as soon as possible (Don’t wait until
										it becomes an emergency)
									</Text>
									{/* )} */}
								</View>
								<View style={ styles.queryWrapper }>
									<Text style={ styles.queryText }>Recommended medications:</Text>
									{/* {previewNote.place_of_issue !== '' ? (
											<Text style={ styles.patientDetails }>
												{previewNote.place_of_issue}
											</Text>
										) : ( */}
									<Text style={ styles.patientDetails }>
										Amoxicillin 500 mg tid until finish Motrin 800 mg tid as
										needed
									</Text>
									{/* )} */}
								</View>
								<View style={ styles.queryWrapper }>
									{/* {previewNote.place_of_issue !== '' ? (
											<Text style={ styles.patientDetails }>
												{previewNote.place_of_issue}
											</Text>
										) : ( */}
									<Text style={ styles.patientDetails }>
										{' '}
										1. Medications are not to be taken in empty stomach unless
										specifically instructed
									</Text>
									<Text style={ styles.patientDetails }>
										{' '}
										1. Medications are not to be taken in empty stomach unless
										specifically instructed
									</Text>

									{/* )} */}
								</View>
							</View>
							<View style={ styles.prescriptionWrapper }>
								<Text style={ styles.prescriptionText }>
									To request a prescription for these medications, click the
									“Request prescription” button below and select your pharmacy..
									You will be charged $10 to request this prescription.
								</Text>
							</View>

							<View style={ styles.remoteCloseButton }>
								<TouchableOpacity
									style={ globalStyles.secondaryButton }
									onPress={ () =>
										setIsDeleteModalVisible(!isDeleteModalVisible)
									}>
									<Text style={ globalStyles.buttonText }>
										Request prescription
									</Text>
								</TouchableOpacity>
							</View>
							<View style={ styles.footerContainer }>
								<View style={ styles.footerWrapper }>
									<View style={ styles.footerContent }>
										<Image
											source={ require('../../assets/phone.png') }
											style={ styles.footerImage }
										/>
										<Text style={ styles.footerText }>
											Call Dr. Mery joe's office to set up an appointment
										</Text>
									</View>
								</View>
								<View style={ styles.footerWrapper }>
									<View style={ styles.footerContent }>
										<Image
											source={ require('../../assets/phone.png') }
											style={ styles.footerImage }
										/>
										<Text style={ styles.footerText }>Contact by email</Text>
									</View>
								</View>
								<View style={ styles.footerWrapper }>
									<View style={ styles.footerContent }>
										<Image
											source={ require('../../assets/phone.png') }
											style={ styles.footerImage }
										/>
										<Text style={ styles.footerText }>
											Directions to Dr Mery joe's office Joe Dental, 123 park
											avenue, NY 12345
										</Text>
									</View>
								</View>
								<View style={ styles.footerWrapper }>
									<View style={ styles.footerContent }>
										<Image
											source={ require('../../assets/phone.png') }
											style={ styles.footerImage }
										/>
										<Text style={ styles.footerText }>
											Find an other Teethaffairs dentist near you at the moment.
										</Text>
									</View>
								</View>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>

			<Modal transparent={ true } visible={ isDeleteModalVisible }>
				<View style={ styles.modalWrap }>
					<View style={ styles.modalTextWrap }>
						<TouchableOpacity
							onPress={ () => setIsDeleteModalVisible(!isDeleteModalVisible) }>
							<Image
								source={ require('../../assets/cross-Icon.png') }
								style={ styles.closeIcon }
							/>
						</TouchableOpacity>
						<Text style={ styles.modalText }>request prescription</Text>
						{/* <NormalTextInput
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
												/> */}

						<Text style={ styles.pharmacyText }>
							Select Pharmacy, within your zipcode
						</Text>
						<TouchableOpacity
							style={ styles.consultButton }
							onPress={ props.handleSubmit }>
							<Text style={ styles.loginText }>save</Text>
						</TouchableOpacity>
					</View>
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
