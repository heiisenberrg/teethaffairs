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
	SUBMIT_QUERY: '/contact-us/contact-us/',
	UPLOAD_PROFILE_PIC: '/users/upload-pic/',
	FETCH_NOTIFICATIONS: '/notifications/notifications/',
	CHECK_NAME: '/users/check-username/',

	// doctor
	DOCTOR_QUESTIONS_BASE_URL: '/doctor/questions/',
	DOCTOR_HISTORY_QUESTIONS: '/doctor/get-question-history/',
	VERIFY_PIN: '/doctor/get-questions/',
	UPDATE_DOCTOR_PROFILE: '/users/update-doctor/',

	//Reminder
	REMINDER_BASE_URL: '/reminders/reminder/',
	GET_REMINDER_LIST_FILTER: '/reminders/reminder-by-user/',

	//Journal
	ADD_MEMBER: '/users/user-registration/',
	USER_LIST: '/users/user/',
	USER_NOTES: '/notes/patient-notes/',
	HEALTH_HISTORY_UPDATE: '/notes/notes/',
	USER_DEACTIVATE: '/users/deactivate-user/',
	GET_USERNOTES: '/notes/user-notes/',
	NOTES: '/notes/notes/',
	DOCTOR_LIST: '/users/doctor-by-pin/',
	DENTAL_VISIT: '/visit/doctor-visits/',
	GET_REMOTE_CONSULTATION_FOR_PATIENTS: '/notes/user-questions/',
	DENTAL_VISIT_BASE_URL: '/visit/visits/',
	USER_NOTE_ID: '/notes/user-notes?user_id=',
	NOTE_EDIT: '/notes/notes-edit/',

	//payment
	GET_CARDS: '/payments/customer-cards/',
	CREATE_CARD: '/payments/card-source-create/',
	UPGRADE_APP: '/payments/upgrade-app/',

	//history
	GET_HISTORY: '/users/user-history/'
};
