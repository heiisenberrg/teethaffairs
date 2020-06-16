import React from 'react';
import { connect } from 'react-redux';

import Profile from '../../components/Profile';
import Loader from '../../components/global/Loader';
import DoctorDashboard from '../../components/DoctorDashboard';

function Dashboard(props) {
	const { user, loading } = props;

	return (
		<>
			{
				user && user.user_type === 'DOCTOR' 
				? <DoctorDashboard { ...props } />
				: <Profile { ...props } />
			}
			<Loader loading = { loading } />
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user.user,
		loading: state.doctor.loading || state.reminder.loading
	};
};

export default connect(
	mapStateToProps,
	null
)(Dashboard);
