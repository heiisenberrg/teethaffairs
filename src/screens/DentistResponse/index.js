import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/global/Loader';
import DentistResponse from '../../components/DentistResponse';

function DentistResponseScreen(props) {
    const { loading } = props;
    return (
        <>
            <Loader loading={ loading } />
            <DentistResponse { ...props } />
        </>
    );
}

const mapStateToProps = (state) => {
	return {
		loading: state.journal.loading
	};
};

export default connect(
	mapStateToProps,
	null
)(DentistResponseScreen);
