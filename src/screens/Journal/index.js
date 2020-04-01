import React from 'react';
import { View } from 'react-native';

import DentalNoteBlock from '../../components/DentalNoteBlock';
import DentalVisitBlock from '../../components/DentalVisitBlock';
import DentalHistoryBlock from '../../components/DentalHistoryBlock';

import styles from './styles';

function Journal(props) {
	return (
		<View style={ styles.container }>
			<DentalNoteBlock { ...props } />
			<DentalVisitBlock { ...props } />
			<DentalHistoryBlock { ...props } />
		</View>
	);
}

export default Journal;
