import React from 'react';
import { connect } from 'react-redux';

import UpdateProfile from '../../components/UpdateProfile';
import DoctorProfile from '../../components/DoctorProfile';

function Profile(props) {
	const { userRole } = props;

	return (
		userRole === 'DOCTOR' 
		? <DoctorProfile { ...props } />
		: <UpdateProfile { ...props } />
	);
}

const mapStateToProps = (state) => {
	return {
		userRole: state.user.user_type
	};
};

export default connect(
	mapStateToProps,
	null
)(Profile);
