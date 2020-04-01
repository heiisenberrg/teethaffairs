import React from 'react';
import { View, Text, TextInput } from 'react-native';

import styles from './style';

function NormalTextInput(props) {
	return (
		<View>
			<Text style={ styles.label1 }>{props.lable}</Text>
			<TextInput
				style={ styles.textInput1 }
				placeholder={ props.placeholder }
				onChangeText={ props.onChangeText }
				value={ props.value }
				onBlur={ props.onBlur }
				secureTextEntry={ props.secureTextEntry }
				keyboardType={ props.keyboardType }
			/>
			<Text style={ styles.errorText }>{props.error}</Text>
		</View>
	);
}

export default NormalTextInput;
