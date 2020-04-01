import React from 'react';
import { View, ScrollView } from 'react-native';

import SignUpForm from '../../components/SignUpForm';

function SignUp(props) {
	return (
		<View>
			<ScrollView>
				<SignUpForm { ...props } />
			</ScrollView>
		</View>
	);
}

export default SignUp;
