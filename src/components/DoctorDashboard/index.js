import React, { useState, useEffect } from 'react';
import {
	Text,
	TouchableOpacity,
	Image,
	ScrollView,
	FlatList,
	BackHandler,
	Alert
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import View from '../global/View';
import Icon from '../global/Icon';

import styles from './styles';
import { getQuestions } from '../../state/actions/doctor';
import { useIsFocused } from '@react-navigation/native';
import Video from 'react-native-video';

const DoctorDashboard = props => {
	const {
		user: { first_name, last_name },
		questions,
		navigation,
		getQuestions
	} = props;
	const [ list, setList ] = useState([]);
	const isFocused = useIsFocused();

	useEffect(() => {
		getQuestions(() => {}, () => {});
	}, [ isFocused ]);

	useEffect(() => {
		setList(questions);
	}, [ questions ]);

	const enableDentalQuestionView = data => {
		navigation.navigate('RemoteConsultationRequest', { data });
	};

	const _renderDentalVisitCards = question => (
		<TouchableOpacity
			style={ styles.card }
			activeOpacity={ 0.8 }
			onPress={ () => enableDentalQuestionView(question) }>
			<View style={ styles.cardHeader }>
				<View style={ styles.circleWrapper }>
					<Icon type={ 'Ionicons' } name={ 'ios-chatbubbles' } size={ 24 } />
				</View>
				<View style={ styles.content }>
					<View style={ styles.noteTitle }>
						<Text style={ styles.title }>{question.title}</Text>
					</View>
					<View style={ styles.avatarContent }>
						<Image
							style={ styles.avatar }
							source={
								question.patient_pic.profile_pic
									? { uri: question.patient_pic.profile_pic }
									: require('../../assets/profile.png')
							}
						/>
						<Text style={ [ styles.normalText, styles.person ] }>
							{question.patient_name}
						</Text>
						<Text style={ styles.normalText }>
							{moment(question.question_asked_on).format('DD MMM YYYY')}
						</Text>
					</View>
				</View>
			</View>
			<View style={ styles.descriptionContainer }>
				<Text style={ styles.description }>{question.description}</Text>
			</View>
			<ScrollView
				contentContainerStyle={ styles.reportContainer }
				horizontal={ true }
				showsHorizontalScrollIndicator={ false }>
				{question.media &&
					question.media.length > 0 &&
					question.media.map((item, index) =>
						(item.mime_type === 'application/octet-stream' ? (
							<Video
								key={ `index_${index}` }
								style={ styles.imageReport }
								source={ {
									uri: item.media
								} }
							/>
						) : (
							<Image
								key={ `index_${index}` }
								style={ styles.imageReport }
								source={ {
									uri: item.media
								} }
							/>
						))
					)}
			</ScrollView>
		</TouchableOpacity>
	);

	const _renderListHeaderComponent = () => {
		return (
			<>
				<Text style={ styles.profileNameContainer }>
					<Text style={ styles.profileName }>hi! </Text>
					<Text style={ styles.userName }>
						{first_name} {last_name}
					</Text>
				</Text>
				<Text style={ styles.welcomeText }>welcome to teethAffairs</Text>
			</>
		);
	};

	useEffect(() => {
		const backAction = () => {
			Alert.alert('Hold on!', 'Are you sure you want to exit App.', [
				{
					text: 'Cancel',
					onPress: () => null,
					style: 'cancel'
				},
				{ text: 'YES', onPress: () => BackHandler.exitApp() }
			]);
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction
		);
		return () => backHandler.remove();
	}, []);

	return (
		<View style={ styles.container }>
			<View column jC={ 'center' } style={ styles.wrapper }>
				{list && list.length !== 0 ? (
					<FlatList
						style={ styles.questionContainer }
						ListHeaderComponent={ () => _renderListHeaderComponent() }
						data={ list }
						renderItem={ ({ item }) => _renderDentalVisitCards(item) }
						keyExtractor={ item => item.id }
						showsVerticalScrollIndicator={ false }
					/>
				) : (
					<View>
						<Text style={ styles.emptyResult }>
							No Teledental Questions To Answer
						</Text>
					</View>
				)}
			</View>
		</View>
	);
};

const mapStateToProps = state => ({
	questions: state.doctor.questions,
	user: state.user.user
});

export default connect(
	mapStateToProps,
	{ getQuestions }
)(DoctorDashboard);
