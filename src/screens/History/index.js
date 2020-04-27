import React from 'react';
import { connect } from 'react-redux';

import Profile from '../../components/Profile';
import DoctorHistory from '../../components/DoctorHistory';

function History(props) {
	const { userRole } = props;

	return (
		userRole === 'DOCTOR' 
		? <DoctorHistory { ...props } />
		: <Profile { ...props } />	);
}

const mapStateToProps = (state) => {
	return {
		userRole: state.user.user_type
	};
};

export default connect(
	mapStateToProps,
	null
)(History);
