import React from 'react';
import { View } from 'react-native';

import Profile from '../../components/Profile';
import Reminder from '../../components/Reminder';
import Question from '../../components/Question';

import styles from './styles';

function Dashboard(props) {
	return (
		<View style={ styles.container }>
			<Profile { ...props } />
			<Reminder { ...props } />
			<Question { ...props } />
		</View>
	);
}

export default Dashboard;
