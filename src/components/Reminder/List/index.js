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
import { fetchReminders, updateReminder, deleteReminder, fetchReminderBasedOnFilter } from '../../../state/actions/reminder';
import { getUsers } from '../../../state/actions/user';
import moment from 'moment';

function ListReminder(props) {
	const { navigation, fetchReminders, reminderList, updateReminder, deleteReminder, getUsers, userList, fetchReminderBasedOnFilter, userDetails } = props;
	const [ isVisible, setVisible ] = useState(false);
	const [ expandedCards, setExpandedCards ] = useState([]);
	const [ showModal, setShowModal ] = useState(false);
	const [ selectedContent, setSelectedContent ] = useState('');
	const [ selectedReminder, setSelectedReminder ] = useState('');
	const [ selectedUser, setSelectedUser ] = useState(userDetails && userDetails.id ? { id: userDetails.id, username: userDetails.first_name } : {});
	const [ selectedDay, setSelectedDay ] = useState('');
	const days = [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ];
	const editContent = [
		{ icon: 'check', content: 'I already brushed and flossed' },
		{ icon: 'pause', content: 'Remind me after 30 minutes again' },
		{ icon: 'exclamation', content: 'Brushed but not flossed' },
		{
			icon: 'exclamation',
			content: 'Unable to brush and floss today. Don\'t remind me again'
		}
	];

	const onGetNotesSuccess = data => {
		console.log('api success', data);
	};

	useEffect(function storeNoteListResponse() {
		fetchReminders();
		if (userDetails.user_type === 'PRIMARY-PATIENT') {
			getUsers();
		}
	}, []);

	const onGetNotesListFailure = () => {
		// alert('Network error');
	};

	useEffect(() => {
		if (selectedContent !== '') {
			let list = JSON.parse(JSON.stringify(reminderList));
			list[selectedReminder].completed = !list[selectedReminder].completed;
			updateReminder(list[selectedReminder], onGetNotesSuccess, onGetNotesListFailure);
		}
	}, [ selectedContent ]);
	
	useEffect(() => {
		console.warn('inside change fetch reminder');
		if (selectedDay !== '') {
			fetchReminderBasedOnFilter( { user_id: selectedUser.id, day: `${selectedDay + 1}` } );
		}
	}, [ selectedDay, selectedUser ]);

	const changeExpandedCards = index => {
		if (expandedCards && expandedCards.indexOf(index) !== -1) {
			let cards = [ ...expandedCards ];
			cards.splice(cards.indexOf(index), 1);
			setExpandedCards(cards);
		} else {
			setExpandedCards([ ...expandedCards, index ]);
		}
	};

	const removeReminder = index => {
		const data = [ ...reminderList ];
		data.splice(index, 1);
		deleteReminder({ id: reminderList[index].id, data });
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
							source={ require('../../../assets/profile.png') }
						/>
						{/* <View
							row
							center
							style={ {
								...styles.statusContainer,
								...{
									backgroundColor:
										index === 0
											? '#00C57D'
											: index === 1
												? '#FA5050'
												: '#858585',
									borderColor:
										index === 0
											? '#00C57D'
											: index === 1
												? '#FA5050'
												: '#858585'
								}
							} }>
							<View style={ styles.statusContent }>
								<Icon
									type={ 'MaterialCommunityIcons' }
									name={
										index === 0
											? 'check'
											: index === 1
												? 'exclamation'
												: 'pause'
									}
									color={ 'white' }
									size={ 14 }
								/>
							</View>
						</View> */}
					</View>
					<View row center jC={ 'space-between' } style={ styles.titleContainer }>
						<View>
							<Text style={ styles.expandedTitle }>{item.reminder_text}</Text>
							{/* <Text style={ styles.expandedSubTitle }>You and 4 others</Text> */}
						</View>
						<View row center>
							<TouchableOpacity>
								<Icon
									type={ 'MaterialCommunityIcons' }
									name={ !item.snooze ? 'bell-off-outline' : 'bell' }
									color={ !item.snooze ? 'grey' : '#00C57D' }
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
								onPress={ () => [ navigation.navigate('CreateReminder', { data: item, index }), setSelectedReminder(index) ] }>
								<Icon
									type={ 'MaterialCommunityIcons' }
									name={ 'pencil' }
									color={ 'black' }
									size={ 20 }
								/>
								<Text style={ styles.editText }>Edit</Text>
							</TouchableOpacity>
							<TouchableOpacity style={ styles.deleteContainer } onPress={ () => removeReminder(index) }>
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
			</TouchableOpacity>
		);
	};

	const modal = () => {
		return (
			<Modal transparent={ true } visible={ showModal }>
				<View
					style={ styles.modalContainer }>
					<View
						style={ styles.modalContent }>
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
										<View row
											key={ `modal-${index}` }
											style={ styles.modContent }>
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
												onPress={ () => setSelectedContent(selectedContent === index ? '' : index) }
											>
												<View
													style={ { ...styles.radioGroup, ...{ backgroundColor: selectedContent === index ? '#33D197' : 'white' } } }
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
			<View style={ styles.container }>
				<View row jC={ 'space-between' } style={ styles.daysContainer }>
					{days.map((day, index) => {
						return (
							<TouchableOpacity
								onPress={ () => setSelectedDay(index) }
								key={ `days-index${index}` }
								style={ { ...styles.daysContent, ...{
									borderColor: selectedDay === index ? '#33D197' : '#CAC7C7',
									backgroundColor: selectedDay === index ? '#33D197' : '#CAC7C7' } 
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
						keyExtractor={ (item, index) => `${index}` }
						ListEmptyComponent={ () => (<View center><Text>No reminders</Text></View>) }
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

const mapStateToProps = state => {
	return {
		reminderList: state.reminder.reminderList,
		userList: state.user.users,
		userDetails: state.user
	};
};

export default connect(
	mapStateToProps,
	{
		fetchReminders,
		updateReminder,
		deleteReminder,
		getUsers,
		fetchReminderBasedOnFilter
	}
)(ListReminder);
