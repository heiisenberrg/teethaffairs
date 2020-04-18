import React from 'react';

import Profile from '../../components/Profile';

function Dashboard(props) {
	return (<Profile { ...props } />	);
}

export default Dashboard;
