import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	scrollView: {
		marginTop: 50
	},

	textInput: {
		borderWidth: 1,
		borderColor: '#A1A1A1',
		padding: 9,
		fontSize: 12,
		borderRadius: 20,
		marginTop: -8,
		marginBottom: 10,
		width: 340,
		color: '#6A6A6A',
		shadowColor: '#000000',
		opacity: 0.9,
		zIndex: -1,
		flex: 1
	},

	buttonWrap: { marginTop: 10 },
	buttonContainer: {
		marginTop: 10,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: '#0080ff',
		borderRadius: 20,
		borderWidth: 1,
		borderColor: '#fff'
	},
	// buttonText: {
	// 	color: '#fff',
	// 	textAlign: 'center',
	// 	textTransform: 'uppercase'
	// },
	inputContainer: { marginTop: 10 },
	inputContainer1: { marginTop: 20 },
	buttonStyle: {
		marginTop: 10
	},
	errorText: {
		color: '#CF0000',
		fontSize: 12,
		// marginBottom: 10,
		// marginTop: 6,
		textAlign: 'left'
	},
	forgetPassword: {
		fontSize: 12,
		textAlign: 'center',
		color: '#003CFF',
		textDecorationLine: 'underline',
		marginTop: 5
	},
	loginButton: {
		padding: 13,
		backgroundColor: '#14DF94',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#14DF94',
		width: 345,
		marginBottom: 10
	},
	loginText: {
		color: '#fff',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
		textTransform: 'uppercase'
	},
	signupButton: {
		padding: 13,
		backgroundColor: '#0A8A7B',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#0A8A7B',
		width: 345,
		marginBottom: 10
	},
	header: {
		textTransform: 'capitalize',
		textAlign: 'center',
		fontSize: 22,
		marginTop: 128,
		fontWeight: 'bold',
		color: '#3F4440'
	},

	label: {
		marginLeft: 10,
		color: '#6A6A6A',
		width: 75,
		backgroundColor: 'white',
		zIndex: 1,
		textAlign: 'center',
		fontSize: 12
	},

	loginContainer: {
		marginTop: 25
	},
	failedResponse: {
		color: '#CF0000',
		textAlign: 'left'
	},
	passwordIcon: {
		zIndex: 1
	},
	searchSection: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	searchIcon: {
		padding: 10,
		zIndex: 1
	},
	input: {
		flex: 1,
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		paddingLeft: 0,
		backgroundColor: '#fff',
		color: '#424242'
	},
	SectionStyle: {
		flexDirection: 'row',
		justifyContent: 'center',

		borderWidth: 1,
		borderColor: '#A1A1A1',
		padding: 9,
		fontSize: 12,
		borderRadius: 20,
		marginTop: -8,
		marginBottom: 10,
		width: 340,
		color: '#6A6A6A',
		shadowColor: '#000000',
		opacity: 0.9,
		zIndex: -1,
		flex: 1
	},
	ImageStyle: {
		// alignItems: 'center',
		// alignContent: 'center',
		alignSelf: 'center'
		// justifyContent: 'center'
	}
});

export default styles;
