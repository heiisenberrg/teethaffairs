import React from 'react';
import { ScrollView } from 'react-native';

import DentalNote from '../../components/DentalNote';

function AddDentalNote(props) {
	return (
		<ScrollView>
			<DentalNote { ...props } />
		</ScrollView>
	);
}

export default AddDentalNote;
