import React, { useEffect, useState } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	Modal,
	FlatList
} from 'react-native';
import Icon from '../global/Icon';
import View from '../global/View';
import { connect } from 'react-redux';
import moment from 'moment';
import {
	getUserList,
	getDeactivateUserId
} from '../../state/actions/journal';

import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

function FamilyMembers(props) {
	const { navigation, getUserList, usersList, getDeactivateUserId, user } = props;
	const [ refresh, setRefresh ] = useState(true);
	const [ showModal, setShowModal ] = useState(false);
	const [ expandedCards, setExpandedCards ] = useState([]);
	const [ userDeactivateId, setUserDeactivateId ] = useState(false);

	useEffect(
		function storeResponse() {
			getUserList(onGetUserListFailure);
		},
		[ refresh ]
	);

	const deactivateUserSuccess = () => {

	};

	const deactivateUserFailure = () => {

	};

	const onGetUserListFailure = () => {
		// alert('Network error');
	};

	useEffect(function storeResponse() {}, [ usersList ]);

	const handleClick = user => {
		navigation.navigate('UpdateMembers', { userdata: user });
	};

	const handleDeleteUser = () => {
		let data = {
			user_id: userDeactivateId
		};
		getDeactivateUserId(data, deactivateUserSuccess, deactivateUserFailure);
		setRefresh(!refresh);
		setShowModal(false);
	};

	const handleModal = userDeactivateId => {
		setShowModal(true), setUserDeactivateId(userDeactivateId);
	};

	const changeExpandedCards = index => {
		if (expandedCards.indexOf(index) !== -1) {
			let cards = [ ...expandedCards ];
			cards.splice(cards.indexOf(index), 1);
			setExpandedCards(cards);
		} else {
			setExpandedCards([ ...expandedCards, index ]);
		}
	};

	const _renderMemberCards = ({ item, index }) => {
		return (
			<TouchableOpacity
				style={ {
					...styles.cardContainer,
					...{
						height: expandedCards && expandedCards.indexOf(index) !== -1 ? 120 : 90
					}
				} }
				activeOpacity={ 0.8 }
				onPress={ () => changeExpandedCards(index) }>
				<View row style={ styles.cardContent }>
					<View jC={ 'flex-start' }>
						<Image
							style={ styles.profileImage }
							source={ require('../../assets/profile.png') }
						/>
					</View>
					<View row center jC={ 'space-between' } style={ styles.titleContainer }>
						<View>
							<Text style={ styles.expandedTitle }>{item.first_name} {item.last_name}</Text>
							<Text style={ styles.expandedSubTitle }>User ID: {item.username}</Text>
							{
								expandedCards && expandedCards.indexOf(index) !== -1 &&
								<>
									<Text style={ styles.expandedSubTitle }>Relation: {item.user_profile[0].relationship}</Text>
									<Text style={ styles.expandedSubTitle }>DOB: {item.date_of_birth && moment(item.date_of_birth).format('MMM-DD-YYYY')}</Text>
								</>
							}
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
								activeOpacity={ 0.8 }	
								onPress={ () => handleClick(item) }
							>
								<Icon
									type={ 'MaterialCommunityIcons' }
									name={ 'pencil' }
									color={ 'black' }
									size={ 20 }
								/>
								<Text style={ styles.editText }>Edit</Text>
							</TouchableOpacity>
							<TouchableOpacity 
								activeOpacity={ 0.8 }
								onPress={ () =>  handleModal(item.id) }
								style={ styles.deleteContainer }>
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

	return (
		<View style={ styles.container }>
			<View style={ styles.listContainer }>
				{
					usersList && usersList.length > 0 ?
					<FlatList
						data={ usersList }
						renderItem={ _renderMemberCards }
						keyExtractor={ (item, index) => `${index}` }
						showsVerticalScrollIndicator={ false }
					/>
					:
					<Text style={ styles.noMemberText }>No Members Found.</Text>
				}
			</View>

			<Modal transparent={ true } visible={ showModal }>
				<View style={ styles.modalWrap }>
					<LinearGradient
						start={ { x: 0.4, y: 0.1 } }
						end={ { x: 0.8, y: 1.1 } }
						colors={ [ '#0F8E79', '#66CC80' ] }
						style={ styles.successModalTextWrap }>
						<View style={ styles.successTextWrap }>
							<TouchableOpacity onPress={ () => setShowModal(false) }>
								<Image
									source={ require('../../assets/cross.png') }
									style={ styles.closeIcon }
								/>
							</TouchableOpacity>

							<Image
								source={ require('../../assets/bin-icon.png') }
								style={ styles.successIcon }
							/>
							<Text style={ styles.successModalText }>
								Are you sure want to delete the items
							</Text>
						</View>
						<View style={ styles.modalButtonContainer }>
							<TouchableOpacity
								style={ styles.continueButton }
								onPress={ handleDeleteUser }>
								<Text style={ styles.continueButtonText }>Yes</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={ styles.continueButton }
								onPress={ () => setShowModal(false) }>
								<Text style={ styles.continueButtonText }>No</Text>
							</TouchableOpacity>
						</View>
					</LinearGradient>
				</View>
			</Modal>
			{
				user.user_type === 'PRIMARY-PATIENT' &&
				<TouchableOpacity
					style={ styles.fabButton }
					activeOpacity={ 0.8 }
					onPress={ () => navigation.navigate('UpdateMembers', { userdata: '' }) }
				>
					<Icon type={ 'MaterialCommunityIcons' } name="plus" size={ 30 } color="#ffffff" />
				</TouchableOpacity>
			}
		</View>
	);
}

function mapStateToProps(state) {
	return {
		usersList: state.journal.usersList,
		user: state.user.user
	};
}

export default connect(
	mapStateToProps,
	{
		getUserList,
		getDeactivateUserId
	}
)(FamilyMembers);
