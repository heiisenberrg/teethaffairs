import React, { useEffect, useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import {
	Image,
	Text,
	FlatList,
	TouchableOpacity,
	SafeAreaView,
	ScrollView,
	Animated
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Toast from '../Toast';
import Icon from '../global/Icon';
import View from '../global/View';
import moment from 'moment';

import styles from './styles/index';
import { getDentalVisits, setDentalVisits, deleteDentalVisit } from '../../state/actions/journal';
import { getUsers } from '../../state/actions/user';

function DentalVisit(props) {

	const { getDentalVisits, visits, navigation, deleteDentalVisit, getUsers, userList, userDetails } = props;
	
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
	const [ userLists, setUserLists ] = useState(userList);
	const [ isVisible, setVisible ] = useState(false);
	const [ showModal, setShowModal ] = useState(false);
	const [ refresh, setRefresh ] = useState(true);
	const [ currentVisit, setCurrentVisit ] = useState({});
	const [ showEditCard, setShowEditCard ] = useState(false);
	const [ slideLeftValue ] = useState(new Animated.Value(0));

	const [ user, setUser ] = useState(userDetails && userDetails.user_type !== 'PRIMARY-PATIENT' ? 
	{ 
		id: userDetails.id, 
		name: `${userDetails.first_name} ${userDetails.last_name}`,
		avatar: userDetails.profile_pic
	} :
	{
		id: 'all-users', 
		name: 'All Users',
		avatar: null
	});

	const getDentalVisitsSuccess = (data) => {
		console.log('api success', data);
	};

	useEffect(() => {
		if (userDetails.user_type === 'PRIMARY-PATIENT') {
			getUsers();
		}
	}, []);

	useEffect(() => {
		const data = {
			user_id: user.id
		};
		getDentalVisits(data, getDentalVisitsSuccess, getDentalVisitsFailure);
	}, [ user, refresh ]);

	const getDentalVisitsFailure = () => {
		// alert('Network error');
	};

	useEffect(() => {
		if(userList && userList.length > 0 && (userList.findIndex(user => user.id === 'all-users') > -1)) {
			userList.push({
				id: 'all-users', 
				name: 'All Users',
				avatar: null
			});
			console.log('ENTEREddddddddd', userList);
			setUserLists(userList);
		}
		setlist(visits);
	}, [ visits, userList ]);

	const enableDentalVisitView = (item) => {
		setCurrentVisit(item);
		setShowEditCard(true);
		_start();
	};

	const _start = () => {
		return Animated.timing(slideLeftValue, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true
		}).start();
	};

	const editDentalVisit = () => {
		navigation.navigate('CreateDentalVisit', { 
			visit:  currentVisit
		});
	};

	const deleteDentalVisitById = () => {
		deleteDentalVisit(currentVisit.id, deleteDentalVisitSuccess, deleteDentalVisitFailure);
		setShowModal(false);
		navigation.goBack();
		setRefresh(!refresh);
	};

	const closeToast = () => {
		setShowModal(false);
	};

	const deleteDentalVisitSuccess = () => {
		// setShowEditCard(false);
	};

	const deleteDentalVisitFailure = () => {

	};

	const handleBackNavigation = () => {
		navigation.goBack();
	};
 
	const _renderDentalVisitCards = (visit) => (
		<TouchableOpacity
			style={ styles.card }
			activeOpacity={ 0.8 }
			onPress={ () => enableDentalVisitView(visit) }
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
						<Text style={ styles.title }>{visit.visit_reason}</Text>
					</View>
					<View style={ styles.avatarContent }>
						<Image
							style={ styles.avatar }
							source={ visit.profile_pic ? { uri: visit.profile_pic } : require('../../assets/profile.png') }
						/>
						<Text style={ [ styles.normalText, styles.person ] }>{visit.patient_name}</Text>
						<Text style={ styles.normalText }>{moment(visit.issue_start_date).format('DD MMM YYYY')}</Text>
					</View>
				</View>
			</View>
			<View style={ styles.descriptionContainer }>
				<Text style={ styles.description }>{visit.visit_description}</Text>
			</View>
			<ScrollView
				contentContainerStyle={ styles.reportContainer }
				horizontal={ true }
				showsHorizontalScrollIndicator={ false }
			>
				{
					visit.media && visit.media.length > 0 && visit.media.map((item, index) =>
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

	return (
		showEditCard ?
			<Animated.View style={ [ styles.visitContainer, {        
				transform: [ {
					translateX: slideLeftValue.interpolate({
					inputRange: [ 0, 1 ],
					outputRange: [ 600, 0 ]
					})
                } ] } ] }>
				<View style={ styles.divider } />
				<View style={ styles.visitWrapper }>
					<View
						row
						style={ styles.visitHeader }
					>
						<View style={ styles.circleWrapper }>
							<Icon
								type={ 'FontAwesome5' }
								name={ 'notes-medical' }
								size={ 24 }
							/>
						</View>
						<View column style={ styles.titleWrapper }>
							<Text style={ styles.visitTitle }>{currentVisit.visit_reason}</Text>
							<View row style={ styles.nameWrapper }>
								<Text style={ [ styles.light ] }>{currentVisit.patient_name}</Text>
								<Text style={ styles.light }>
									<Icon
										type={ 'SimpleLineIcon' }
										name={ 'clock' }
										color="#8E8B8B"
									/> {moment(currentVisit.updated_on ? currentVisit.updated_on : currentVisit.created_on).format('DD MMM YYYY')}</Text>
							</View>
						</View>
						<View column>
							<TouchableOpacity
								onPress={ editDentalVisit }
								activeOpacity={ 0.8 }
								style={ styles.iconWrapper }>
								<Icon
									type={ 'FontAwesome' }
									name={ 'edit' }
									size={ 14 }
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={ () => setShowModal(true) }
								activeOpacity={ 0.8 }
								style={ styles.deleteWrapper }>
								<Icon
									type={ 'MaterialCommunityIcons' }
									name={ 'delete' }
									size={ 14 }
								/>
							</TouchableOpacity>	
						</View>
					</View>
					<View column style={ styles.rowContainer }>
						<Text style={ styles.boldText }>reason for the visit</Text>
						<Text>{currentVisit.visit_reason}</Text>
					</View>
					<View column style={ styles.rowContainer }>
						<Text style={ styles.boldText }>detailed description</Text>
						<Text>{currentVisit.visit_description}</Text>
					</View>
					<View column style={ styles.rowContainer }>
						<Text style={ styles.boldText }>experience of the visit</Text>
						<Text>{currentVisit.visit_experience}</Text>
					</View>
					<View column style={ styles.rowContainer }>
						<Text style={ styles.boldText }>dentist name</Text>
						<Text>{currentVisit.doctor}</Text>
					</View>
					<View column style={ styles.rowContainer }>
						<Text style={ styles.boldText }>fees paid</Text>
						<Text>$ {currentVisit.fees_paid}</Text>
					</View>
					<View column style={ styles.rowContainer }>
						<Text style={ styles.boldText }>insurance used</Text>
						<Text>{currentVisit.insurance_used ? 'Yes' : 'No'}</Text>
					</View>
					<ScrollView
						contentContainerStyle={ styles.reportContainer }
						horizontal={ true }
						showsHorizontalScrollIndicator={ false }
					>
						{
							currentVisit.media && currentVisit.media.length > 0 && currentVisit.media.map((item, index) =>
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
				</View>
				<Toast
					title="delete"
					message="are you sure you want to delete this item"
					showModal={ showModal }
					handleSubmit={ deleteDentalVisitById }
					handleCancel={ closeToast  }
					showClose={ true }
					successButtontext="Yes"
				/>
			</Animated.View>
			:
			<View>
				<View style={ styles.divider } />
				<View center
					style={ styles.filterContainer }>
					<TouchableOpacity 
						onPress={ () => (userLists && userLists.length > 0 ? setVisible(!isVisible) : null) }
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
									{userLists && userLists.map((data, index) =>
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
									renderItem={ ({ item }) => _renderDentalVisitCards(item) }
									keyExtractor={ item => item.id }
								/>
								:
								<View style={ styles.emptyResult }>
									<Text>No Dental Visits Found</Text>
								</View>
						}
						<TouchableOpacity
							style={ styles.fabButton }
							activeOpacity={ 0.8 }
							onPress={ () => navigation.navigate('CreateDentalVisit') }
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
		visits: state.journal.visits,
		userList: state.user.users,
		userDetails: state.user.user
	};
};

export default connect(mapStateToProps, {
	getDentalVisits,
	setDentalVisits,
	deleteDentalVisit,
	getUsers
})(DentalVisit);
