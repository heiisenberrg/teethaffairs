import { combineReducers } from 'redux';

import userReducer from './user';
import journalReducer from './journal';

const rootReducer = combineReducers({
	user: userReducer,
	journal: journalReducer
});

export default rootReducer;
