import React from 'react';
import ListComponent from '../../../components/Reminder/List';

function ListReminder(props) {
	return (<ListComponent { ...props } />);
}

export default ListReminder;
