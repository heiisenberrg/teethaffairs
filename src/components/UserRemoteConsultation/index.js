import React, { useState, useEffect } from 'react';
import {
	KeyboardAvoidingView,
	Image,
	TextInput,
	Switch,
	TouchableOpacity,
	ScrollView,
	Dimensions,
	FlatList
} from 'react-native';

import { connect } from 'react-redux';

import { Formik } from 'formik';
import * as yup from 'yup';

import TextBoxRadioButton from '../textInputs/TextBoxRadioButton';
import View from '../global/View';
import Text from '../global/Text';
import Icon from '../global/Icon';
import Toast from '../../components/Toast';
import { getDoctorsList, getQuestion } from '../../state/actions/journal';

import styles from './styles';
import globalStyles from '../../globalStyles';
import FlashMessage from '../global/FlashMessage';
import { getCards } from '../../state/actions/payment';
import { CommonActions } from '@react-navigation/native';

/* eslint-disable no-mixed-spaces-and-tabs */

var allergies_array = [];

const userNoteSchema = yup.object({
	height: yup.number().required('Required'),
	weight: yup.number().required('Required'),
	age: yup.number().required('Required'),
	allergies: yup.array(),
	medications: yup.array(),
	medical_conditions: yup.array(),
	id: yup.string(),
	zipcode: yup.string()
});

const cardBrands = {
	visa: '#1FE9A7',
	mastercard: '#119989',
	default: '#0BE3DF'
};

const drugs = [
	'Amoxicilin 500',
	'Amoxicilin 250',
	'Amoxicilin 250 liq',
	'Amoxicilin prophy',
	'Augumentin 800',
	'Clindamycin 150',
	'Ibuprofen 800',
	'Motrin 800',
	'Paracetamol 650',
	'Stemitil MD',
	'Zintac'
];

const medicalConditions = [
	'Diabetes',
	'Blood Pressure',
	'High Blood Pressure',
	'Respiratory Issues',
	'Digestive Issues',
	'Thyroid Issues',
	'Heart Issues'
];

