import React from 'react';
import { View, Image , Text } from 'react-native';

import styles from './styles';

function Splash() {
	return (
		<View style={ styles.container }>
			<View style={ styles.logoWrap }>
				<Image source={ require('../../assets/logo-white.png') } style={ styles.logo }/>
				<View style={ styles.companyTextWrap }>
					<Text style={ styles.companyText1 }>TEETH</Text>
					<Text style={ styles.companyText2 }>AFFAIRS</Text>
				</View>
			</View>
		</View>
	);
}

export default Splash;
