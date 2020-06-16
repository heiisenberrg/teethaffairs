import React from 'react';
import { View, Text, TextInput, Image } from 'react-native';

import styles from './style';
import passwordIcon from '../../assets/password-icon.png';

function TextInputField(props) {
	return props.passwordIcon === true ? (
		<View style={ styles.textInputContainer }>
			<View style={ styles.labelContainer }>
				<Text style={ styles.label }>{props.lable}</Text>
			</View>

			<TextInput
				style={ styles.textInput }
				placeholder={ props.placeholder }
				onChangeText={ props.onChangeText }
				value={ props.value }
				onBlur={ props.onBlur }
				editable={ props.editable }
				secureTextEntry={ props.secureTextEntry }
				keyboardType={ props.keyboardType }
				textAlignVertical="top"
			/>
			<Image source={ passwordIcon } style={ styles.searchIcon } />
			<Text style={ styles.errorText }>{props.error}</Text>
		</View>
	) : (
		<View style={ styles.textInputContainer }>
			<View style={ styles.labelContainer }>
				<Text style={ styles.label }>{props.lable}</Text>
			</View>

			<TextInput
				style={ styles.textInput }
				placeholder={ props.placeholder }
				onChangeText={ props.onChangeText }
				value={ props.value }
				onBlur={ props.onBlur }
				editable={ props.editable }
				secureTextEntry={ props.secureTextEntry }
				keyboardType={ props.keyboardType }
				textAlignVertical="top"
				editable={ props.editable }
			/>
			<Text style={ styles.errorText }>{props.error}</Text>
		</View>
	);
}

export default TextInputField;
