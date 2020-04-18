import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	Image,
	KeyboardAvoidingView,
	TouchableOpacity,
	SafeAreaView,
	ScrollView
} from 'react-native';

import { Formik } from 'formik';
import * as yup from 'yup';

import styles from './styles';
import globalStyles from '../../globalStyles';

import TextInputBoxField from '../textInputs/TextInputBoxField';

import store from '../../state/store';

/* eslint-disable no-undef */
const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

const noteSchema = yup.object({
	description: yup.string().required(),
	title: yup.string().required()
});

function Profile(props) {
	const { navigation } = props;
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');

	const handleSubmit = userNotes => {
		navigation.navigate('AddQuestion', { data: userNotes });
	};

	useEffect(function() {
		setFirstName(store.getState().user.first_name);
		setLastName(store.getState().user.last_name);
	}, []);

	return (
		<SafeAreaView style={ styles.container }>
			<KeyboardAvoidingView
				behavior="position"
				keyboardVerticalOffset={ keyboardVerticalOffset }>
				<ScrollView>
					<Text style={ styles.profileNameContainer }>
						<Text style={ styles.profileName }>hi! </Text>
						<Text style={ styles.userName }>
							{firstName} {lastName}
						</Text>
					</Text>
					<Text style={ styles.welcomeText }>welcome to teethAffairs</Text>
					<View style={ styles.contentWrapText }>
						<Text style={ styles.contentText }>
							Now you can add family members to keep track of their dental
							habits, dental visit, journal and ask questions to a real dentist
							24/7.
						</Text>
						<Text style={ styles.contentText }>
							Answer provided within 24 hrs.
						</Text>
					</View>
					<View style={ styles.imageStyle }>
						<View style={ styles.imageContainer }>
							<View style={ styles.imageWrap1 }>
								<View style={ styles.contentWrap }>
									<Image
										source={ require('../../assets/addmembers.png') }
										onPress={ () => navigation.navigate('AddMembers') }
									/>
									<Text
										style={ styles.imageContent }
										onPress={ () => navigation.navigate('AddMembers') }>
										members
									</Text>
								</View>
							</View>
							<View style={ styles.imageWrap2 }>
								<View style={ styles.contentWrap }>
									<Image source={ require('../../assets/alarm.png') } />
									<Text style={ styles.imageContent }>Blush/Floss Reminder</Text>
								</View>
							</View>
							<View style={ styles.imageWrap3 }>
								<View style={ styles.contentWrap }>
									<Image source={ require('../../assets/note.png') } />
									<Text style={ styles.imageContent }>notes</Text>
								</View>
							</View>
						</View>
					</View>
					<View style={ styles.centerContainer }>
						<Formik
							initialValues={ { description: '', title: '' } }
							validationSchema={ noteSchema }
							onSubmit={ (values, actions) => {
								actions.resetForm();
								handleSubmit(values);
							} }>
							{props => (
								<View>
									<Text style={ styles.questionHeaderText }>
										What's going on with your teeth?
									</Text>
									<TextInputBoxField
										multiline
										lable="Enter your Dental/Oral issue"
										placeholder={
											'Example: I have a swelling that is painful, \nstarted last night.'
										}
										onChangeText={ props.handleChange('title') }
										value={ props.values.title }
										onBlur={ props.handleBlur('title') }
										secureTextEntry={ false }
										error={ props.touched.title && props.errors.title }
									/>
									<TextInputBoxField
										multiline
										lable="Notes"
										placeholder={
											'Example: busy with office project and deadline, would like to come in next month unless its an emergency or if this can be resolved with meds'
										}
										onChangeText={ props.handleChange('description') }
										value={ props.values.description }
										onBlur={ props.handleBlur('description') }
										secureTextEntry={ false }
										error={
											props.touched.description && props.errors.description
										}
									/>
									<TouchableOpacity
										style={ globalStyles.fullWidthButton }
										onPress={ props.handleSubmit }>
										<Text style={ globalStyles.buttonText }>
											click here for detailed question
										</Text>
									</TouchableOpacity>
								</View>
							)}
						</Formik>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

export default Profile;
