import React from 'react';
import { View } from 'react-native';

import DentalVisitForm from './../forms/DentalVisitForm';

function DentalVisit(props) {
	return (
		<View>
			<DentalVisitForm { ...props } />
		</View>
	);
}

export default DentalVisit;
