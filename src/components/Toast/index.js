import React from 'react';
import { Modal, View, Image, TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

function Toast(props) {
    const { 
        showModal, 
        handleSubmit,
        showClose,
        handleCancel,
        title, 
        message, 
        successButtontext } = props;

    return (
        <Modal transparent={ true } visible={ showModal }>
            <View style={ styles.modalWrap }>
                <LinearGradient
                    start={ { x: 0.4, y: 0.1 } }
                    end={ { x: 0.8, y: 1.1 } }
                    colors={ [ '#0F8E79', '#66CC80' ] }
                    style={ styles.successModalTextWrap }>
                    <View style={ styles.successTextWrap }>
                        {
                            showClose &&
                            <TouchableOpacity onPress={ handleCancel }>
                                <Image
                                    source={ require('../../assets/cross.png') }
                                    style={ styles.closeIcon }
                                />
                            </TouchableOpacity>
                        }

                        <Image
                            source={ require('../../assets/success.png') }
                            style={ styles.successIcon }
                        />
                        <Text style={ styles.successModalText1 }>{title}</Text>
                        <Text style={ styles.successModalText2 }>
                            {message}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={ styles.continueButton }
                        onPress={ handleSubmit }>
                        <Text style={ styles.continueButtonText }>{successButtontext}</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </Modal>
    );
}

export default Toast;