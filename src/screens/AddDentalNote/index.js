import React from 'react';
import { connect } from 'react-redux';
import DentalNote from '../../components/DentalNote';
import Loader from '../../components/global/Loader';

function AddDentalNote(props) {
	const { loading } = props;
	return (
		<>
			<Loader loading={ loading } />
			<DentalNote { ...props } />
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		loading: state.journal.loading || state.user.loading
	};
};

export default connect(mapStateToProps, null)(AddDentalNote);
