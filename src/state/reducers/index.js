import { combineReducers } from 'redux';

import userReducer from './user';
import journalReducer from './journal';
import reminderReducer from './reminder';

const rootReducer = combineReducers({
	user: userReducer,
	journal: journalReducer,
	reminder: reminderReducer
});

export default rootReducer;
