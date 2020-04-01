import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	inputText: {
		borderWidth: 1,
		borderColor: 'blue',
		padding: 9,
		fontSize: 12,
		borderRadius: 20,
		marginTop: -8,
		marginBottom: 10,
		width: 340
	},
	buttonContainer: { marginTop: 20 },
	buttonStyle: {
		marginBottom: 10
	},
	buttonText: {
		textAlign: 'center'
	},
	errorText: {
		color: '#CF0000',
		marginBottom: 10,
		marginTop: 6,
		textAlign: 'left'
	},
	dataPicker: {
		width: 312,

		borderColor: '#ddd',
		padding: 10,
		// fontSize: 18,
		borderRadius: 6
		// marginTop: 10,
		// marginBottom: 10
	},
	header: {
		textAlign: 'center',
		fontSize: 22,
		marginTop: 5,
		fontWeight: 'bold',
		color: '#3F4440',
		marginBottom: 10
	},

	lable: {
		marginLeft: 10,
		color: 'black',
		width: 100,
		backgroundColor: 'white',
		zIndex: 1,
		textAlign: 'center'
	},
	loginButton: {
		padding: 13,
		backgroundColor: '#0F8E79',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#0F8E79',
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
	scrollView: {
		marginTop: 50
	},
	termsText2: {
		marginLeft: 3,
		fontSize: 12,
		textAlign: 'center',
		color: '#003CFF',
		textDecorationLine: 'underline',
		marginTop: 7
	},
	loginLink: {
		fontSize: 12,
		textAlign: 'center',
		color: '#003CFF',
		textDecorationLine: 'underline',
		marginTop: 7
	},
	normalText: {
		fontSize: 12,
		textAlign: 'center',
		color: '#6A6A6A',
		marginTop: 7
	},
	termsText1: {
		fontSize: 12,
		textAlign: 'center',
		color: '#6A6A6A',
		marginTop: 7
	},
	termsWrapper: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	checkBoxWrap: {
		flexDirection: 'row',
		marginTop: -20
	}
});

export default styles;
