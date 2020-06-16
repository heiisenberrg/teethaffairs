import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import DentalNoteBlock from '../../components/DentalNoteBlock';
import DentalVisitBlock from '../../components/DentalVisitBlock';
import DentalHistoryBlock from '../../components/DentalHistoryBlock';
import Loader from '../../components/global/Loader';

import styles from './styles';

function Journal(props) {
	const { loading } = props;
	return (
		<>
			<View style={ styles.container }>
				<DentalNoteBlock { ...props } />
				<DentalVisitBlock { ...props } />
				<DentalHistoryBlock { ...props } />
			</View>
			<Loader loading = { loading } />
		</>
	);
}

const mapStateToProps = state => {
	return {
		loading: state.journal.loading || state.user.loading
	};
};

export default connect(
	mapStateToProps, null
)(Journal);
