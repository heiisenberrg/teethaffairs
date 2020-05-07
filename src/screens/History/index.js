import React from 'react';
import { connect } from 'react-redux';

import UserHistory from '../../components/UserHistory';
import DoctorHistory from '../../components/DoctorHistory';

function History(props) {
	const { user } = props;

	return (
		user && user.user_type === 'DOCTOR' 
		? <DoctorHistory { ...props } />
		: <UserHistory { ...props } />	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user.user
	};
};

export default connect(
	mapStateToProps,
	null
)(History);
