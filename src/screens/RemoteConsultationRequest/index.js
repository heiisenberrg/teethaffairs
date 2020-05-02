import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/global/Loader';
import RemoteConsultationRequest from '../../components/RemoteConsultationRequest';

function RemoteConsultation(props) {
    const { loading } = props;
    return (
        <>
            <Loader loading={ loading } />
            <RemoteConsultationRequest { ...props } />
        </>
    );
}

const mapStateToProps = (state) => {
	return {
		loading: state.doctor.loading
	};
};

export default connect(
	mapStateToProps,
	null
)(RemoteConsultation);
