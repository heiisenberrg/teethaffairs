import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default class TextBoxRadioButton extends Component {
	state = {
		value: null
	};

	render() {
		const { options } = this.props;
		const { value } = this.state;

		return (
			<View style={ styles.container }>
				{options.map(item => {
					return (
						<View key={ item.key } style={ styles.doctorContainer }>
							<View style={ styles.doctorDetailsWrapper }>
								<Image
									style={ styles.doctorImage }
									source={ require('../../assets/profile.png') }
								/>
								<View style={ styles.doctorDetails }>
									<Text style={ styles.doctorNameText }>dr. noem sellin</Text>
									<Text style={ styles.doctorAddressText }>
										dental care clinic, New York
									</Text>
								</View>
								<View style={ styles.radioButton }>
									<TouchableOpacity
										style={ styles.circle }
										onPress={ () => {
											this.setState({
												value: item.key
											});
										} }>
										{value === item.key && (
											<View style={ styles.checkedCircle } />
										)}
									</TouchableOpacity>
								</View>
							</View>
						</View>
					);
				})}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column'
	},

	circle: {
		height: 20,
		width: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#66CC80',
		alignItems: 'center',
		justifyContent: 'center'
	},

	checkedCircle: {
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor: '#66CC80'
	},

	doctorImage: {
		width: 70,
		height: 70,
		marginRight: 20
	},
	doctorContainer: {
		borderWidth: 1,
		borderColor: 'green',
		marginBottom: 10
	},
	doctorDetailsWrapper: {
		flexDirection: 'row',
		padding: 10,
		marginRight: 10
	},
	doctorNameText: {
		fontWeight: 'bold',
		textTransform: 'capitalize',
		fontSize: 15
	},
	doctorAddressText: {
		textTransform: 'capitalize',
		fontSize: 15
	},
	doctorDetails: {
		marginRight: 20,
		marginTop: 10
	},
	radioButton: {
		marginTop: 20
	}
});
