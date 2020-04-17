import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
	Image,
	Text,
	View,
	FlatList,
	TouchableOpacity,
	SafeAreaView,
	ScrollView
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import styles from './styles/index';
import { getDentalVisits, setDentalVisits } from '../../state/actions/journal';

function DentalVisit(props) {
	const { getDentalVisits, visits, navigation } = props;

	const [ list, setlist ] = useState([]);
	const [ userId ] = useState('all-users');

	const getDentalVisitsSuccess = (data) => {
		console.log('api success', data);
	};

	useEffect(function storeDentalVisitsListResponse() {
		getDentalVisits(userId, getDentalVisitsSuccess, getDentalVisitsFailure);
	}, []);

	const getDentalVisitsFailure = () => {
		// alert('Network error');
	};

	useEffect(
		function storeDentalVisitsListResponse() {
			setlist(visits);
		},
		[ visits ]
	);

	const _renderDentalVisitCards = (visit) => (
		<View style={ styles.card }>
			<TouchableOpacity style={ styles.cardHeader } activeOpacity={ 0.8 }>
				<Image
					style={ styles.image }
					source={ require('../../assets/profile.png') }
				/>
				<View style={ styles.content }>
					<View style={ styles.noteTitle }>
						<Text style={ styles.title }>{visit.visit_reason}</Text>
					</View>
					<View style={ styles.avatarContent }>
						<Image
							style={ styles.avatar }
							source={ require('../../assets/profile.png') }
						/>
						<Text style={ [ styles.normalText, styles.person ] }>
							{visit.patient}
						</Text>
						<Text style={ styles.normalText }>{visit.issue_start_date}</Text>
					</View>
				</View>
			</TouchableOpacity>
			<View style={ styles.descriptionContainer }>
				<Text style={ styles.description }>{visit.visit_description}</Text>
			</View>
			<ScrollView
				contentContainerStyle={ styles.reportContainer }
				horizontal={ true }
				showsHorizontalScrollIndicator={ false }>
				{visit.media &&
					visit.media.length > 0 &&
					visit.media.map((item, index) => (
						<Image
							key={ `index_${index}` }
							style={ styles.imageReport }
							source={ {
								uri: item.media
							} }
						/>
					))}
			</ScrollView>
		</View>
	);

	return (
		<>
			<View style={ styles.divider } />
			<TouchableOpacity style={ styles.filter } activeOpacity={ 0.8 }>
				<View style={ styles.filterWrapper }>
					<Image
						style={ styles.avatar }
						source={ require('../../assets/profile.png') }
					/>
					<Text style={ styles.normalText }>All Users</Text>
					<Image
						style={ [ styles.avatar, styles.filterArrow ] }
						source={ require('../../assets/profile.png') }
					/>
				</View>
			</TouchableOpacity>
			<View style={ styles.container }>
				<SafeAreaView style={ styles.cardContainer }>
					{list && list.length !== 0 ? (
						<FlatList
							data={ list }
							renderItem={ ({ item }) => _renderDentalVisitCards(item) }
							keyExtractor={ (item) => item.id }
						/>
					) : (
						<View style={ styles.emptyResult }>
							<Text>No Dental Visits Found</Text>
						</View>
					)}
					<TouchableOpacity
						style={ styles.fabButton }
						activeOpacity={ 0.8 }
						onPress={ () => navigation.navigate('CreateDentalVisit') }>
						<AntDesignIcon name="plus" size={ 30 } color="#ffffff" />
					</TouchableOpacity>
				</SafeAreaView>
			</View>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		visits: state.journal.visits
	};
};

export default connect(mapStateToProps, {
	getDentalVisits,
	setDentalVisits
})(DentalVisit);
