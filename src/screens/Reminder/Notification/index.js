import React from 'react';
import Notification from '../../../components/Reminder/Notification';

function ReminderNotification(props) {
	return (<Notification { ...props } />);
}

export default ReminderNotification;