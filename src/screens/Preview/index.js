import React from 'react';
import { connect } from 'react-redux';
import NotePreview from '../../components/NotePreview';
import Loader from '../../components/global/Loader';

function Preview(props) {
	const { loading } = props;

	return (
	<>
		<NotePreview { ...props } />
		<Loader loading={ loading }/>
	</>);
}

const mapStateToProps = (state) => {
	return {
		loading: state.journal.loading
	};
};

export default connect(mapStateToProps, null)(Preview);
