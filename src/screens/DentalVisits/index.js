import React from 'react';
import { connect } from 'react-redux';

import DentalVisit from '../../components/DentalVisit';
import Loader from '../../components/global/Loader';

function DentalVisits(props) {
	const { loading } = props;
	return (
		<>
			<DentalVisit { ...props } />
			<Loader loading={ loading }/>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		loading: state.journal.loading
	};
};

export default connect(mapStateToProps, null)(DentalVisits);
