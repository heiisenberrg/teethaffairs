import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	textInputContainer: {
		height: 60,
		position: 'relative',
		marginBottom: 20
	},
	labelContainer: {
		position: 'absolute',
		backgroundColor: '#FFF',
		top: -15,
		left: 14,
		padding: 5,
		zIndex: 1
	},
	textInput: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#A1A1A1',
		justifyContent: 'flex-end',
		height: 44,
		borderRadius: 20,
		paddingHorizontal: 25
	},

	label: {
		color: '#6A6A6A',
		backgroundColor: 'white',
		fontSize: 12
	},
	boxTextInput: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#A1A1A1',
		justifyContent: 'flex-end',
		width: 350,
		borderRadius: 5,
		paddingHorizontal: 25
	},

	/// textinput

	///default button
	label1: {
		marginLeft: 10,
		color: '#363636',
		// width: 75,
		backgroundColor: 'white',
		// zIndex: 1,
		textAlign: 'left',
		fontWeight: 'bold',
		marginBottom: 10,
		fontSize: 13
	},

	textInput1: {
		borderWidth: 1,
		borderColor: '#A1A1A1',
		padding: 10,
		fontSize: 14,
		borderRadius: 6,
		marginRight: 20,
		minWidth: 100,
		marginLeft: 10
	},
	container: {
		backgroundColor: 'white',
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center'
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
	text: {
		color: '#fff',
		textAlign: 'center',
		textTransform: 'uppercase'
	},
	inputContainer: { marginTop: 10 },
	inputContainer1: { marginTop: 20 },
	buttonStyle: {
		marginTop: 10
	},
	errorText: {
		color: '#CF0000',
		fontSize: 12,
		textAlign: 'left'
	},
	forgetPassword: {
		fontSize: 12,
		textAlign: 'center',
		color: '#003CFF',
		textDecorationLine: 'underline',
		marginTop: 15
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

	scrollView: {
		marginTop: 50
	},
	loginContainer: {
		marginTop: 25
	},
	failedResponse: {
		color: '#CF0000',
		textAlign: 'center'
	},
	passwordIcon: {
		zIndex: 1
	},
	searchSection: {
		position: 'absolute',
		right: 0,
		top: -4
	},
	searchIcon: {
		position: 'absolute',
		right: 10,
		top: 15
	},

	ImageStyle: {
		alignSelf: 'center'
	}
});

export default styles;
