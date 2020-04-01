import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './style';

function TextInputField(props) {
	return (
		<TouchableOpacity style={ styles.button } onPress={ props.handleSubmit }>
			<Text style={ styles.buttonText }>login</Text>
		</TouchableOpacity>
	);
}

export default TextInputField;
