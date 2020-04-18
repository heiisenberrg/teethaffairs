import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	textInputContainer: {
		position: 'relative',
		marginBottom: 14
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
		color: '#363636',
		backgroundColor: 'white',
		fontSize: 13
	},
	boxTextInput: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#A1A1A1',
		justifyContent: 'flex-end',
		width: 380,
		borderRadius: 5,
		paddingTop:10,
		paddingBottom: 10,
		paddingRight:10,
		paddingLeft:10,
		minHeight: 80
	},
	label1: {
		color: '#363636',
		backgroundColor: 'white',
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
		minWidth: 100,
		height: 57
	},
	saveAs: {
		borderWidth: 1,
		borderColor: '#A1A1A1',
		padding: 10,
		fontSize: 14,
		borderRadius: 6,
		minWidth: 100,
		height:62,
		marginTop: 11,
		marginBottom: 34
	},
	container: {
		backgroundColor: 'white',
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonWrap: {
		marginTop: 10
	},
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
	inputContainer: {
		marginTop: 10
	},
	inputContainer1: {
		marginTop: 20
	},
	buttonStyle: {
		marginTop: 10
	},
	errorText: {
		color: '#CF0000',
		fontSize: 12,
		marginLeft: 17
	},
	saveAsText: {
		color: '#CF0000',
		fontSize: 12,
		textAlign: 'center',
		marginBottom: 10,
		marginTop: -20
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
