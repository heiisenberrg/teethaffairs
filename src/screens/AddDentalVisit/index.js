import React from 'react';
import { View } from 'react-native';

import DentalVisit from '../../components/DentalVisit';

import styles from './styles';

function AddDentalVisit(props) {
	return (
		<View style={ styles.container }>
			<DentalVisit { ...props } />
		</View>
	);
}

export default AddDentalVisit;
