import React, { useState, useEffect } from 'react';
import {
    Text, TouchableOpacity, Image, ScrollView, FlatList
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import View from '../global/View';
import Icon from '../global/Icon';

import styles from './styles';
import { getHistoryQuestions } from '../../state/actions/doctor';

var answered = 0;
var rejected = 0;

const DoctorHistory = props => {
	const { questions, getHistoryQuestions, navigation } = props;
	const [ list, setList ] = useState([]);
	const [ filterBy, setFilterBy ] = useState('answered');
	const [ length, setLength ] = useState( { answered: '', rejected: '' } );

	useEffect(() => {
		getHistoryQuestions(() => { }, () => {});
	}, [ filterBy ]);

	useEffect(() => {
		filterList(filterBy);
	}, [ questions ]);
	
	const filterList = type => {
		if(questions) {
			let arrayLength = { ...length };
			arrayLength[type] = (type === 'answered') ? questions.answered.length : questions.rejected.length;
			setLength(arrayLength);
			setList((type === 'answered') ? [ ...questions.answered ] : [ ...questions.rejected ]);
			rejected = (questions.rejected).length;
			answered = (questions.answered).length;
		}	
	};

	const enableDentalQuestionView = data => {
		navigation.navigate('DentistResponse', { data: data });
  };

    const _renderDentalVisitCards = ({ item: question, index }) => (
		<TouchableOpacity
			key={ `cards-${index}` }
			style={ styles.card }
			activeOpacity={ 0.8 }
			onPress={ () => enableDentalQuestionView(question) }
		>
			<View
				style={ styles.cardHeader }
			>
				<View style={ styles.circleWrapper }>
					<Icon
						type={ 'Ionicons' }
						name={ 'ios-chatbubbles' }
						size={ 24 }
					/>
				</View>
				<View style={ styles.content }>
					<View style={ styles.noteTitle }>
						<Text style={ styles.title }>{question.title}</Text>
					</View>
					<View style={ styles.avatarContent }>
						<Image
							style={ styles.avatar }
							source={ question?.patient_pic?.profile_pic ? { uri: question.patient_pic.profile_pic } : require('../../assets/profile.png') }
						/>
						<Text style={ [ styles.normalText, styles.person ] }>{question.patient_name}</Text>
						<Text style={ styles.normalText }>{moment(question.question_asked_on).format('DD MMM YYYY')}</Text>
					</View>
				</View>
			</View>
			<View style={ styles.descriptionContainer }>
				<Text style={ styles.description }>{question.description}</Text>
			</View>
			<ScrollView
				contentContainerStyle={ styles.reportContainer }
				horizontal={ true }
				showsHorizontalScrollIndicator={ false }
			>
				{
					question.media && question.media.length > 0 && question.media.map((item, index) =>
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
        <View style={ styles.container }>
			<View row  style={ styles.filterContainer }>
				<TouchableOpacity
					style={ [ styles.buttonWrapper, (filterBy === 'answered' ? styles.answeredButton : styles.answeredInactive) ] }
					activeOpacity={ 0.8 }
					onPress={ () => [ setFilterBy('answered'), filterList('answered') ] }
				>
					<Text style={ [ styles.buttonText, (filterBy === 'rejected' && styles.inactiveAnswer) ] }>Answered({answered})</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={ [ styles.buttonWrapper, (filterBy === 'rejected' ? styles.rejectedButton : styles.rejectedInactive) ] }
					activeOpacity={ 0.8 }
					onPress={ () => [ setFilterBy('rejected'), filterList('rejected') ] }
				>
					<Text style={ [ styles.buttonText, (filterBy === 'answered' && styles.inactiveReject ) ] }>Rejected({rejected})</Text>
				</TouchableOpacity>
			</View>
            {
                list && list.length > 0 ?
                    <FlatList
                        style={ styles.questionContainer }
						data={ list }
						extraData = { list }
                        renderItem={ _renderDentalVisitCards }
                        keyExtractor={ item => item.id }
                        showsVerticalScrollIndicator={ false }
                    />
                    :
                    <View style={ styles.emptyResult }>
                        <Text>No Teledental Questions.</Text>
                    </View>
            }
        </View>
    );
};

const mapStateToProps = (state) => ({
    questions: state.doctor.historyQuestions
});

export default connect(
	mapStateToProps,
	{ getHistoryQuestions }
)(DoctorHistory);
