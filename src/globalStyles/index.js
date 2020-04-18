import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

const globalStyles = StyleSheet.create({
	primaryColor: {
		color: '#0F8E79'
	},
	secondaryColor: {
		color: '#0A8A7B'
	},
	ternaryColor: {
		color: '#14DF94'
	},
	con: {
		width: 110,
		height: 110
	},
	primaryButton: {
		padding: 13,
		backgroundColor: '#14DF94',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#14DF94',
		marginBottom: 10,
		alignSelf: 'center',
		width: width - 50
	},
	secondaryButton: {
		padding: 13,
		backgroundColor: '#0A8A7B',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#0A8A7B',
		marginBottom: 10,
		alignSelf: 'center',
		width: width - 45
	},
	tertiaryButton: {
		padding: 13,
		backgroundColor: 'white',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: 'white',
		width: width - 45,
		marginBottom: 10
	},

	normalButton: {
		padding: 13,
		backgroundColor: 'transparent',
		borderRadius: 30,
		borderWidth: 2,
		borderColor: 'white',
		width: width - 45,
		marginBottom: 10
	},
	skipButton: {
		padding: 13,
		backgroundColor: 'transparent',
		borderRadius: 30,
		borderWidth: 2,
		borderColor: '#0A8A7B',
		marginBottom: 10,
		width: width - 45
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
	},
	fullWidthButton: {
		padding: 13,
		backgroundColor: '#0A8A7B',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#0A8A7B',
		width: 380,
		marginBottom: 10
	}
});

export default globalStyles;
