import { combineReducers } from 'redux';

import userReducer from './user';
import journalReducer from './journal';
import reminderReducer from './reminder';
import doctorReducer from './doctor';

const rootReducer = combineReducers({
	user: userReducer,
	journal: journalReducer,
	reminder: reminderReducer,
	doctor: doctorReducer
});

export default rootReducer;
