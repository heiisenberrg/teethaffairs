import React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import styles from './styles';
import NormalTextInput from '../../components/textInputs/NormalTextInput';

import globalStyles from '../../globalStyles';
function ContactUs(props) {
	return (
		<View style={ styles.container }>
			<KeyboardAvoidingView enabled>
				<View style={ styles.queriesContainer }>
					<Text style={ styles.header }>If you have any Queries</Text>
					<Text style={ styles.decription }>
						Please Fill the Below Details and click the submit button Our
						TeethAffairs admin will respond to your registered Email Id
					</Text>
				</View>
				<View style={ styles.formContainer }>
					<NormalTextInput lable="Description" secureTextEntry={ false } />
					<NormalTextInput
						lable="Phone"
						secureTextEntry={ false }
						keyboardType="numeric"
					/>
					<NormalTextInput lable="Email Id" secureTextEntry={ false } />
					<View style={ styles.buttonWrap }>
						<TouchableOpacity
							style={ globalStyles.secondaryButton }
							onPress={ props.handleSubmit }>
							<Text style={ globalStyles.buttonText }>Submit</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default ContactUs;
