import React from 'react';

import UserQuestionForm from '../forms/UserQuestionForm';

function UserQuestion(props) {
	return <UserQuestionForm { ...props } />;
}

export default UserQuestion;
