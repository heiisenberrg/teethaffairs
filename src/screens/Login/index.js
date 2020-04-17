import React from 'react';

import LoginForm from '../../components/LoginForm';


function Login(props) {
	return (
			<LoginForm { ...props } />
	);
}

export default Login;
