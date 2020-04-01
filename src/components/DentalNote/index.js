import React from 'react';
import { View } from 'react-native';

import DentalNoteForm from './../forms/DentalNoteForm';

function DentalNote(props) {
	return (
		<View>
			<DentalNoteForm { ...props } />
		</View>
	);
}

export default DentalNote;
