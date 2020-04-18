import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

function CustomButton(props) {
	return (
		<View style={ props.custom_style === true ?	styles.choices : styles.choices1 }>
			<TouchableOpacity
				style={
					props.button === 'activeButton'
						? styles.activeButton
						: styles.issueButton
				}
				onPress={ props.onPress }
				value={ props.value }
				onBlur={ props.onBlur }
				secureTextEntry={ props.secureTextEntry }>
				<Text
					style={
						props.button === 'activeButton'
							? styles.activeButtonText
							: styles.issueButtonText
					}>
					{props.place_of_issue}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	issueButton: {
		padding: 5,
		backgroundColor: 'white',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#A1A1A1',
		width: 80,
		marginBottom: 10,
		marginTop: 10
	},
	issueButtonText: {
		color: 'grey',
		textAlign: 'center',
		fontSize: 13,
		textTransform: 'capitalize'
	},

	activeButtonText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 13,
		textTransform: 'capitalize'
	},

	choices: {
		marginRight: 10
	},
	choices1:{
		flex:1
	},
	activeButton: {
		padding: 5,
		backgroundColor: '#33D197',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#12A46E',
		width: 80,
		marginBottom: 10,
		marginTop: 10
	}
});

export default CustomButton;
