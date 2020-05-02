import React, { useState, useEffect } from 'react';
import { Text, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import styles from './styles';
import Icon from '../../global/Icon';
import View from '../../global/View';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { connect } from 'react-redux';
import { createReminder, updateReminder } from '../../../state/actions/reminder';
import { getUsers } from '../../../state/actions/user';
import Loader from '../../global/Loader';

function CreateReminder(props) {
	const { route, getUsers, createReminder, userList, navigation, updateReminder, loading } = props;
	const days = [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ];
	const [ selectedDays, setSelectedDays ] = useState([]);
	const [ isDatePickerVisible, setDatePickerVisibility ] = useState(false);
	const [ selectedTime, setSelectedTime ] = useState({ hours: 'HH', min: 'MM', day: 'AM' });
	const [ snooze, setSnooze ] = useState(false);
	const [ reminderText, setReminderText ] = useState('');
	const [ selectedUser, setSelectedUser ] = useState([]);
	const [ isCreate, setIsCreate ] = useState(true);
	const [ id, setId ] = useState('');
	const [ daySelectAll, setDaySelectAll ] = useState(false);
	const [ userSelectAll, setUserSelectAll ] = useState(false);

	const selectAll = (type) => {
		if (type === 'user' && isCreate) {
			setUserSelectAll(!userSelectAll);
			let selectedUsers = [];
			if (!userSelectAll) {
				userList.map((data) => {
					selectedUsers.push(data.id);
				});
			}
            setSelectedUser(selectedUsers);
		} else if (type === 'days') {
            setDaySelectAll(!daySelectAll);
			let selectedDays = [];
			if (!daySelectAll) {
				selectedDays = [ '1', '2', '3', '4', '5', '6', '7' ];
			}
            setSelectedDays(selectedDays);
		}
	};

	const userSelection = id => {
		if(isCreate) {
			if (selectedUser.indexOf(id) !== -1) {
				let users = [ ...selectedUser ];
				users.splice(users.indexOf(id), 1);
				setUserSelectAll(false);
				setSelectedUser(users);
			} else {
				let userslist = [ ...selectedUser, id ];
				setSelectedUser(userslist);
				if (userslist.length === userList.length) {
					setUserSelectAll(true);
				}
			}
		}
	};

	useEffect(function getUsersResponse() {
		getUsers();
		if (route && route.params && Object.keys(route.params).length > 0) {
			let data = route.params.data;
			setSelectedDays(data.reminder_day);
			setDaySelectAll(data.reminder_day.length === 7);
			let hours = parseInt(data.reminder_time.split(':')[0], 10) > 12 ? parseInt(data.reminder_time.split(':')[0], 10) - 12 : parseInt(data.reminder_time.split(':')[0], 10);
			let day = parseInt(data.reminder_time.split(':')[0], 10) > 12 ? 'PM' : 'AM';
			setSelectedTime({ hours, min: data.reminder_time.split(':')[1].split(' ')[0], day });
			setSnooze(data.snooze);
			setReminderText(data.reminder_text);
			setSelectedUser([ data.reminder_user ]);
			setIsCreate(false);
			setId(data.id);
		}
	}, []);

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = date => {
		let time = moment(date).format('LT');
		setSelectedTime({ hours: time.split(':')[0], min: time.split(':')[1].split(' ')[0], day: time.split(' ')[1] });
		hideDatePicker();
	};

	const submit = () => {
		let reminders = [];
		selectedUser.map((user) => {
			reminders.push({
				'reminder_text': reminderText,
				'reminder_day': selectedDays,
				'reminder_time': selectedTime.day === 'AM' ? `${selectedTime.hours === 12 ? '00' : selectedTime.hours}:${selectedTime.min}:00` : `${selectedTime.hours === 12 ? 12 : parseInt(selectedTime.hours, 10) + 12}:${selectedTime.min}:00`,
				'reminder_user': user,
				'snooze': snooze
			});
		});
		if (isCreate) {
			createReminder({ data: reminders, navigation });
		} else {
            updateReminder({ data: reminders[0], id, index: route.params.index, navigation });
		}
	};

	const renderItem = ({ item, index }) => {
		return (
			<View row center jC={ 'flex-start' } key={ `user-index${index}` } style={ styles.accountContainer }>
				<TouchableOpacity center style={ { ...styles.checkContainer, ...{
					backgroundColor: selectedUser !== '' && selectedUser.indexOf(item.id) !== -1 ? '#00C57D' : 'white',
                    borderColor: selectedUser !== '' && selectedUser.indexOf(item.id) !== -1 ? '#00C57D' : '#A1A1A1' } } } onPress={ () => userSelection(item.id) }>
					<Icon type={ 'MaterialCommunityIcons' } name={ 'check' } color={ 'white' } size={ 16 } />
				</TouchableOpacity>
				<View center style={ styles.accountIcon }>
					<Icon type={ 'MaterialCommunityIcons' } name={ 'account' } color={ 'black' } size={ 16 } />
				</View>
				<Text>{item.username}</Text>
			</View>
		);
	};

	const doesDaySelected = (array, value) => {
		const index = array.findIndex(item => item === value);
		return index;
	};

	const handleDaysSelected = (value) => {
		const data = [ `${value}` ];
		if(selectedDays.indexOf(`${value}`) !== -1) {
			setDaySelectAll(false);
			setSelectedDays(prevState => {
				prevState.splice(selectedDays.indexOf(`${value}`), 1);
				return [ ...prevState ];
			});
		} else {
			setSelectedDays(prevState => Array.from(new Set([ ...prevState, ...data ])));
			if (selectedDays.length >= 6) {
				setDaySelectAll(true);
			}
		}
	};

	return (
		<ScrollView style={ styles.container } showsVerticalScrollIndicator={ false }>
			<Loader loading = { loading } />
			<View style={ styles.timeContainer }>
				<Text style={ styles.timeText }>Set Time</Text>
				<View row jC={ 'flex-start' }>
					<TouchableOpacity style={ styles.hourContent } onPress={ () => showDatePicker() }>
						<Text style={ styles.hourText }>{selectedTime.hours}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={ styles.minuteContent } onPress={ () => showDatePicker() }>
						<Text style={ styles.minuteText }>{selectedTime.min}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={ styles.timeZone } onPress={ () => showDatePicker() }>
						<Text style={ styles.timeZoneText }>{selectedTime.day}</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View row center jC={ 'space-between' } style={ styles.muteContainer }>
				<TouchableOpacity style={ styles.flexRow } onPress={ () => setSnooze(!snooze) }>
					<Icon type={ 'MaterialCommunityIcons' } name={ snooze ? 'bell' : 'bell-off-outline' } color={ snooze ? '#00C57D' : 'grey' } size={ 22 } />
					<Text style={ styles.marginHorizontal }>{snooze ? 'Mute' : 'Unmute'}</Text>
				</TouchableOpacity>
			</View>
			<View row>
				<View style={ styles.daysContainer } >
					<View row jC={ 'space-between' }>
						<Text>Select Days</Text>
						<View row center>
							<TouchableOpacity
								onPress={ () => selectAll('days') }
								style={ { ...styles.selectAllContent, ...{ borderColor: '#CAC7C7', backgroundColor: daySelectAll ? '#00C57D' : 'white' } } }>
									<Icon type={ 'MaterialCommunityIcons' } name={ 'check' } color={ 'white' } size={ 15 } />
							</TouchableOpacity>
							<Text>Select All</Text>
						</View>
					</View>
					<View row jC={ 'space-between' } style={ styles.dayContainer }>
						{days.map((day, index) => {
							return (
								<TouchableOpacity 
									key={ `days-index${index}` } 
									style={ { 
										...styles.dayContent, 
										...{ backgroundColor: selectedDays.indexOf(`${index + 1}`) !== -1 ? '#00C57D' : '#CAC7C7' } 
									} } 
									onPress={ () => handleDaysSelected(`${index + 1}`) }>
									<Text style={ { ...{ fontWeight: '800', color: doesDaySelected(selectedDays, `${index + 1}`) !== -1 ? 'white' : '#878787' } } }>{day}</Text>
								</TouchableOpacity>
							);
						})}
					</View>
				</View>
			</View>
			<View style={ styles.nameContainer }>
				<Text style={ styles.nameText }>Name The Event</Text>
				<View style={ styles.nameInputContainer }>
					<TextInput style={ styles.nameInput } value={ reminderText } onChangeText={ (value) => setReminderText(value) }/>
				</View>
			</View>
			<View row style={ styles.userContainer }>
				<View style={ styles.daysContainer }>
					<View row jC={ 'space-between' }>
						<Text>Select Users</Text>
						<View row center style={ isCreate ? {} : styles.displayNone }>
							<TouchableOpacity
								onPress={ () => selectAll('user') }
								style={ { ...styles.selectAllContent, ...{ borderColor: '#CAC7C7', backgroundColor: userSelectAll ? '#00C57D' : 'white' } } }>
									<Icon type={ 'MaterialCommunityIcons' } name={ 'check' } color={ 'white' } size={ 15 } />
								</TouchableOpacity>
							<Text>Select All</Text>
						</View>
					</View>
					<View style={ styles.scrollContainer }>
						<FlatList
							contentContainerStyle={ styles.fullWidth }
							numColumns={ 2 }
							data={ userList }
							keyExtractor={ (item, index) => index.toString() }
							renderItem={ renderItem }
						/>
					</View>
				</View>
			</View>
			<TouchableOpacity style={ styles.buttonContainer } onPress={ () => submit() }>
				<Text style={ styles.buttonText }>{isCreate ? 'Create Event' : 'Update Event'}</Text>
			</TouchableOpacity>
			<DateTimePickerModal
				isVisible={ isDatePickerVisible }
				mode="time"
				onConfirm={ handleConfirm }
				onCancel={ hideDatePicker }
			/>
		</ScrollView>
	);
}

const mapStateToProps = state => {
	return {
		userList: state.user.users,
		reminderList: state.reminder.reminderList,
		loading: state.reminder.loading
	};
};

export default connect(
	mapStateToProps,
	{
		getUsers, 
		createReminder,
		updateReminder
	}
)(CreateReminder);
