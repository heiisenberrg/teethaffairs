import React from 'react';

import LoginForm from '../../components/LoginForm';
import Loader from '../../components/global/Loader';
import { connect } from 'react-redux';

function Login(props) {
	const { loading } = props;
	return (
		<>
			<LoginForm { ...props } />
			<Loader loading = { loading } />
		</>
	);
}

const mapStateToProps = (state) => ({
	loading: state.user.loading
});

export default connect(mapStateToProps, null)(Login);
