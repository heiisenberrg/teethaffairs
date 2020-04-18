import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Image, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

import styles from './styles/index';

// import DentalNoteForm from './../forms/DentalNoteForm';

import { fetchNotes , setNotes } from '../../state/actions/journal';

function DentalNote(props) {

	const { fetchNotes, notes } = props;

	const [ list, setlist ] = useState([]);


	const onGetNotesSuccess = data => {
		console.log('api success', data);
	};
	
	useEffect(function storeNoteListResponse() {
		fetchNotes(onGetNotesSuccess, onGetNotesListFailure);
	}, []);

	const onGetNotesListFailure = () => {
		// alert('Network error');
	};

	useEffect(function storeNoteListResponse() {
		setlist(notes);
	}, [ notes ]);


	const _renderNoteCards = (item) => (
		<TouchableOpacity
			style={ styles.card }
			activeOpacity={ 0.8 }
		>
			<Image
				style={ styles.image }
				source={ require('../../assets/profile.png') }
			/>
			<View style={ styles.content }>
				<View style={ styles.noteTitle }>
					<Text style={ styles.title }>{item.description}</Text>
					<Text style={ styles.normalText }>{item.issue_start_date}</Text>
				</View>
				<View style={ styles.avatarContent }>
					<Image
						style={ styles.avatar }
						source={ require('../../assets/profile.png') }
					/>	
					<Text style={ [ styles.normalText, styles.person ] }>{item.patient}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);

	return (
		<>
			<View style={ styles.divider } />
			<TouchableOpacity 
				style={ styles.filter }
				activeOpacity={ 0.8 }
			>
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

				<SafeAreaView
					style={ styles.cardContainer }
				>
					<FlatList
						data={ list }
						renderItem={ ({ item }) => _renderNoteCards(item) }
						keyExtractor={ item => item.id }
					/>
					{/* <DentalNoteForm {...props} /> */}
					<TouchableOpacity 
						style={ styles.fabButton }
						activeOpacity={ 0.8 }
					>
						<Image
							style={ styles.fabIcon }
							source={ require('../../assets/round-plus.png') }
						/>
					</TouchableOpacity>
				</SafeAreaView>
			</View>
		</>
	);
}


const mapStateToProps = (state) => {
	return {
		notes: state.journal.notes
	};
};

export default connect(mapStateToProps, {
	fetchNotes,
	setNotes
})(DentalNote);
