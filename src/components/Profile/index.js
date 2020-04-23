import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	Image,
	KeyboardAvoidingView,
	TouchableOpacity,
	ScrollView
} from 'react-native';

import { Formik } from 'formik';
import * as yup from 'yup';

import styles from './styles';
import globalStyles from '../../globalStyles';

import TextInputBoxField from '../textInputs/TextInputBoxField';
import Icon from '../global/Icon';

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
	const [ isLoading, setIsLoading ] = useState(true);

	const handleSubmit = userNotes => {
		navigation.navigate('AddQuestion', { data: userNotes });
	};

	useEffect(function() {
		setFirstName(store.getState().user.first_name);
		setLastName(store.getState().user.last_name);
		if (store.getState().user.access !== '') {
			setIsLoading(false);
		}
	}, []);

	return (
		<KeyboardAvoidingView
			behavior="padding"
			keyboardVerticalOffset={ keyboardVerticalOffset }>
			{isLoading === false ? (
				<ScrollView
					showsVerticalScrollIndicator={ false }
					contentContainerStyle={ styles.container }>
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
							<TouchableOpacity
								style={ styles.imageWrap1 }
								onPress={ () => navigation.navigate('AddMembers') }>
								<View style={ styles.contentWrap }>
									<Icon type={ 'FontAwesome5' } name={ 'users' } size={ 35 } />
									<Text style={ styles.imageContent }>members</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								style={ styles.imageWrap2 }
								onPress={ () => navigation.navigate('ListReminder') }>
								<View style={ styles.contentWrap }>
									<Image source={ require('../../assets/alarm.png') } />
									<Text style={ styles.imageContent }>Blush/Floss Reminder</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								style={ styles.imageWrap3 }
								onPress={ () => navigation.navigate('AddDentalNote') }>
								<View style={ styles.contentWrap }>
									<Icon
										type={ 'FontAwesome5' }
										name={ 'notes-medical' }
										size={ 35 }
									/>
									<Text style={ styles.imageContent }>notes</Text>
								</View>
							</TouchableOpacity>
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
									<View>
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
										<View style={ styles.buttonContainer }>
											<TouchableOpacity
												style={ globalStyles.fullWidthButton }
												onPress={ props.handleSubmit }>
												<Text style={ globalStyles.buttonText }>
													click here for detailed question
												</Text>
											</TouchableOpacity>
										</View>
									</View>
								</View>
							)}
						</Formik>
					</View>
				</ScrollView>
			) : (
				<Text>Loading....</Text>
			)}
		</KeyboardAvoidingView>
	);
}

export default Profile;
