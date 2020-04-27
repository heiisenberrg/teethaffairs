import React from 'react';
import RemoteConsultationRequest from '../../components/RemoteConsultationRequest';

function RemoteConsultation(props) {
    return (
        <RemoteConsultationRequest { ...props } /> 
    );
}

export default RemoteConsultation;