function UserRemoteConsultation(props) {
	const {
		route,
		getDoctorsList,
		doctors_list,
		getQuestion,
		doctor,
		user,
		getCards,
		cards,
		navigation
	} = props;

	const [ showHistoryForm, setShowHistoryForm ] = useState(true);
	const [ isEnabled, setIsEnabled ] = useState(false);
	const [ allergiesList, setAllergiesList ] = useState([]);
	const [ textInputHolder, setTextInputHolder ] = useState('');
	const [ userNoteId, setUserNoteId ] = useState('');
	const [ userZipCode, setUserZipCode ] = useState('');
	const [ selectedCardId, setSelectedCardId ] = useState('');
	const [ showModal, setShowModal ] = useState(false);
	const [ showDropDown, setShowDropDown ] = useState(false);
	const [ selectedDrugs, setSelectedDrugs ] = useState([]);
	const [ selectedMedicalConditions, setMedicalConditionsList ] = useState([]);
	const [ filteredDrugs, setFilteredDrugs ] = useState([]);
	const [ searchValue, setSearchValue ] = useState('');

	const toggleSwitch = () => setIsEnabled(previousState => !previousState);

	const handleSubmit = data => {
		const updateNoteData = {
			height: data.height,
			weight: data.weight,
			allergies: allergiesList,
			age: data.age,
			medical_conditions: selectedMedicalConditions,
			medications: selectedDrugs
		};
		const question_data = {
			patient_zipcode: userZipCode,
			doctor_zipcode: userZipCode,
			doctor: doctor.id,
			card_id: selectedCardId
		};
		if (doctor && doctor.id && userZipCode) {
			getQuestion(
				{
					data: updateNoteData,
					question_data,
					userNoteId
				},
				onSuccess,
				onFailure
			);
		} else {
			FlashMessage.message('Alert', 'Please select a dentist', '#33b5e5');
		}
	};

	const filterDrugs = value => {
		let filteredDrugs = drugs;
		if (value !== '') {
			filteredDrugs = [];
			drugs.map(x => {
				if (x.includes(value)) {
					filteredDrugs.push(x);
				}
			});
		}
		setFilteredDrugs(filteredDrugs);
		setShowDropDown(true);
	};

	const selectDrug = item => {
		let data = [ ...selectedDrugs ];
		if (data.indexOf(item) !== -1) {
			data.splice(data.indexOf(item), 1);
		} else {
			data.push(item);
		}
		setSelectedDrugs(data);
	};

	const selectMedicalCondition = item => {
		let data = [ ...selectedMedicalConditions ];
		if (data.indexOf(item) !== -1) {
			data.splice(data.indexOf(item), 1);
		} else {
			data.push(item);
		}
		setMedicalConditionsList(data);
	};

	const handleToastSuccess = () => {
		setShowModal(false);
		navigation.popToTop();
		navigation.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [ { name: 'AppTabs', key: 'Home' } ]
			})
		);
		navigation.navigate('Home');
	};

	const onSuccess = () => {
		setShowModal(true);
	};

	const onFailure = () => {
		alert('Somthing went wrong!');
	};

	useEffect(function() {
		if (user && user.zipcodes && user.zipcodes.length > 0) {
			setUserZipCode(user.zipcodes[0]);
			getDoctorsList({ pincode: user.zipcodes[0] }, onFailure);
		}
		getUserNoteId();
		getCards();
	}, []);

	const getUserNoteId = () => {
		setUserNoteId(route.params.id);
	};

	const joinData = () => {
		if (textInputHolder !== '') {
			allergies_array.push(textInputHolder);
			setAllergiesList(allergies_array);
			setTextInputHolder('');
		}
	};

	const onRemoveHandler = remove_item => {
		allergies_array = allergies_array.filter(data =>
			(data !== remove_item ? data : '')
		);
		setAllergiesList(allergies_array);
		setTextInputHolder('');
	};

	const renderPaymentCard = () => {
		return (
			<View style={ styles.carouselContainer }>
				<FlatList
					data={ cards }
					decelerationRate="fast"
					horizontal={ true }
					pagingEnabled={ false }
					showsHorizontalScrollIndicator={ false }
					snapToInterval={ width }
					snapToAlignment="center"
					contentContainerStyle={ styles.scrollContainer }
					onViewableItemsChanged={ onViewRef.current }
					viewabilityConfig={ viewConfigRef.current }
					keyExtractor={ item => item.id }
					renderItem={ renderItem }
				/>
			</View>
		);
	};

	const { width } = Dimensions.get('window');

	const renderItem = ({ item, index }) => {
		return (
			<TouchableOpacity
				key={ `carditem-${index}` }
				style={ {
					...styles.cardContainer,
					...styles.card,
					...{
						backgroundColor: cardBrands[
							item.brand !== '' ? item.brand.toLowerCase() : 'default'
						]
							? cardBrands[
									item.brand !== '' ? item.brand.toLowerCase() : 'default'
							  ]
							: cardBrands.default
					}
				} }>
				<View row jC={ 'flex-end' } style={ styles.m10 }>
					<Text c={ 'white' } w={ 'bold' } s={ 16 }>
						{item.brand}
					</Text>
				</View>
				<View row jC={ 'flex-start' } style={ styles.m15 }>
					<Text c={ 'white' } s={ 40 } w={ 'bold' }>
						.... .... ....{' '}
					</Text>
					<Text c={ 'white' } s={ 20 } w={ 'bold' }>
						{item.last4}
					</Text>
				</View>
				<View row jC={ 'space-between' } style={ styles.details }>
					<View>
						<Text c={ 'white' } s={ 14 } style={ styles.upperCase }>
							Cardholder name
						</Text>
						<Text c={ 'white' } s={ 18 } w={ '500' } style={ styles.mv10 }>
							{item.name}
						</Text>
					</View>
					<View>
						<Text c={ 'white' } s={ 14 } style={ styles.upperCase }>
							Expiry date
						</Text>
						<Text c={ 'white' } s={ 18 } w={ '500' } style={ styles.mv10 }>
							{item.exp_month} / {item.exp_year}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	const onViewRef = React.useRef(({ viewableItems }) => {
		setSelectedCardId(viewableItems[0].item.id);
	});
	const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

	return (
		<View style={ styles.container }>
			<ScrollView>
				<KeyboardAvoidingView enabled>
					<Formik
						initialValues={ {
							height: '',
							weight: '',
							allergies: [],
							age: '',
							id: '',
							zipcode: ''
						} }
						validationSchema={ userNoteSchema }
						onSubmit={ (values, actions) => {
							actions.resetForm();
							handleSubmit(values);
						} }>
						{props => (
							<View>
								<View style={ styles.healthHistoryContainer }>
									<Text style={ styles.healthHistoryText }>health history</Text>
									<View style={ styles.iconViewWrap }>
										<TouchableOpacity
											onPress={ () => setShowHistoryForm(!showHistoryForm) }>
											<View style={ styles.dropdownIconWrapper }>
												<Image
													source={
														showHistoryForm
															? require('../../assets/drop-down.png')
															: require('../../assets/drop-right.png')
													}
													style={ styles.dropdown }
												/>
											</View>
										</TouchableOpacity>
									</View>
								</View>

								{showHistoryForm ? (
									<ScrollView>
										<View style={ styles.histoyrFormBlock }>
											<View style={ styles.textBoxWrapper }>
												<View style={ styles.updateBox }>
													<Text style={ styles.label1 }>Age</Text>
													<TextInput
														style={ styles.textInput1 }
														onChangeText={ props.handleChange('age') }
														value={ props.values.age }
														onBlur={ props.handleBlur('age') }
														secureTextEntry={ false }
														keyboardType="numeric"
													/>
													{props.touched.age && props.errors.age ? (
														<Text style={ styles.errorText }>
															{props.errors.age}
														</Text>
													) : (
														<Text />
													)}
												</View>
												<View style={ styles.updateBox }>
													<Text style={ styles.label1 }>Height</Text>
													<TextInput
														style={ styles.textInput1 }
														onChangeText={ props.handleChange('height') }
														value={ props.values.height }
														onBlur={ props.handleBlur('height') }
														secureTextEntry={ false }
														keyboardType="numeric"
													/>
													{props.touched.height && props.errors.height ? (
														<Text style={ styles.errorText }>
															{props.errors.height}
														</Text>
													) : (
														<Text />
													)}
												</View>
												<View style={ styles.updateBox }>
													<Text style={ styles.label1 }>Weight</Text>
													<TextInput
														style={ styles.textInput1 }
														onChangeText={ props.handleChange('weight') }
														value={ props.values.weight }
														onBlur={ props.handleBlur('weight') }
														secureTextEntry={ false }
														keyboardType="numeric"
													/>
													{props.touched.weight && props.errors.weight ? (
														<Text style={ styles.errorText }>
															{props.errors.weight}
														</Text>
													) : (
														<Text />
													)}
												</View>
											</View>
											<View style={ styles.allergiesBox }>
												<Text style={ styles.label1 }>Allergies:</Text>

												<View style={ styles.MainContainer }>
													<TextInput
														placeholder="Enter Value Here"
														multiline
														onChangeText={ data => setTextInputHolder(data) }
														value={ textInputHolder }
														style={ styles.textInputStyle }
														underlineColorAndroid="transparent"
													/>
													<TouchableOpacity
														onPress={ joinData }
														activeOpacity={ 0.7 }
														style={ styles.button }>
														<Image
															style={ styles.roundButton }
															source={ require('../../assets/round-plus.png') }
														/>
													</TouchableOpacity>
												</View>
												<View style={ styles.dummy1 }>
													{allergiesList.map((data, index) => {
														return (
															<View
																style={ styles.enteredAllergiesBox }
																key={ index }>
																<Text
																	key={ index }
																	style={ styles.enteredAllergies }>
																	{data}
																</Text>
																<Text
																	style={ styles.crossText1 }
																	onPress={ () => onRemoveHandler(data) }>
																	X
																</Text>
															</View>
														);
													})}
												</View>
												<Text style={ styles.infoText }>
													Type none if no allergies
												</Text>
											</View>
											<View style={ styles.m10 }>
												<Text s={ 14 } lh={ 16 } w={ 'bold' } style={ styles.mv5 }>
													Medical Conditions
												</Text>
												<View row style={ styles.mv10 }>
													<View style={ styles.flex }>
														<View style={ styles.medicalConditionContainer }>
															<ScrollView
																automaticallyAdjustContentInsets={ false }
																contentContainerStyle={ styles.flexGrow }
																showsVerticalScrollIndicator={ false }>
																{medicalConditions &&
																	medicalConditions.map((item, index) => {
																		return (
																			<View
																				row
																				key={ `index-${index}` }
																				style={ styles.dropdownContent }>
																				<Text>{item}</Text>
																				<TouchableOpacity
																					style={ {
																						...styles.searchContainer,
																						...{
																							borderColor: '#CAC7C7',
																							backgroundColor:
																								selectedMedicalConditions.indexOf(
																									item
																								) !== -1
																									? '#00C57D'
																									: 'white'
																						}
																					} }
																					onPress={ () =>
																						selectMedicalCondition(item)
																					}>
																					<Icon
																						type={ 'MaterialCommunityIcons' }
																						name={ 'check' }
																						color={ 'white' }
																						size={ 15 }
																					/>
																				</TouchableOpacity>
																			</View>
																		);
																	})}
															</ScrollView>
														</View>
													</View>
												</View>
											</View>
											<View style={ styles.allergiesBox }>
												<View style={ styles.switchWrapper }>
													<Text style={ styles.switchText }>
														Taking any medications
													</Text>
													<Switch
														style={ styles.switchButton }
														trackColor={ { false: 'green' } }
														thumbColor={ isEnabled ? 'white' : 'white' }
														onValueChange={ toggleSwitch }
														value={ isEnabled }
													/>
												</View>
												{isEnabled && (
													<View style={ styles.m10 }>
														<View style={ styles.flex }>
															<FlatList
																numColumns={ 2 }
																data={ selectedDrugs }
																renderItem={ ({ item, index }) => {
																	return (
																		<View
																			key={ `drugs-${index}` }
																			row
																			aI={ 'center' }
																			style={ styles.selectedDrugContent }>
																			<TouchableOpacity
																				style={ styles.m5 }
																				onPress={ () => selectDrug(item) }>
																				<Icon
																					type={ 'MaterialCommunityIcons' }
																					name={ 'close' }
																					color={ 'red' }
																					size={ 18 }
																				/>
																			</TouchableOpacity>
																			<Text>{item}</Text>
																		</View>
																	);
																} }
															/>
														</View>
														<View row style={ styles.mv10 }>
															<View style={ styles.flex }>
																<View row center style={ styles.searchContent }>
																	<TextInput
																		style={ [ styles.p10, styles.flex ] }
																		value={ searchValue }
																		onChangeText={ value => [
																			setSearchValue(value),
																			filterDrugs(value)
																		] }
																	/>
																	<TouchableOpacity
																		style={ styles.m10 }
																		onPress={ () =>
																			setShowDropDown(!showDropDown)
																		}>
																		<Icon
																			type={ 'Ionicons' }
																			name={ 'ios-search' }
																			size={ 18 }
																			color={ 'grey' }
																		/>
																	</TouchableOpacity>
																</View>
																{showDropDown && (
																	<View style={ styles.dropdownContainer }>
																		<ScrollView
																			automaticallyAdjustContentInsets={ false }
																			contentContainerStyle={ styles.flexGrow }
																			showsVerticalScrollIndicator={ false }>
																			{filteredDrugs &&
																				filteredDrugs.map((item, index) => {
																					return (
																						<View
																							row
																							key={ `index-${index}` }
																							style={ styles.dropdownContent }>
																							<Text>{item}</Text>
																							<TouchableOpacity
																								style={ {
																									...styles.searchContainer,
																									...{
																										borderColor: '#CAC7C7',
																										backgroundColor:
																											selectedDrugs.indexOf(
																												item
																											) !== -1
																												? '#00C57D'
																												: 'white'
																									}
																								} }
																								onPress={ () =>
																									selectDrug(item)
																								}>
																								<Icon
																									type={
																										'MaterialCommunityIcons'
																									}
																									name={ 'check' }
																									color={ 'white' }
																									size={ 15 }
																								/>
																							</TouchableOpacity>
																						</View>
																					);
																				})}
																		</ScrollView>
																	</View>
																)}
															</View>
														</View>
													</View>
												)}
											</View>
										</View>
									</ScrollView>
								) : (
									<Text />
								)}
								<View style={ styles.dentistContainer }>
									<Text style={ styles.dentistText }>choose a dentist</Text>
									<TextBoxRadioButton options={ doctors_list } onSuccess />
								</View>
								{renderPaymentCard()}
								<View style={ styles.sendButtonWrapper }>
									<TouchableOpacity
										style={ globalStyles.secondaryButton }
										onPress={ props.handleSubmit }>
										<Text style={ globalStyles.buttonText }>Send Question</Text>
									</TouchableOpacity>
								</View>
							</View>
						)}
					</Formik>
					<Toast
						title="success"
						message="Question sent successfully."
						showModal={ showModal }
						handleSubmit={ handleToastSuccess }
						showClose={ false }
						successButtontext="Ok"
					/>
				</KeyboardAvoidingView>
			</ScrollView>
		</View>
	);
}

function mapStateToProps(state) {
	return {
		doctors_list: state.journal.doctors_list,
		doctor: state.journal.doctor,
		user: state.user.user,
		cards: state.payment.cards
	};
}
export default connect(
	mapStateToProps,
	{
		getDoctorsList,
		getQuestion,
		getCards
	}
)(UserRemoteConsultation);
