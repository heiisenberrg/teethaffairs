import React, { useEffect, useState } from 'react';
import {
	View,
	Image,
	Text,
	ScrollView,
	TouchableOpacity,
	Modal
} from 'react-native';
import { connect } from 'react-redux';

import {
	getUserList,
	setUserList,
	getDeactivateUserId
} from '../../state/actions/journal';

import LinearGradient from 'react-native-linear-gradient';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import styles from './styles';

function FamilyMembers(props) {
	const { navigation, getUserList, usersList, getDeactivateUserId } = props;
	const [ refresh, setRefresh ] = useState(true);
	const [ isModalVisible, setIsModalVisible ] = useState(false);
	const [ userDeactivateId, setUserDeactivateId ] = useState(false);

	useEffect(
		function storeLoginResponse() {
			getUserList(onGetUserListFailure);
		},
		[ refresh ]
	);

	const onGetUserListFailure = () => {
		// alert('Network error');
	};

	useEffect(function storeLoginResponse() {}, [ usersList ]);

	const handleClick = user => {
		navigation.navigate('UpdateMembers', { userdata: user });
	};

	const handleDeleteUser = () => {
		let userData = {
			user_id: userDeactivateId
		};
		getDeactivateUserId(userData, onGetUserListFailure);
		setRefresh(!refresh);
		setIsModalVisible(false);
	};

	const handleModal = userDeactivateId => {
		setIsModalVisible(true), setUserDeactivateId(userDeactivateId);
	};

	return (
		<View style={ styles.container }>
			<View style={ styles.profileContainer }>
				<ScrollView>
					{usersList !== undefined ? (
						usersList.length > 0 ? (
							usersList.map((user, index) => {
								return user.is_active === true ? (
									<View key={ index } style={ styles.membersContainer }>
										{console.log(user)}
										<View style={ styles.profileWrapper }>
											<View style={ styles.profile }>
												<Image
													style={ styles.profileImage }
													source={ require('../../assets/profile.png') }
												/>
											</View>
											<View style={ styles.userContentWrapper }>
												<Text style={ styles.userName }>
													{user.first_name} {user.last_name}
												</Text>
												<Text style={ styles.userEmail }>
													User ID: {user.username}
												</Text>
												<Text style={ styles.userEmail }>
													Relation: {user.relation}
												</Text>
												<Text style={ styles.userEmail }>DOB: {user.dob}</Text>
											</View>
										</View>
										<View style={ styles.editChoice }>
											<View style={ styles.iconContainer }>
												<View style={ styles.image }>
													<AntDesignIcon
														name="edit"
														size={ 13 }
														color="#707070"
														onPress={ () => handleClick(user) }
													/>
													<Text
														style={ styles.editText }
														onPress={ () => handleClick(user) }>
														Edit
													</Text>
												</View>
												<View>
													<View style={ styles.image }>
														<AntDesignIcon
															name="delete"
															size={ 13 }
															color="#FA5050"
															onPress={ () => handleModal(user.id) }
														/>
														<Text
															style={ styles.deleteText }
															onPress={ () => handleModal(user.id) }>
															Delete
														</Text>
													</View>
												</View>
											</View>
										</View>
									</View>
								) : (
									<Text key={ index } style={ styles.hideText } />
								);
							})
						) : (
							<Text style={ styles.noMemberList }>
								Currently you have no registered family members!
							</Text>
						)
					) : (
						<Text style={ styles.hideText } />
					)}
				</ScrollView>
			</View>

			<Modal transparent={ true } visible={ isModalVisible }>
				<View style={ styles.modalWrap }>
					<LinearGradient
						start={ { x: 0.4, y: 0.1 } }
						end={ { x: 0.8, y: 1.1 } }
						colors={ [ '#0F8E79', '#66CC80' ] }
						style={ styles.successModalTextWrap }>
						<View style={ styles.successTextWrap }>
							<TouchableOpacity onPressIn={ () => setIsModalVisible(false) }>
								<AntDesignIcon
									name="close"
									size={ 20 }
									color="#ffffff"
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
								onPress={ () => setIsModalVisible(false) }>
								<Text style={ styles.continueButtonText }>No</Text>
							</TouchableOpacity>
						</View>
					</LinearGradient>
				</View>
			</Modal>

			<View style={ styles.bottom }>
				<TouchableOpacity
					onPress={ () => navigation.navigate('UpdateMembers', { userdata: '' }) }>
					<Image
						style={ styles.button }
						source={ require('../../assets/round-plus.png') }
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}

function mapStateToProps(state) {
	return {
		usersList: state.journal.usersList
	};
}

export default connect(
	mapStateToProps,
	{
		getUserList,
		setUserList,
		getDeactivateUserId
	}
)(FamilyMembers);
