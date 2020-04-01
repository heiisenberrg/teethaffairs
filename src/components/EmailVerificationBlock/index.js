import React from 'react';
import EmailVerificationForm from '../forms/EmailVerificationForm';

function EmailVerificationBlock(props) {
	return <EmailVerificationForm { ...props } />;
}

export default EmailVerificationBlock;
