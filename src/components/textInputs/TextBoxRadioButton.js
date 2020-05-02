import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

import { setDoctorDetail }  from '../../state/actions/journal';

 function TextBoxRadioButton(props){
	const [ value, setValue ] = useState(null);
	const { options, setDoctorDetail } = props;

	const onPressHandler = (item) => {
		setValue(item.id);
		setDoctorDetail(item);
	};

	return (
		<View>
			{options.map((item, index) => {
					return<View style={ styles.doctorContainer } key={ index }>
					<View style={ styles.doctorDetailsWrapper }>
						<View style={ styles.profileWrap }>
						<Image
							style={ styles.doctorImage }
							source={ require('../../assets/profile.png') }
						/>
						</View>

						<View style={ styles.doctorDetails }>
							<Text style={ styles.doctorNameText }>Dr. {item.first_name} {item.last_name}</Text>
							<Text style={ styles.doctorAddressText }>
								Dental Care Clinic , New York
							</Text>
						</View>
						<View style={ styles.radioButton }>
							<TouchableOpacity
								style={ styles.circle }
								onPress={ () => onPressHandler(item)	} 
								>
								{value === item.id && (
									<View style={ styles.checkedCircle } />
								)}
							</TouchableOpacity>
						</View>
					</View>
				</View>;
			})}
		</View>
	);
}

export default connect(null, {
	setDoctorDetail
})(TextBoxRadioButton);


const styles = StyleSheet.create({
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
		width: 15,
		height: 15,
		borderRadius: 7,
		backgroundColor: '#66CC80'
	},

	doctorImage: {
		width: 67,
		height: 67
	},
	doctorContainer: {
		borderWidth: 1,
		marginBottom: 10,
		borderColor: '#ffffff',
		backgroundColor: '#ffffff',
		elevation: 10,
		shadowColor: '#000000',
		shadowOpacity: 0.5,
		shadowOffset: {
			height: 1,
			width: 0
		},
		marginTop: 15,
		flex: 1
	},
	doctorDetailsWrapper: {
		flexDirection: 'row',
		padding: 10,
		marginRight: 10,
		flex: 1

	},
	doctorNameText: {
		fontWeight: 'bold',
		textTransform: 'capitalize',
		fontSize: 14,
		color:'#363636',
		marginBottom: 7
	},
	doctorAddressText: {
		textTransform: 'capitalize',	
		fontSize: 12,
		color:'#767676'
	},
	doctorDetails: {
		marginRight: 20,
		marginTop: 10,
		flex: 4
	},
	radioButton: {
		flex: 1,
		justifyContent:'center'
	},
	profileWrap: {
		flex: 2,
		marginRight: 25
	}
});
