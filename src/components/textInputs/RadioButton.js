import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class RadioButtons extends Component {
	render() {
		return (
			<View style={ styles.buttonContainer }>
				<TouchableOpacity
					style={ styles.circle }
					onPress={ this.props.onPress }
					value={ this.props.value }
					onBlur={ this.props.onBlur }
					secureTextEntry={ this.props.secureTextEntry }>
					{this.props.button === 'activeButton' ? (
						<View style={ styles.checkedCircle } />
					) : (
						<Text> </Text>
					)}
				</TouchableOpacity>
				<Text style={ styles.textStyle }>{this.props.type}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row',
		marginBottom: 10,
		marginLeft: 10,
		marginTop: 10
	},
	circle: {
		height: 20,
		width: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#A1A1A1',
		alignItems: 'center',
		justifyContent: 'center'
	},

	checkedCircle: {
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor: '#33D197',
		borderColor: '#A1A1A1'
	},
	textStyle: {
		marginLeft: 10
	}
});
