import React, { useState, useEffect } from 'react';
import {
    Text, TouchableOpacity, Image, ScrollView, FlatList
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import View from '../global/View';
import Icon from '../global/Icon';

import styles from './styles';
import { getQuestions } from '../../state/actions/doctor';

const DoctorHistory = props => {
    const { questions, getQuestions } = props;

	const [ list, setList ] = useState([]);
	const [ filterBy, setFilterBy ] = useState('answered');
	const [ length, setLength ] = useState( { answered: '', rejected: '' } );

    useEffect(() => {
        getQuestions(() => { }, () => {});
    }, []);

    useEffect(() => {
		filterList('answered');
	}, [ questions ]);
	
	const filterList = type => {
		let data = [];
		console.warn('list---->>>>', list);
		questions.map((item) => {
			if (type === 'answered' && item.responded) {
               data.push(item);
			} else if (type === 'rejected' && item.rejected) {
				data.push(item);
			}
		});
		let arrayLength = { ...length };
		arrayLength[type] = data.length;
		setLength(arrayLength);
		console.warn('inside data===>>>>', data);
		setList(data);
	};

    const _renderDentalVisitCards = ({ item: question, index }) => (
		<TouchableOpacity
			key={ `cards-${index}` }
			style={ styles.card }
			activeOpacity={ 0.8 }
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
							source={ question.patient_pic.profile_pic ? { uri: question.patient_pic.profile_pic } : require('../../assets/profile.png') }
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
            {/* <View column center style={ styles.questionContainer }> */}
			<View row  style={ styles.filterContainer }>
				<TouchableOpacity
					style={ [ styles.buttonWrapper, (filterBy === 'answered' ? styles.answeredButton : styles.answeredInactive) ] }
					activeOpacity={ 0.8 }
					onPress={ () => [ setFilterBy('answered'), filterList('answered') ] }
				>
					<Text style={ [ styles.buttonText, (filterBy === 'rejected' && styles.inactiveAnswer) ] }>Answered({length.answered})</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={ [ styles.buttonWrapper, (filterBy === 'rejected' ? styles.rejectedButton : styles.rejectedInactive) ] }
					activeOpacity={ 0.8 }
					onPress={ () => [ setFilterBy('rejected'), filterList('rejected') ] }
				>
					<Text style={ [ styles.buttonText, (filterBy === 'answered' && styles.inactiveReject ) ] }>Rejected({length.rejected})</Text>
				</TouchableOpacity>
			</View>
            {
                list && list.length !== 0 ?
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
                        <Text>No Teledental Questions To Answer</Text>
                    </View>
            }
            {/* </View> */}
        </View>
    );
};

const mapStateToProps = (state) => ({
    questions: state.doctor.questions
});

export default connect(
	mapStateToProps,
	{ getQuestions }
)(DoctorHistory);