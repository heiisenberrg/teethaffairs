import React from 'react';
import { View } from 'react-native';

import DentalHistoryForm from '../forms/DentalHistoryForm';

function UserDentalHistory(props) {
	return (
		<View>
			<DentalHistoryForm { ...props } />
		</View>
	);
}

export default UserDentalHistory;
