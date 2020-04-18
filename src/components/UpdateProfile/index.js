import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import View from '../global/View';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker';

import { Formik } from 'formik';
import * as yup from 'yup';
import { getUser } from '../../state/actions/user';
import TextInputField from '../textInputs/TextInputField';

import styles from './styles';
import globalStyles from '../../globalStyles';

const imageOptions = {
	title: 'Profile Photo',
	customButtons: [
		{ name: 'image', title: 'Take a Photo' }
	],
	chooseFromLibraryButtonTitle: 'Choose from gallery',
	takePhotoButtonTitle: null
};

const profileSchema = yup.object({
	email: yup
		.string()
		.email()
		.matches(
			/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
			'Is not in correct format'
		)
		.required(),
	first_name: yup.string().required(),
	last_name: yup.string().required(),
	password: yup
		.string()
		.label('Password')
		.required(),
	date_of_birth: yup.string()
});

const UpdateProfile = props => {
    const { getUser } = props;
    const [ imageSource, setImageSource ] = useState(null);
    const [ user, setUser  ] = useState(props.user);

    useEffect(() => {
        getUser((res) => {
            console.log(res);
        }, (error) => {
            console.log(error);
        });
    });

    useEffect(() => {
        setUser(user);
    }, [ user ]);

    const saveProfileInfo = (values) => {
        console.log(values);
    };

    const launchCamera = () => {
		let options = {
			skipBackup: true,
			path: 'images'
		};
		ImagePicker.launchCamera(options, response => {
			console.log('Response = ', response);
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				console.log('response', JSON.stringify(response));
				let source = {
					...response
				};
				setImageSource(source);
			}
		});
	};


	const takeImageHandler = () => {
		ImagePicker.showImagePicker(imageOptions, response => {
			console.log('========image picker=======', response);
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
				launchCamera();
			} else {
				let source = {
					...response
				};
				setImageSource(source);
			}
		});
    };

    return (
        <SafeAreaView style={ styles.container }>
            <KeyboardAvoidingView enabled>
                <TouchableOpacity
                    activeOpacity={ 0.8 }
                    onPress={ takeImageHandler }
                    style={ styles.imageWrapper }
                >
                    <View style={ styles.imageContainer }>
                        <Image 
                            source={ imageSource ? { uri: imageSource.uri } : require('../../assets/profile.png') }
                            style={ styles.image }
                        />
                    </View>
                </TouchableOpacity>
                <Formik
                    initialValues={ {
                        email: user && user.email ? user.email : '',
                        first_name: user && user.first_name ? user.first_name : '',
                        last_name: user && user.last_name ? user.last_name : '',
                        password: user && user.password ? user.password : '',
                        date_of_birth: user && user.date_of_birth ? user.date_of_birth : ''
                    } }
                    validationSchema={ profileSchema }
                    onSubmit={ (values, actions) => {
                        actions.resetForm();
                        saveProfileInfo(values);
                    } }>
                    {props => (
                        <View style={ styles.formWrapper }>
                            <TextInputField
                                lable="First Name"
                                placeholder="Enter First Name"
                                onChangeText={ props.handleChange('first_name') }
                                value={ props.values.first_name }
                                onBlur={ props.handleBlur('first_name') }
                                error={ props.touched.first_name && props.errors.first_name }
                                secureTextEntry={ false }
                            />
                            <TextInputField
                                lable="Last Name"
                                placeholder="Enter Last Name"
                                onChangeText={ props.handleChange('last_name') }
                                value={ props.values.last_name }
                                onBlur={ props.handleBlur('last_name') }
                                error={ props.touched.last_name && props.errors.last_name }
                                secureTextEntry={ false }
                            />
                            <TextInputField
                                lable="Email"
                                placeholder="Enter Email Id"
                                onChangeText={ props.handleChange('email') }
                                value={ props.values.email }
                                onBlur={ props.handleBlur('email') }
                                error={ props.touched.email && props.errors.email }
                                secureTextEntry={ false }
                            />
                            <TextInputField
                                lable="Password"
                                placeholder="Enter Password"
                                onChangeText={ props.handleChange('password') }
                                value={ props.values.password }
                                onBlur={ props.handleBlur('password') }
                                error={ props.touched.password && props.errors.password }
                                secureTextEntry={ true }
                                passwordIcon={ true }
                            />
                            <View style={ styles.datePickerContainer }>
                                <View style={ styles.labelContainer }>
                                    <Text style={ styles.label }>Date Of Birth</Text>
                                </View>

                                <DatePicker
                                    style={ styles.dataPicker }
                                    date={ props.values.date_of_birth }
                                    mode="date"
                                    placeholder="YYYY-MM-DD"
                                    androidMode="spinner"
                                    format="YYYY-MM-DD"
                                    minDate="1900-01-01"
                                    maxDate="3000-01-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={ {
                                        dateIcon: {
                                            position: 'absolute',
                                            right: 0
                                        },
                                        dateInput: {
                                            borderWidth: 1,
                                            borderColor: 'grey',
                                            marginHorizontal: 0,
                                            fontSize: 12,
                                            borderRadius: 20,
                                            width: 200
                                        }
                                    } }
                                    onDateChange={ props.handleChange('date_of_birth') }
                                    onBlur={ props.handleBlur('date_of_birth') }
                                />

                            </View>
                            <View style={ styles.wrapper }>
                                <TouchableOpacity
                                    style={ globalStyles.secondaryButton }
                                    onPress={ props.handleSubmit }>
                                    <Text style={ globalStyles.buttonText }>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

function mapStateToProps(state) {
	return {
		user: state.user.user
	};
}

export default connect(
	mapStateToProps,
	{
		getUser
	}
)(UpdateProfile);
