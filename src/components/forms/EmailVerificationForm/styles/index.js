import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textInput: {
		borderWidth: 1,
		borderColor: 'grey',
		padding: 9,
		fontSize: 12,
		borderRadius: 20,
		marginTop: -8,
		marginBottom: 10,
		width: 340
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
	buttonText: {
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
		// marginBottom: 10,
		// marginTop: 6,
		textAlign: 'left'
	},
	forgetPassword: {
		marginTop: 20,
		fontWeight: 'bold',
		fontSize: 18
	},
	loginButton: {
		padding: 13,
		backgroundColor: '#66CC80',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#66CC80',
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
		backgroundColor: '#0F8E79',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#0F8E79',
		width: 345,
		marginBottom: 10
	},
	header: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 20,
		margin: 10,
		color: '#3F4440',
		marginBottom: 50,
		marginTop: 100
	},
	label: {
		marginLeft: 10,
		color: 'black',
		width: 75,
		backgroundColor: 'white',
		zIndex: 1,
		textAlign: 'center'
	},
	scrollView: {
		marginTop: 50
	}
});

export default styles;
