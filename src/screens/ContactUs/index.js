import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import * as yup from 'yup';
import styles from './styles';
import TextInputField from '../../components/textInputs/TextInputField';
import { submitContactUs } from '../../state/actions/user';
import globalStyles from '../../globalStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const contactSchema = yup.object({
	name: yup
		.string()
		.min(1)
		.trim()
		.required(),
	description: yup
		.string()
		.trim()
		.required(),
	email: yup
		.string()
		.trim()
		.email()
		.required('Invalid Email')
		.matches(
			/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
			'Is not in correct format'
		),
	phone: yup.string().trim()
});

function ContactUs(props) {
	const { submitContactUs } = props;

	const handleSubmit = (values, actions) => {
		submitContactUs(values);
		actions.resetForm();
	};

	return (
		<ScrollView contentContainerStyle={ styles.container }>
			<View style={ styles.queriesContainer }>
				<Text style={ styles.header }>If you have any Queries</Text>
				<Text style={ styles.description }>
					Please fill the below details and click the submit button. Our
					TeethAffairs admin will respond to your registered Email Id.
				</Text>
			</View>
			<ScrollView>
				<Formik
					initialValues={ {
						name: '',
						description: '',
						email: '',
						phone: ''
					} }
					enableReinitialize
					validationSchema={ contactSchema }
					onSubmit={ (values, actions) => {
						handleSubmit(values, actions);
					} }>
					{props => (
						<KeyboardAwareScrollView showsVerticalScrollIndicator={ false }>
							<View style={ styles.formContainer }>
								<TextInputField
									lable="Name"
									placeholder="Enter Name"
									onChangeText={ props.handleChange('name') }
									value={ props.values.name }
									onBlur={ props.handleBlur('name') }
									error={ props.touched.name && props.errors.name }
									secureTextEntry={ false }
								/>
								<TextInputField
									lable="Description"
									placeholder="Enter Description"
									onChangeText={ props.handleChange('description') }
									value={ props.values.description }
									onBlur={ props.handleBlur('description') }
									error={ props.touched.description && props.errors.description }
									secureTextEntry={ false }
								/>
								<TextInputField
									lable="Phone"
									placeholder="Enter Phone"
									onChangeText={ props.handleChange('phone') }
									value={ props.values.phone }
									onBlur={ props.handleBlur('phone') }
									error={ props.touched.phone && props.errors.phone }
									secureTextEntry={ false }
									keyboardType="numeric"
								/>
								<TextInputField
									lable="Email"
									placeholder="Enter Email"
									onChangeText={ props.handleChange('email') }
									value={ props.values.email }
									onBlur={ props.handleBlur('email') }
									error={ props.touched.email && props.errors.email }
									keyboardType="email-address"
									secureTextEntry={ false }
								/>
								<View>
									<TouchableOpacity
										style={ globalStyles.secondaryButton }
										onPress={ props.handleSubmit }>
										<Text style={ globalStyles.buttonText }>Submit</Text>
									</TouchableOpacity>
								</View>
							</View>
						</KeyboardAwareScrollView>
					)}
				</Formik>
			</ScrollView>
		</ScrollView>
	);
}

export default connect(
	null,
	{
		submitContactUs
	}
)(ContactUs);
