import React, { useEffect, useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import {
	Image,
	Text,
	FlatList,
	TouchableOpacity,
	SafeAreaView,
	ScrollView
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Icon from '../global/Icon';
import View from '../global/View';

import styles from './styles/index';
import { fetchNotes } from '../../state/actions/journal';
import { getUsers } from '../../state/actions/user';

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
function DentalNote(props) {

	const { fetchNotes, notes, navigation, getUsers, userList, userDetails } = props;
	
	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<TouchableOpacity
					style={ styles.backButton }
					onPress={ handleBackNavigation }
					activeOpacity={ 0.8 }
				>
					<Icon
						type={ 'Ionicons' }
						name={ 'ios-arrow-back' }
						size={ 28 }
						/>
				</TouchableOpacity>
			)
		});
	}, [ navigation ]);
	
	const [ list, setlist ] = useState([]);
	const [ isVisible, setVisible ] = useState(false);
	// const [ refresh, setRefresh ] = useState(true);
	const [ user, setUser ] = useState(userDetails && userDetails.user_type !== 'PRIMARY-PATIENT' ? 
	{ 
		id: userDetails.id, 
		name: `${userDetails.first_name} ${userDetails.last_name}`,
		avatar: userDetails.profile_pic
	} :
	{
		id: '', 
		name: 'All Users',
		avatar: null
	});

	useEffect(() => {
		if (userDetails.user_type === 'PRIMARY-PATIENT') {
			getUsers();
		}
	}, []);

	useEffect(() => {
		fetchNotes(user.id, onGetNotesSuccess, onGetNotesListFailure);
	}, [ user ]);

	const onGetNotesListFailure = () => {
		// alert('Network error');
	};
	const onGetNotesSuccess = () => {
	};
	
	useEffect(() => {
		setlist(notes);
	}, [ notes ]);

	const enableDentalNoteView = (item) => {
		navigation.navigate('Note Preview', { previewNote: item });
	};

	const handleBackNavigation = () => {
		navigation.goBack();
	};
 
	const _renderDentalNotes = (note) => (
		<TouchableOpacity
			style={ styles.card }
			activeOpacity={ 0.8 }
			onPress={ () => enableDentalNoteView(note) }
		>
			<View
				style={ styles.cardHeader }
				activeOpacity={ 0.8 }
			>
				<View style={ styles.circleWrapper }>
					<Icon
						type={ 'FontAwesome5' }
						name={ 'notes-medical' }
						size={ 24 }
					/>
				</View>
				<View style={ styles.content }>
					<View style={ styles.noteTitle }>
						<Text style={ styles.title }>{note.reference_name}</Text>
						<View style={ styles.dummy }>
						<Image
						source={ require('../../assets/time.png') }
					/>
						<Text style={ styles.title1 }>
						{date}&nbsp;{monthNames[month.getMonth()]}
						&nbsp;{year}</Text>	
						</View>
					</View>
					<View style={ styles.avatarContent }>
						<Image
							style={ styles.avatar }
							source={ require('../../assets/profile.png') }
						/>
						<Text style={ [ styles.normalText, styles.person ] }>{note.patient_name}</Text>
					</View>
				</View>
			</View>

			<ScrollView
				contentContainerStyle={ styles.reportContainer }
				horizontal={ true }
				showsHorizontalScrollIndicator={ false }
			>
				{
					note.media && note.media.length > 0 && note.media.map((item, index) =>
						<Image
							key={ `index_${index}` }
							style={ styles.imageReport }
							source={ {
								uri: item.media
							} }
						/>
					)
				}
			</ScrollView>
		</TouchableOpacity>
	);
	const handleCreateNotes = () => {
		navigation.navigate('Home');
	};
	return (
			<View>
				<View style={ styles.divider } />
				<View center
					style={ styles.filterContainer }>
					<TouchableOpacity 
						onPress={ () => (userList && userList.length > 0 ? setVisible(!isVisible) : null) }
						style={ styles.filter } activeOpacity={ 0.95 }
					>
						<View row
							style={ styles.filterWrapper }>
							<View jC={ 'flex-start' }>
								<Image
									style={ styles.filterImage }
									source={ user && user.profile_pic ? { uri:  user.profile_pic } : require('../../assets/profile.png') }
								/>
							</View>
							<View row center jC={ 'space-between' }
								style={ styles.filterContent }>
								<Text style={ styles.filterText }>{user.name}</Text>
								<View
									style={ styles.filterArrow }
									>
									<Icon type={ 'Ionicons' }
										name={ !isVisible ? 'md-arrow-dropright' : 'md-arrow-dropdown' }
										size={ 22 }
										color={ 'grey' }
									/>
								</View>
							</View>
						</View>
						{isVisible && (
							<View style={ styles.scrollViewContainer }>
								<ScrollView
									contentContainerStyle={ styles.scrollView }
									showsVerticalScrollIndicator={ false }>

									{userList && userList.map((data, index) =>
										<TouchableOpacity								    
											onPress={ () => [ setUser({
												...data,
												name: `${data.first_name} ${data.last_name}`,
												avatar: data.profile_pic
											}), setVisible(!isVisible) ] }
											key={ `user${index}` }
											style={ styles.userContainer }>
											<View row style={ styles.profileWrapper }>
												<View jC={ 'flex-start' }>
													<Image
														style={ styles.filterImage }
														source={ user && user.profile_pic ? { uri:  user.profile_pic } : require('../../assets/profile.png') }
													/>
												</View>
												<View
													style={ styles.userContent }>
													<Text style={ styles.userContentText }>
														{data.first_name} {data.last_name}
													</Text>
												</View>
											</View>
											<View style={ styles.separator } />
										</TouchableOpacity>
									)}
										<TouchableOpacity								    
											onPress={ () => [ setUser({
												id:'',
												name: 'All Users',
												avatar: ''
											}), setVisible(!isVisible) ] }
											style={ styles.userContainer }>
											<View row style={ styles.profileWrapper }>
												<View jC={ 'flex-start' }>
													<Image
														style={ styles.filterImage }
														source={ user && user.profile_pic ? { uri:  user.profile_pic } : require('../../assets/profile.png') }
													/>
												</View>
												<View
													style={ styles.userContent }>
													<Text style={ styles.userContentText }>
														{/* {data.first_name} {data.last_name} */}
														All User
													</Text>
												</View>
											</View>
											<View style={ styles.separator } />
										</TouchableOpacity>
								</ScrollView>
							</View>
						)}
					</TouchableOpacity>
				</View>
				<View style={ styles.container }>
					<SafeAreaView
						style={ styles.cardContainer }
					>
						{
							list && list.length !== 0 ?
								<FlatList
									data={ list }
									renderItem={ ({ item }) => _renderDentalNotes(item) }
									keyExtractor={ item => item.id }
								/>
								:
								<View style={ styles.emptyResult }>
									<Text>No Dental Notes Found</Text>
								</View>
						}
						<TouchableOpacity
							style={ styles.fabButton }
							activeOpacity={ 0.8 }
							onPress={ handleCreateNotes }
						>
							<AntDesignIcon name="plus" size={ 30 } color="#ffffff" />
						</TouchableOpacity>
					</SafeAreaView>
				</View>
			</View>
	);
}

const mapStateToProps = (state) => {
	return {
		notes: state.journal.notes,
		userList: state.user.users,
		userDetails: state.user
	};
};

export default connect(mapStateToProps, {
	fetchNotes,
	getUsers
})(DentalNote);
