import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		justifyContent: 'center',
		alignSelf: 'stretch',
		textAlign: 'center'
	},
	upgradeContainer: {
		backgroundColor: '#00C57D'
	},
	header: {
		marginTop: 30,
		fontSize: 20,
		color: 'white',
		textAlign: 'center'
	},
	planText: {
		marginTop: 50,
		textTransform: 'capitalize',
		color: 'white',
		fontSize: 20,
		textAlign: 'center',
		fontWeight: 'bold'
	},
	paymentText1: {
		marginTop: 15,
		color: 'white',
		textAlign: 'center'
	},
	paymentText2: {
		marginTop: 5,
		color: 'white',
		textAlign: 'center',
		marginBottom: 25
	},
	buttonWrap: {
		alignItems: 'center',
		marginBottom: 20
	},
	linkContainer: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		textAlign: 'center',
		borderBottomColor: '#D7D7D7',
		borderBottomWidth: 1,
		padding: 20,
		alignItems: 'center',
		marginLeft: 30,
		marginRight: 30
	},
	imageContainer: {
		width: 28,
		alignItems: 'center'
	},

	buttonTextContainer: {
		flex: 1
	},
	buttonText: {
		marginLeft: 30,
		color: '#363636',
		fontWeight: 'bold',
		textAlign: 'left'
	},
	icons: {
		alignSelf: 'center'
	}
});
export default styles;
