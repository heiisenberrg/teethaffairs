import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import View from '../../../components/global/View';
import Text from '../../../components/global/Text';

import { getUsers } from '../../../state/actions/user';
import { getRemoteConsultationsForPatients } from '../../../state/actions/journal';
import Icon from '../../../components/global/Icon';
import styles from './styles';
import moment from 'moment';

function DentalHistoryForm(props) {
	const { navigation, userDetails, userList, getUsers, getRemoteConsultations, patientRemoteConsultation } = props;
	const [ isVisible, setVisible ] = useState(false);
	const [ selectedUser, setSelectedUser ] = useState(userDetails && userDetails.id ? { id: userDetails.id, username: userDetails.first_name } : {});
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

	useEffect(() => {
		if (userDetails.user_type === 'PRIMARY-PATIENT' || userDetails.user_type === 'PRIMARY_PATIENT') {
			getUsers();
		}
	}, []);

	useEffect(() => {
		getRemoteConsultations();
	}, []);

	const _renderDentalNotes = (question) => (
		<TouchableOpacity
			style={ styles.card }
			activeOpacity={ 0.8 }
			onPress={ () => navigation.navigate('DentistResponse', { data: question }) }
			>
			<View style={ styles.cardHeader } activeOpacity={ 0.8 }>
				<View style={ styles.circleWrapper }>
					<Icon type={ 'Ionicons' } name={ 'ios-chatbubbles' } size={ 40 } />
				</View>
				<View style={ styles.content }>
					<View style={ styles.noteTitle }>
						<Text style={ styles.title }>
							{question.title}
							</Text>
					</View>
					<View style={ styles.avatarContent }>
						<Image
							style={ styles.avatar }
							source={ require('../../../assets/profile.png') }
						/>
						<Text style={ { ...styles.normalText, ...styles.person } }>
							{question.patient_name}
						</Text>
						<Image
							style={ styles.time }
							source={ require('../../../assets/time.png') }
						/>
						<Text style={ styles.normalText }>
							{question.question_asked_on.split('T')[0].split('-')[2]}&nbsp;
							{
								monthNames[
									question.question_asked_on.split('T')[0].split('-')[1] - 1
								]
							}
							&nbsp;
							{question.question_asked_on.split('T')[0].split('-')[0]}
						</Text>
					</View>
				</View>
			</View>
			{question.question_info.length !== 0  && 
			<View style={ styles.doctorDetails }>
				<View style={ styles.doctorProfile }>
					<Image
						style={ styles.doctorPic }
						source={ require('../../../assets/profile.png') }
					/>
				</View>
				<View style={ styles.doctorInfo }>
					<Text style={ styles.doctorNameText }>Dr. {question.question_info[0].doctor_name}</Text>
					<Text style={ styles.addressText }>{question.question_info[0].address1}, {question.question_info[0].address2}</Text>
					<Text style={ styles.addressText }>Answered {moment(question.question_info[0].responded_on).fromNow()}</Text>
				</View>
			</View>} 
		</TouchableOpacity>
	);

	return (
		<View>
			<View style={ styles.divider } />
			<View center style={ styles.filterContainer }>
				<TouchableOpacity style={ styles.filter } activeOpacity={ 0.9 }>
					<View row style={ styles.filterWrapper }>
						<View jC={ 'flex-start' }>
							<Image
								style={ styles.filterImage }
								source={ selectedUser && selectedUser.profile_pic ? { uri:  selectedUser.profile_pic } : require('../../../assets/profile.png')  }
							/>
						</View>
						<View row center jC={ 'space-between' } style={ styles.filterContent }>
							<Text style={ styles.filterText }>{Object.keys(selectedUser).length === 0 && userList && userList.length > 0 ? userList[0].username : selectedUser.username}</Text>
							<TouchableOpacity
								style={ styles.filterArrow }
								onPress={ () => (userList && userList.length > 0 ? setVisible(!isVisible) : null) }>
								<Icon
									type={ 'Ionicons' }
									name={ !isVisible ? 'md-arrow-dropright' : 'md-arrow-dropdown' }
									size={ 22 }
									color={ 'grey' }
								/>
							</TouchableOpacity>
						</View>
					</View>
					{isVisible && (
						<View style={ styles.scrollViewContainer }>
							<ScrollView
								contentContainerStyle={ styles.scrollView }
								showsVerticalScrollIndicator={ false }>
								{userList && userList.map((data, index) => { 
									return(
										<TouchableOpacity key={ `user${index}` } style={ styles.userContainer } onPress={ () => [ setSelectedUser(data), setVisible(!isVisible) ] }>
											<View row style={ styles.profileWrapper }>
												<View jC={ 'flex-start' }>
													<Image
														style={ styles.filterImage }
														source={ selectedUser && selectedUser.profile_pic ? { uri:  selectedUser.profile_pic } : require('../../../assets/profile.png') }
													/>
												</View>
												<View style={ styles.userContent }>
													<Text style={ styles.userContentText }>{data.username}</Text>
												</View>
											</View>
											<View style={ styles.separator } />
										</TouchableOpacity>
									);
								})}
							</ScrollView>
						</View>
					)}
				</TouchableOpacity>
			</View>
			<View style={ styles.doctorNotesContainer }>
				{patientRemoteConsultation && patientRemoteConsultation.length !== 0 ? (
					<FlatList
						data={ patientRemoteConsultation }
						renderItem={ ({ item }) => _renderDentalNotes(item) }
						keyExtractor={ item => item.id }
					/>
				) : (
					<View style={ styles.emptyResult }>
						<Text>No Dental Remote Consultations Found</Text>
					</View>
				)}
			</View>
		</View>
	);
}

const mapStateToProps = state => ({
	userList: state.user.users,
	userDetails: state.user.user,
	patientRemoteConsultation: state.journal.patientRemoteConsultation
});

const mapDispatchToProps = dispatch => ({
	getUsers: () => dispatch(getUsers()),
	getRemoteConsultations : () => dispatch(getRemoteConsultationsForPatients())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DentalHistoryForm);
