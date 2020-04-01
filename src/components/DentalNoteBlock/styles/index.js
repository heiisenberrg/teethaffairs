import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		padding: 10
	},
	dentalBlock: {
		borderWidth: 1,
		backgroundColor: '#66CC80',
		borderColor: '#66CC80',
		flexDirection: 'row',
		padding: 20,
		height: 130,
		marginBottom: 20
	},
	dentalHeaderWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	dentalHeaderContainer: { marginLeft: 40 },
	dentalHeaderText1: {
		fontWeight: 'bold',
		textTransform: 'uppercase',
		fontSize: 15,
		color: 'white',
		marginBottom: 10
	},
	dentalHeaderText2: {
		textTransform: 'capitalize',
		color: 'white'
	},
	dentalHeaderText3: {
		textTransform: 'capitalize',
		color: 'white'
	}
});

export default styles;
