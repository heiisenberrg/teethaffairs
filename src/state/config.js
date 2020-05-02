module.exports = {
	//User
	USER_LOGIN: '/dental_auth/login/',
	GET_MY_PROFILE: '/users/user/me/',
	UPDATE_DEVICE_TOKEN: '/users/device-id-update/',
	SIGNUP: '/dental_auth/sign-up/',
	VERIFY_EMAIL: '/dental_auth/verify-email/',
	FORGET_PASSWORD: '/dental_auth/forgot-password/',
	RESET_PIN: '/dental_auth/pin-reset/',
	LOGOUT: '/dental_auth/logout/',
	GET_USER: '/users/user/me/',
	UPDATE_USER: '/users/update-me/',
	GET_USERS: '/users/user/',

	// doctor
	DOCTOR_QUESTIONS_BASE_URL: '/doctor/questions/',
	VERIFY_PIN: '/doctor/get-questions/',
	UPDATE_DOCTOR_PROFILE: '/users/update-doctor/',

	//Reminder
	REMINDER_BASE_URL: '/reminders/reminder/',
	GET_REMINDER_LIST_FILTER: '/reminders/reminder-by-user/',

	//Journal
	ADD_MEMBER: '/users/user-registration/',
	USER_LIST: '/users/user/',
	USER_NOTES: '/notes/patient-notes/',
	USER_DEACTIVATE: '/users/deactivate-user/',
	NOTES: '/notes/notes/',
	DOCTOR_LIST: '/users/doctor-by-pin/',
	DENTAL_VISIT: '/visit/doctor-visits/',
	DENTAL_VISIT_BASE_URL: '/visit/visits/',
	USER_NOTE_ID: '/notes/user-notes?user-id='
};
