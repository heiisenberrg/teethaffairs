import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		padding: 10
	},
	dentalBlock: {
		borderWidth: 1,
		backgroundColor: '#0080ff',
		borderColor: '#0080ff',
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
	dentalHeaderContainer: { marginRight: 40 },
	dentalHeaderText1: {
		fontWeight: 'bold',
		textTransform: 'capitalize',
		fontSize: 20,
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
