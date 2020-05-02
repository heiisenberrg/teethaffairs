import { combineReducers } from 'redux';

import userReducer from './user.reducer';
import journalReducer from './journal.reducer';
import reminderReducer from './reminder.reducer';
import doctorReducer from './doctor.reducer';

const rootReducer = combineReducers({
	user: userReducer,
	journal: journalReducer,
	reminder: reminderReducer,
	doctor: doctorReducer
});

export default rootReducer;
