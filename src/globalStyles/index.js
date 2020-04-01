import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
	primaryColor: {
		color: '#0F8E79' //#66CC80
	},
	secondaryColor: {
		color: '#0A8A7B'
	},
	ternaryColor: {
		color: '#14DF94'
	},
	con: {
		width: 126,
		height: 120
	},
	primaryButton: {
		padding: 13,
		backgroundColor: '#14DF94',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#14DF94',
		width: 345,
		marginBottom: 10
	},

	secondaryButton: {
		padding: 13,
		backgroundColor: '#0A8A7B',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#0A8A7B',
		width: 345,
		marginBottom: 10
	},
	tertiaryButton: {
		padding: 13,
		backgroundColor: 'white',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: 'white',
		width: 345,
		marginBottom: 10
	},

	normalButton: {
		padding: 13,
		backgroundColor: 'transparent',
		borderRadius: 30,
		borderWidth: 2,
		borderColor: 'white',
		width: 345,
		marginBottom: 10
	},

	skipButton: {
		padding: 13,
		backgroundColor: 'transparent',
		borderRadius: 30,
		borderWidth: 2,
		borderColor: '#0A8A7B',
		width: 345,
		marginBottom: 10
	},

	buttonText: {
		color: '#fff',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
		textTransform: 'uppercase'
	},
	tertiaryButtonText: {
		color: '#0A8A7B',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
		textTransform: 'uppercase'
	}
});

export default globalStyles;
