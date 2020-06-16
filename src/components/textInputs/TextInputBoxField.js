import React from 'react';
import { View, Text, TextInput } from 'react-native';

import styles from './style';
function TextInputBoxField(props) {
	return (
		<View style={ styles.textInputContainer }>
			<View style={ styles.labelContainer }>
				<Text style={ styles.label }>{props.lable}</Text>
			</View>
			<TextInput
				multiline = { props.multiline }
				numberOfLines = { props.numberOfLines }
				editable={ props.editable }
				placeholderTextColor="#B3B3B3"
				style={ styles.boxTextInput }
				placeholder={ props.placeholder }
				onChangeText={ props.onChangeText }
				value={ props.value }
				onBlur={ props.onBlur }
				secureTextEntry={ props.secureTextEntry }
				multiline={ props.multiline }
				autoCapitalize="none"
				textAlignVertical="top"
			/>
			<Text style={ styles.errorText }>{props.error}</Text>
		</View>
	);
}

export default TextInputBoxField;
