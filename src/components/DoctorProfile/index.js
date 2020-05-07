import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import View from '../global/View';
import Icon from '../global/Icon';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

import { Formik } from 'formik';
import * as yup from 'yup';

import styles from './styles';
import globalStyles from '../../globalStyles/index';
import TextInputField from '../textInputs/TextInputField';
import RNFetchBlob from 'rn-fetch-blob';

import { getMyProfile, uploadProfilePicture } from '../../state/actions/user';
import { updateDoctorProfile } from '../../state/actions/doctor';

const profileSchema = yup.object({
    office_name: yup.string(),
    office_address1: yup.string(),
    office_address2: yup.string(),
    office_tax_id: yup.string(),
    zipcode: yup.string(),
    email: yup.string(), //office email,
    office_phone: yup.string(),
    
	first_name: yup.string(),
    last_name: yup.string(),
    personal_email: yup.string(),
    license_exp_date: yup.string(),
    license_no: yup.string(),
    account_number: yup.string(),
    routing_number: yup.string()
});

const DoctorProfile = (props) => {
    const { navigation, getMyProfile, user, updateDoctorProfile, uploadProfilePicture } = props;
    
    const imageOptions = {
        title: 'Profile Photo',
        customButtons: [
            { name: 'image', title: 'Take a Photo' }
        ],
        chooseFromLibraryButtonTitle: 'Choose from gallery',
        takePhotoButtonTitle: null
    };
    
    const [ showOfficeSection, setShowOfficeSection ] = useState(false);
    const [ showPersonalSection, setShowPersonalSection ] = useState(false);
    const [ showBankSection, setShowBankSection ] = useState(false);

    const [ profileImage, setProfileImage ] = useState({ uri: user.profile_pic });
    const doesUserProfileExists = () => user && user.user_profile && user.user_profile.length > 0;
    const [ licenceImage ] = useState(doesUserProfileExists() && user.user_profile[0].license_img);
    const [ initialValues, setInitialValues ] = useState({});

    useEffect(() => {
        getMyProfile();
    }, []);

    useEffect(() => {
        if(doesUserProfileExists()) {
            const values = {
                office_name:  user.user_profile[0].office_name,
                office_address1:  user.user_profile[0].office_address1,
                office_address2:  user.user_profile[0].office_address2,
                office_tax_id:  user.user_profile[0].office_tax_id,
                city:  user.user_profile[0].city,
                state:  user.user_profile[0].state,
                zipcode: '',
                email: user.email,
                office_phone: '',
        
                first_name: user.first_name,
                last_name: user.last_name,
                licence_no:  user.user_profile[0].license_no,
                license_exp_date:  user.user_profile[0].license_exp_date,
                routing_number: '',
                account_number: '',
                media: [ {
                    media: licenceImage
                } ]
        
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
			if (response.didCancel) {
			} else if (response.error) {
			} else if (response.customButton) {
			} else {
				let source = {
					...response
				};
                setProfileImage(source);
                saveProfilePhoto(source);
			}
		});
	};

	const takeImageHandler = () => {
		ImagePicker.showImagePicker(imageOptions, response => {
			if (response.didCancel) {
			} else if (response.error) {
			} else if (response.customButton) {
				launchCamera();
			} else {
				let source = {
					...response
				};
                setProfileImage(source);
                saveProfilePhoto(source);
			}
		});
    };

    const saveProfilePhoto = (item) => {
        const data = [
            {
                name: 'profile_pic',
                filename: `profile${Date.now()}`,
                data: Platform.OS === 'android' ? RNFetchBlob.wrap(item.uri) :  RNFetchBlob.wrap(item.uri.replace('file://', '')),
                type: item.type
            }
        ];
        uploadProfilePicture(data);
    };

    const handleOnSave = (values) => {
        const data = {
            first_name: values.first_name,
            last_name: values.first_name,
            phone: 'string',
            email: values.email,
            zipcode: [
              '621001'
            ],
            profile: {
              city: values.city,
              state: values.state,
              office_name: values.office_name,
              office_phone: values.office_phone,
              office_address1: values.office_address1,
              office_address2: values.office_address2,
              office_tax_id: values.office_tax_id,
              license_exp_date: values.license_exp_date,
              license_no: values.licence_no,
              routing_number: values.routing_routing_number,
              account_number: values.account_number
            }
        };
        updateDoctorProfile(data, () => {
            navigation.goBack();
        }, () => {});
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
                            <View style={ styles.profileWrapper }>
                                <View style={ styles.sectionWrapper }>
                                    <TouchableOpacity
                                        style={ styles.officeWrapper }
                                        activeOpacity={ 0.8 }
                                        onPress={ () => setShowOfficeSection(!showOfficeSection) }
                                    >
                                        <Text style={ styles.title }>Office Details</Text>
                                        <View row jC={ 'space-between' } style={ styles.circleWrapper }>
                                            <Icon
                                                type={ 'Ionicons' }
                                                name={ !showOfficeSection ? 'md-arrow-dropright' : 'md-arrow-dropdown' }
                                                size={ 22 }
                                                color={ 'grey' }
                                            />
                                        </View>
                                    </TouchableOpacity>
                                    {
                                        showOfficeSection &&
                                        <View style={ styles.content }>
                                            <TextInputField
                                                lable="Office Name"
                                                placeholder="Enter Office Name"
                                                onChangeText={ props.handleChange('office_name') }
                                                value={ props.values.office_name }
                                                onBlur={ props.handleBlur('office_name') }
                                                error={ props.touched.office_name && props.errors.office_name }
                                                secureTextEntry={ false }
                                            />
                                            <TextInputField
                                                lable="Office street address 1"
                                                placeholder="Enter Address Line 1"
                                                onChangeText={ props.handleChange('office_address1') }
                                                value={ props.values.office_address1 }
                                                onBlur={ props.handleBlur('office_address1') }
                                                error={ props.touched.office_address1 && props.errors.office_address1 }
                                                secureTextEntry={ false }
                                            />
                                            <TextInputField
                                                lable="Office street address 2"
                                                placeholder="Enter Address Line 2"
                                                onChangeText={ props.handleChange('office_address2') }
                                                value={ props.values.office_address2 }
                                                onBlur={ props.handleBlur('office_address2') }
                                                error={ props.touched.office_address2 && props.errors.office_address2 }
                                                secureTextEntry={ false }
                                            />
                                            <TextInputField
                                                lable="Office Tax ID"
                                                placeholder="Enter Office Tax ID"
                                                onChangeText={ props.handleChange('office_tax_id') }
                                                value={ props.values.office_tax_id }
                                                onBlur={ props.handleBlur('office_tax_id') }
                                                error={ props.touched.office_tax_id && props.errors.office_tax_id }
                                                secureTextEntry={ false }
                                            />
                                            <TextInputField
                                                lable="City"
                                                placeholder="Enter City"
                                                onChangeText={ props.handleChange('city') }
                                                value={ props.values.city }
                                                onBlur={ props.handleBlur('city') }
                                                error={ props.touched.city && props.errors.city }
                                                secureTextEntry={ false }
                                            />
                                            <TextInputField
                                                lable="State"
                                                placeholder="Enter State"
                                                onChangeText={ props.handleChange('state') }
                                                value={ props.values.state }
                                                onBlur={ props.handleBlur('state') }
                                                error={ props.touched.state && props.errors.state }
                                                secureTextEntry={ false }
                                            />
                                            <TextInputField
                                                lable="Zipcode"
                                                placeholder="Enter Zipcode"
                                                onChangeText={ props.handleChange('zipcode') }
                                                value={ props.values.zipcode }
                                                onBlur={ props.handleBlur('zipcode') }
                                                error={ props.touched.zipcode && props.errors.zipcode }
                                                secureTextEntry={ false }
                                            />
                                            <TextInputField
                                                lable="Office Email"
                                                placeholder="Enter Office Email"
                                                onChangeText={ props.handleChange('email') }
                                                value={ props.values.email }
                                                onBlur={ props.handleBlur('email') }
                                                error={ props.touched.email && props.errors.email }
                                                secureTextEntry={ false }
                                            />
                                            <TextInputField
                                                lable="Office Phone No"
                                                placeholder="Enter Office Phone Number"
                                                onChangeText={ props.handleChange('state') }
                                                value={ props.values.state }
                                                onBlur={ props.handleBlur('state') }
                                                error={ props.touched.state && props.errors.state }
                                                secureTextEntry={ false }
                                            />
                                        </View>
                                    }
                                </View>
                                <View style={ styles.sectionWrapper }>
                                    <TouchableOpacity
                                        style={ styles.officeWrapper }
                                        activeOpacity={ 0.8 }
                                        onPress={ () => setShowPersonalSection(!showPersonalSection) }
                                    >
                                        <Text style={ styles.title }>Personal Details</Text>
                                        <View row jC={ 'space-between' } style={ styles.circleWrapper }>
                                            <Icon
                                                type={ 'Ionicons' }
                                                name={ !showPersonalSection ? 'md-arrow-dropright' : 'md-arrow-dropdown' }
                                                size={ 22 }
                                                color={ 'grey' }
                                            />
                                        </View>
                                    </TouchableOpacity>
                                    {
                                        showPersonalSection &&
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
                                                lable="Licence No"
                                                placeholder="Enter licence number"
                                                onChangeText={ props.handleChange('licence_no') }
                                                value={ props.values.licence_no }
                                                onBlur={ props.handleBlur('licence_no') }
                                                error={ props.touched.licence_no && props.errors.licence_no }
                                                secureTextEntry={ false }
                                            />
                                            <TextInputField
                                                lable="Expiration Date"
                                                placeholder="Enter expiry date"
                                                onChangeText={ props.handleChange('license_exp_date') }
                                                value={ props.values.license_exp_date }
                                                onBlur={ props.handleBlur('license_exp_date') }
                                                error={ props.touched.license_exp_date && props.errors.license_exp_date }
                                                secureTextEntry={ false }
                                            />
                                            <ScrollView
                                                contentContainerStyle={ styles.licenceContainer }
                                                horizontal={ true }
                                                showsHorizontalScrollIndicator={ false }
                                            >
                                                {
                                                    props.values.media && props.values.media.map((item, index) =>
                                                        <Image
                                                            key={ `index_${index}` }
                                                            style={ styles.imageReport }
                                                            source={ {
                                                                uri: item.media
                                                            } }
                                                        />
                                                    )
                                                }
                                            </ScrollView>
                                        </View>
                                    }
                                </View>
                                <View style={ styles.sectionWrapper }>
                                    <TouchableOpacity
                                        style={ styles.officeWrapper }
                                        activeOpacity={ 0.8 }
                                        onPress={ () => setShowBankSection(!showBankSection) }
                                    >
                                        <Text style={ styles.title }>Bank Details(for Reimbursement)</Text>
                                        <View row jC={ 'space-between' } style={ styles.circleWrapper }>
                                            <Icon
                                                type={ 'Ionicons' }
                                                name={ !showBankSection ? 'md-arrow-dropright' : 'md-arrow-dropdown' }
                                                size={ 22 }
                                                color={ 'grey' }
                                            />
                                        </View>
                                    </TouchableOpacity>
                                    {
                                        showBankSection &&
                                        <View style={ styles.content }>
                                            <TextInputField
                                                lable="Routing No"
                                                placeholder="Enter Routing Number"
                                                onChangeText={ props.handleChange('routing_number') }
                                                value={ props.values.routing_number }
                                                onBlur={ props.handleBlur('routing_number') }
                                                error={ props.touched.routing_number && props.errors.routing_number }
                                                secureTextEntry={ false }
                                            />
                                            <TextInputField
                                                lable="Account No"
                                                placeholder="Enter Account Number"
                                                onChangeText={ props.handleChange('account_number') }
                                                value={ props.values.account_number }
                                                onBlur={ props.handleBlur('account_number') }
                                                error={ props.touched.account_number && props.errors.account_number }
                                                secureTextEntry={ false }
                                            />
                                            <TextInputField
                                                lable="Confirm Account No"
                                                placeholder="Enter Confirm Account No"
                                                onChangeText={ props.handleChange('confirm_account_no') }
                                                value={ props.values.confirm_account_no }
                                                onBlur={ props.handleBlur('confirm_account_no') }
                                                error={ props.touched.confirm_account_no && props.errors.confirm_account_no }
                                                secureTextEntry={ false }
                                            />
                                        </View>
                                    }
                                </View>
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
        user: state.user.user
	};
};

export default connect(
	mapStateToProps,
	{ getMyProfile, updateDoctorProfile, uploadProfilePicture }
)(DoctorProfile);
