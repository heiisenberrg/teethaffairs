import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	queriesContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	description: {
		textAlign: 'center'
	},
	header: {
		fontWeight: 'bold',
		fontSize: 16,
		marginVertical: 20
	},
	formContainer: {
		marginTop: 30
	},
	buttonWrap: {
		alignItems: 'center',
		marginTop: 60
	}
});

export default styles;
