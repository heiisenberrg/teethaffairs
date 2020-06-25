import React, { useState, useEffect } from 'react';
import {
	Text,
	ScrollView,
	TouchableOpacity,
	FlatList,
	Image,
	Modal
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import Icon from '../../global/Icon';
import View from '../../global/View';
import {
	fetchReminders,
	updateReminder,
	deleteReminder,
	fetchReminderBasedOnFilter
} from '../../../state/actions/reminder';
import { getUsers } from '../../../state/actions/user';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

function ListReminder(props) {
	const {
		route,
		navigation,
		fetchReminders,
		reminderList,
		updateReminder,
		deleteReminder,
		getUsers,
		userList,
		fetchReminderBasedOnFilter,
		userDetails
	} = props;
	const [ isVisible, setVisible ] = useState(false);
	const [ expandedCards, setExpandedCards ] = useState([]);
	const [ showModal, setShowModal ] = useState(false);
	const [ showDeleteModal, setShowDeleteModal ] = useState(false);
	const [ selectedContent, setSelectedContent ] = useState('');
	const [ selectedReminder, setSelectedReminder ] = useState('');
	const [ selectedUser, setSelectedUser ] = useState(
		userDetails && userDetails.id
			? { id: userDetails.id, username: userDetails.first_name }
			: {}
	);
	const [ selectedDay, setSelectedDay ] = useState('');
	const days = [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ];
	const days1 = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];

	const editContent = [
		{ icon: 'check', content: 'I already brushed and flossed' },
		{ icon: 'pause', content: 'Remind me after 30 minutes again' },
		{ icon: 'exclamation', content: 'Brushed but not flossed' },
		{
			icon: 'exclamation',
			content: 'Unable to brush and floss today. Don\'t remind me again'
		}
	];

	useEffect(() => {
		fetchReminders();
		if (
			userDetails.user_type === 'PRIMARY-PATIENT' ||
			userDetails.user_type === 'PRIMARY_PATIENT'
		) {
			getUsers();
		}
	}, []);

	useEffect(() => {
		if (selectedContent !== '') {
			let list = JSON.parse(JSON.stringify(reminderList));
			list[selectedReminder].completed = !list[selectedReminder].completed;
			updateReminder(list[selectedReminder]);
		}
	}, [ selectedContent ]);

	useEffect(() => {
		if (selectedDay !== '') {
			fetchReminderBasedOnFilter({
				user_id: selectedUser.id,
				day: `${days1[selectedDay]}`
			});
		} else if (
			selectedDay === '' &&
			selectedUser &&
			Object.keys(selectedUser).length &&
			userDetails.id !== selectedUser.id
		) {
			fetchReminderBasedOnFilter({ user_id: selectedUser.id, day: 'Sun' });
			setSelectedDay(0);
		} else if (
			route &&
			route.params &&
			Object.keys(route.params).length &&
			route.params.refresh
		) {
			if (selectedUser.id === userDetails.id && selectedDay === '') {
				fetchReminders();
			} else if (selectedDay !== '') {
				fetchReminderBasedOnFilter({
					user_id: selectedUser.id,
					day: `${days1[selectedDay]}`
				});
			} else {
				fetchReminderBasedOnFilter({ user_id: selectedUser.id, day: '' });
			}
			setExpandedCards([]);
		}
	}, [ selectedDay, selectedUser, route ]);

	const changeExpandedCards = index => {
		if (expandedCards && expandedCards.indexOf(index) !== -1) {
			let cards = [ ...expandedCards ];
			cards.splice(cards.indexOf(index), 1);
			setExpandedCards(cards);
		} else {
			setExpandedCards([ ...expandedCards, index ]);
		}
	};

	const removeReminder = () => {
		const data = [ ...reminderList ];
		deleteReminder({ id: reminderList[selectedReminder].id, data }, navigation);
		setShowDeleteModal(false);
	};

	const _renderNoteCards = ({ item, index }) => {
		return (
			<TouchableOpacity
				style={ {
					...styles.cardContainer,
					...{
						height:
							expandedCards && expandedCards.indexOf(index) !== -1 ? 120 : 90
					}
				} }
				activeOpacity={ 0.8 }
				onPress={ () => changeExpandedCards(index) }>
				<View row style={ styles.cardContent }>
					<View jC={ 'flex-start' }>
						<Image
							style={ styles.profileImage }
							source={
								item.profile_pic !== null
									? { uri: item.profile_pic }
									: require('../../../assets/profile.png')
							}
						/>
						<View
							row
							center
							style={ {
								...styles.modStatus,
								...{
									backgroundColor:
									item.reminder_response !==  '' ?
										item.reminder_response === 'BF'
											? '#00C57D'
											: item.reminder_response === 'OB' || item.reminder_response === 'NBF'
											? '#FA5050'
											: '#858585' : 'transparent',
									borderColor:
									item.reminder_response !==  '' ?
									item.reminder_response === 'BF'
											? '#00C57D'
											: item.reminder_response === 'OB' || item.reminder_response === 'NBF'
											? '#FA5050'
											: '#858585' : 'transparent',
									position: 'absolute',
									bottom: 0,
									right: -10
								}
							} }>
							<View style={ styles.statusContent }>
								<Icon
									type={ 'MaterialCommunityIcons' }
									name={ item.reminder_response !==  '' ? item.reminder_response === 'BF'
									? 'check'
									: item.reminder_response === 'OB' || item.reminder_response === 'NBF'
									? 'exclamation'
									: 'pause' : '' }
									color={ 'white' }
									size={ 14 }
								/>
							</View>
						</View>
					</View>
					<View row center jC={ 'space-between' } style={ styles.titleContainer }>
						<View>
							<Text style={ styles.expandedTitle }>{item.reminder_text}</Text>
						</View>
						<View row center>
							<TouchableOpacity>
								<Icon
									type={ 'MaterialCommunityIcons' }
									name={ !item.is_muted ? 'bell-off-outline' : 'bell' }
									color={ !item.is_muted ? 'grey' : '#00C57D' }
									size={ 22 }
								/>
							</TouchableOpacity>
							<View center style={ styles.timeContainer }>
								<Text style={ styles.mediumText }>
									{moment(item.reminder_time, 'HHmm').format('LT')}
								</Text>
							</View>
						</View>
					</View>
				</View>
				{expandedCards && expandedCards.indexOf(index) !== -1 && (
					<View
						row
						center
						jC={ 'space-between' }
						style={ styles.expandedContainer }>
						<Text style={ styles.mediumText }>{item.description}</Text>
						<View row jC={ 'space-between' } style={ styles.actionContainer }>
							<TouchableOpacity
								style={ styles.editContainer }
								onPress={ () => [
									navigation.navigate('CreateReminder', { data: item, index }),
									setSelectedReminder(index)
								] }>
								<Icon
									type={ 'MaterialCommunityIcons' }
									name={ 'pencil' }
									color={ 'black' }
									size={ 20 }
								/>
								<Text style={ styles.editText }>Edit</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={ styles.deleteContainer }
								onPress={ () => [
									setSelectedReminder(index),
									setShowDeleteModal(true)
								] }>
								<Icon
									type={ 'MaterialCommunityIcons' }
									name={ 'trash-can-outline' }
									color={ '#FA5050' }
									size={ 20 }
								/>
								<Text style={ styles.deleteText }>Delete</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
				<Modal transparent={ true } visible={ showDeleteModal }>
					<View style={ styles.modalWrap }>
						<LinearGradient
							start={ { x: 0.4, y: 0.1 } }
							end={ { x: 0.8, y: 1.1 } }
							colors={ [ '#0F8E79', '#66CC80' ] }
							style={ styles.successModalTextWrap }>
							<View style={ styles.successTextWrap }>
								<TouchableOpacity
									style={ styles.closeIconContainer }
									onPress={ () => setShowDeleteModal(false) }>
									<Image
										source={ require('../../../assets/cross.png') }
										style={ styles.closeIcon }
									/>
								</TouchableOpacity>

								<Image
									source={ require('../../../assets/bin-icon.png') }
									style={ styles.successIcon }
								/>
								<Text style={ styles.successModalText }>
									Do you want to delete the reminder?
								</Text>
							</View>
							<View style={ styles.modalButtonContainer }>
								<TouchableOpacity
									style={ styles.continueButton }
									onPress={ () => removeReminder(index) }>
									<Text style={ styles.continueButtonText }>Yes</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={ styles.continueButton }
									onPress={ () => setShowDeleteModal(false) }>
									<Text style={ styles.continueButtonText }>No</Text>
								</TouchableOpacity>
							</View>
						</LinearGradient>
					</View>
				</Modal>
			</TouchableOpacity>
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
						<View row style={ styles.profileContainer }>
							<View jC={ 'flex-start' }>
								<Image
									style={ styles.profileImage }
									source={ require('../../../assets/profile.png') }
								/>
							</View>
							<View
								row
								center
								jC={ 'space-between' }
								style={ styles.titleContainer }>
								<View>
									<Text style={ styles.expandedTitle }>Brush</Text>
									<Text style={ styles.expandedSubTitle }>You and 4 others</Text>
								</View>
								<View row center>
									<View center style={ styles.timeContainer }>
										<Text style={ styles.mediumText }>3 am</Text>
									</View>
								</View>
							</View>
						</View>
						<View style={ styles.profileContent } />
						<View row center style={ styles.proImage }>
							<Image
								style={ styles.profileImage }
								source={ require('../../../assets/happy-face.png') }
							/>
							<View style={ styles.proText }>
								<Text>You have completed your task today!</Text>
							</View>
						</View>
						<View style={ styles.editContent }>
							{editContent &&
								editContent.map((item, index) => {
									return (
										<View row key={ `modal-${index}` } style={ styles.modContent }>
											<View
												row
												center
												style={ {
													...styles.modStatus,
													...{
														backgroundColor:
															item.icon === 'check'
																? '#00C57D'
																: item.icon === 'exclamation'
																? '#FA5050'
																: '#858585',
														borderColor:
															item.icon === 'check'
																? '#00C57D'
																: item.icon === 'exclamation'
																? '#FA5050'
																: '#858585'
													}
												} }>
												<View style={ styles.statusContent }>
													<Icon
														type={ 'MaterialCommunityIcons' }
														name={ item.icon }
														color={ 'white' }
														size={ 14 }
													/>
												</View>
											</View>
											<TouchableOpacity
												style={ styles.radioContainer }
												onPress={ () =>
													setSelectedContent(
														selectedContent === index ? '' : index
													)
												}>
												<View
													style={ {
														...styles.radioGroup,
														...{
															backgroundColor:
																selectedContent === index ? '#33D197' : 'white'
														}
													} }
												/>
											</TouchableOpacity>
											<View style={ styles.width80 }>
												<Text>{item.content}</Text>
											</View>
										</View>
									);
								})}
						</View>
					</View>
				</View>
			</Modal>
		);
	};

	return (
		<>
			<View style={ styles.divider } />
			<View center style={ styles.filterContainer }>
				<TouchableOpacity style={ styles.filter } activeOpacity={ 0.9 }>
					<View row style={ styles.filterWrapper }>
						<View jC={ 'flex-start' }>
							<Image
								style={ styles.filterImage }
								source={
									selectedUser && selectedUser.profile_pic
										? { uri: selectedUser.profile_pic }
										: require('../../../assets/profile.png')
								}
							/>
						</View>
						<View row center jC={ 'space-between' } style={ styles.filterContent }>
							<Text style={ styles.filterText }>
								{Object.keys(selectedUser).length === 0 &&
								userList &&
								userList.length > 0
									? userList[0].username
									: selectedUser.username}
							</Text>
							<TouchableOpacity
								style={ styles.filterArrow }
								onPress={ () =>
									(userList && userList.length > 0
										? setVisible(!isVisible)
										: null)
								}>
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
								{userList &&
									userList.map((data, index) => {
										return (
											<TouchableOpacity
												key={ `user${index}` }
												style={ styles.userContainer }
												onPress={ () => [
													setSelectedUser(data),
													setVisible(!isVisible)
												] }>
												<View row style={ styles.profileWrapper }>
													<View jC={ 'flex-start' }>
														<Image
															style={ styles.filterImage }
															source={
																data && data.profile_pic !== null
																	? { uri: data.profile_pic }
																	: require('../../../assets/profile.png')
															}
														/>
													</View>
													<View style={ styles.userContent }>
														<Text style={ styles.userContentText }>
															{data.username}
														</Text>
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
			<View style={ styles.container }>
				<View row jC={ 'space-between' } style={ styles.daysContainer }>
					{days.map((day, index) => {
						return (
							<TouchableOpacity
								onPress={ () => setSelectedDay(index) }
								key={ `days-index${index}` }
								style={ {
									...styles.daysContent,
									...{
										borderColor: selectedDay === index ? '#33D197' : '#CAC7C7',
										backgroundColor:
											selectedDay === index ? '#33D197' : '#CAC7C7'
									}
								} }>
								<Text>{day}</Text>
							</TouchableOpacity>
						);
					})}
				</View>
				<View style={ styles.listContainer }>
					<FlatList
						data={ reminderList }
						renderItem={ _renderNoteCards }
						contentContainerStyle={ styles.flatliststyle }
						keyExtractor={ item => `${item.id}${reminderList.length}` }
						extraData={ props }
						ListEmptyComponent={ () => (
							<View center>
								<Text>No reminders</Text>
							</View>
						) }
						showsVerticalScrollIndicator={ false }
					/>
					<TouchableOpacity
						style={ styles.fabButton }
						activeOpacity={ 0.8 }
						onPress={ () => navigation.navigate('CreateReminder') }>
						<Image
							style={ styles.fabIcon }
							source={ require('../../../assets/round-plus.png') }
						/>
					</TouchableOpacity>
				</View>
				{modal()}
			</View>
		</>
	);
}

const mapStateToProps = state => ({
	reminderList: state.reminder.reminderList,
	userList: state.user.users,
	userDetails: state.user.user
});

const mapDispatchToProps = dispatch => ({
	fetchReminders: () => dispatch(fetchReminders()),
	updateReminder: data => dispatch(updateReminder(data)),
	deleteReminder: (data, navigation) =>
		dispatch(deleteReminder(data, navigation)),
	getUsers: () => dispatch(getUsers()),
	fetchReminderBasedOnFilter: data => dispatch(fetchReminderBasedOnFilter(data))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListReminder);
