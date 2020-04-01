import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flexGrow: 1,
		alignItems: 'center'
	},
	queriesContainer: {
		marginTop: 80,
		justifyContent: 'center',
		alignItems: 'center'
	},
	header: {
		fontWeight: 'bold',
		fontSize: 16
	},

	decription: {
		marginTop: 20,
		justifyContent: 'center',
		alignContent: 'center',
		textAlign: 'center'
	},
	formContainer: {
		marginTop: 30,
		alignSelf: 'stretch',
		marginLeft: 5
	},
	buttonWrap: {
		alignItems: 'center',
		marginTop: 60
	}
});

export default styles;
