import React from 'react';
import { connect } from 'react-redux';

import UpdateProfile from '../../components/UpdateProfile';
import DoctorProfile from '../../components/DoctorProfile';

function Profile(props) {
	const { user } = props;

	return (
		user && user.user_type === 'DOCTOR' 
		? <DoctorProfile { ...props } />
		: <UpdateProfile { ...props } />
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user.user
	};
};

export default connect(
	mapStateToProps,
	null
)(Profile);
