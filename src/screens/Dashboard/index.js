import React from 'react';
import { connect } from 'react-redux';

import Profile from '../../components/Profile';
import DoctorDashboard from '../../components/DoctorDashboard';

function Dashboard(props) {
	const { userRole } = props;

	return (
		userRole === 'DOCTOR' 
		? <DoctorDashboard { ...props } />
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
)(Dashboard);
