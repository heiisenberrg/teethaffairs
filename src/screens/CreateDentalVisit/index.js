import React from 'react';

import DentalVisitForm from '../../components/forms/DentalVisitForm';

function CreateDentalVisit(props) {	
	return (
		<DentalVisitForm { ...props } />
	);
}

export default CreateDentalVisit;
