import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	modalWrap: {
		backgroundColor: '#000000aa',
		flex: 1,
		justifyContent: 'center'
	},
	successModalTextWrap: {
		marginTop: 5,
		marginBottom: 10,
		marginRight: 20,
		marginLeft: 10,
		padding: 20,
		borderRadius: 10
	},
	successTextWrap: {
		alignItems: 'center',
		marginBottom: 50
	},
	closeIcon: {
		marginLeft: 300
	},
	successIcon: {
		marginTop: 20,
		marginBottom: 20
	},
	successModalText1: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
		textTransform: 'capitalize'
	},
	successModalText2: {
		marginTop: 10,
		color: 'white',
		textTransform: 'capitalize'
	},
	continueButton: {
		paddingTop: 5,
		paddingBottom: 5,
		backgroundColor: 'white',
		borderRadius: 20,
		borderWidth: 1,
		borderColor: 'white',
		width: 120,
		marginBottom: 10,
		marginTop: 10,
		alignItems: 'center',
		alignContent: 'center',
		alignSelf: 'center'
	},
	continueButtonText: {
		color: '#555555',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
		textTransform: 'uppercase'
	}
});

export default styles;
