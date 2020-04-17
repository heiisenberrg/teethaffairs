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
				secureTextEntry={ props.secureTextEntry }
				keyboardType={ props.keyboardType }
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
				secureTextEntry={ props.secureTextEntry }
				keyboardType={ props.keyboardType }
			/>
			<Text style={ styles.errorText }>{props.error}</Text>
		</View>
	);
}

export default TextInputField;
