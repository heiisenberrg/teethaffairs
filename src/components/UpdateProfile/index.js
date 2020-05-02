import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native';
import View from '../global/View';
import { connect } from 'react-redux';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Formik } from 'formik';
import * as yup from 'yup';

import styles from './styles';
import passwordStyle from '../textInputs/style';
import globalStyles from '../../globalStyles/index';
import TextInputField from '../textInputs/TextInputField';
import calender from '../../assets/calender.png';

const profileSchema = yup.object({
    zipcode: yup.string(),
    email: yup.string(), //office email,
	first_name: yup.string(),
    last_name: yup.string()
});

const UpdateProfile = (props) => {
    const { user } = props;
    
    const imageOptions = {
        title: 'Profile Photo',
        customButtons: [
            { name: 'image', title: 'Take a Photo' }
        ],
        chooseFromLibraryButtonTitle: 'Choose from gallery',
        takePhotoButtonTitle: null
    };
    
    const [ profileImage, setProfileImage ] = useState({ uri: user.profile_pic });
    const doesUserProfileExists = () => user && user.user_profile && user.user_profile.length > 0;
    const [ initialValues, setInitialValues ] = useState({});
    const [ showEye, setShowEye ] = useState(true);
    const [ date, setDate ] = useState(new Date());
	const [ mode, setMode ] = useState('date');
	const [ show, setShow ] = useState(false);
	const [ birthDate, setBirthDate ] = useState(user.date_of_birth);

    useEffect(() => {
        if(doesUserProfileExists()) {
            const values = {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name
            };
            setInitialValues(values);
        }
        setProfileImage({ uri: user.profile_pic });
    }, [ user ]);

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
				setProfileImage(source);
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
				setProfileImage(source);
			}
		});
    };

    const handleOnSave = () => {
        // const data = {
            // first_name: values.first_name,
            // last_name: values.first_name,
            // phone: 'string',
            // email: values.email,
            // zipcode: [
            //   '621001'
            // ],
            // profile: {
            //   city: values.city,
            //   state: values.state,
            //   office_name: values.office_name,
            //   office_phone: values.office_phone,
            //   office_address1: values.office_address1,
            //   office_address2: values.office_address2,
            //   office_tax_id: values.office_tax_id,
            //   license_exp_date: values.license_exp_date,
            //   license_no: values.licence_no,
            //   routing_number: values.routing_routing_number,
            //   account_number: values.account_number
            // }
        // };
    };

    const onChange = (event, selectedDate) => {
		setShow(Platform.OS === 'ios');

		var currentDate = '';
		if (selectedDate !== undefined && selectedDate !== '') {
			var date = new Date(selectedDate).toISOString();
			setBirthDate(date);
			currentDate = selectedDate;
		} else {
			setBirthDate('');
			currentDate = new Date();
		}

		setDate(currentDate);
	};

	const showMode = currentMode => {
		setShow(true);
		setMode(currentMode);
	};

    const passwordHandler = () => {
		setShowEye(!showEye);
	};

    const showDatepicker = () => {
		showMode('date');
	};

    return (
        <ScrollView 
            showsVerticalScrollIndicator={ false }
            contentContainerStyle={ styles.background }
        >
            <TouchableOpacity
                activeOpacity={ 0.8 }
                onPress={ takeImageHandler }
                style={ styles.imageWrapper }
            >
                <View style={ styles.imageContainer }>
                    <Image 
                        source={ profileImage ? { uri: profileImage.uri } : require('../../assets/profile.png') }
                        style={ styles.image }
                    />
                </View>
            </TouchableOpacity>
            <Formik
                initialValues={ initialValues }
                enableReinitialize
                validationSchema={ profileSchema }
                onSubmit={ values => {
                    handleOnSave(values);
                } }
            >
                {
                    props => (
                        <View style={ styles.container }>
                            <View style={ styles.content }>
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
                                    placeholder="Enter Email"
                                    onChangeText={ props.handleChange('email') }
                                    value={ props.values.email }
                                    onBlur={ props.handleBlur('email') }
                                    error={ props.touched.email && props.errors.email }
                                    secureTextEntry={ false }
                                />
                                <View style={ passwordStyle.textInputContainer }>
                                    <View style={ passwordStyle.labelContainer }>
                                        <Text style={ passwordStyle.label }>Password</Text>
                                    </View>
                                    <TextInput
                                        style={ passwordStyle.textInput }
                                        placeholder="Enter Your Password"
                                        onChangeText={ props.handleChange('password') }
                                        value={ props.values.password }
                                        onBlur={ props.handleBlur('password') }
                                        secureTextEntry={ showEye ? true : false }
                                    />
                                    <TouchableOpacity
                                        onPress={ passwordHandler }
                                        style={ styles.eyeIcon }>
                                        {showEye ? (
                                            <AntDesignIcon name="eye" size={ 17 } color="#5C5C5C" />
                                        ) : (
                                            <AntDesignIcon name="eyeo" size={ 17 } color="#5C5C5C" />
                                        )}
                                    </TouchableOpacity>
                                    {props.touched.password && props.errors.password ? (
                                        <Text style={ passwordStyle.errorText }>
                                            {props.errors.password}
                                        </Text>
                                    ) : (
                                        <Text style={ passwordStyle.errorText } />
                                    )}
                                </View>
                                <View style={ styles.textInputContainer }>
									<View style={ styles.labelContainer }>
										<Text style={ styles.label }>Date of birth</Text>
									</View>
									<TouchableOpacity
										style={ styles.dataPicker }
										onPress={ showDatepicker }>
										{birthDate !== '' ? (
											<Text style={ styles.calenderText }>{moment(birthDate).format('MMM/DD/YYYY')}</Text>
										) : (
											<Text style={ styles.calenderText }>
												Month / Date / Year
											</Text>
										)}
										<Image source={ calender } style={ styles.calenderStyle } />
									</TouchableOpacity>
								</View>
								<Text style={ styles.errorText }>
									{props.touched.date_of_birth && props.errors.date_of_birth}
								</Text>
								{show && (
									<DateTimePicker
										testID="dateTimePicker"
										timeZoneOffsetInMinutes={ 0 }
										value={ date }
										mode={ mode }
										display="default"
										onChange={ onChange }
										neutralButtonLabel="clear"
									/>
								)}
                            </View>
                            <TouchableOpacity
                                style={ globalStyles.secondaryButton }
                                onPress={ props.handleSubmit }
                                activeOpacity={ 0.8 }
                            >
                                <Text style={ globalStyles.buttonText }>save</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </Formik>
        </ScrollView>
    );
};

const mapStateToProps = (state) => {
	return {
        userRole: state.user.user_type,
        user: state.user.user
	};
};

export default connect(
	mapStateToProps,
	null
)(UpdateProfile);
