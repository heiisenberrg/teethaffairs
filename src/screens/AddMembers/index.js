import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/global/Loader';
import FamilyMembers from '../../components/FamilyMembers';

function AddMembers(props) {
	const { loading } = props;
	return (
		<>
			<FamilyMembers { ...props } />
			<Loader loading={ loading } />
		</>
	);
}

function mapStateToProps(state) {
	return {
		loading: state.journal.loading || state.user.loading
	};
}

export default connect(mapStateToProps, null)(AddMembers);
