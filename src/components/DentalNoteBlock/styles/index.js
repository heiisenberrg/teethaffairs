import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		padding: 10
	},
	dentalBlock: {
		borderWidth: 1,
		backgroundColor: '#00C57D',
		borderColor: '#66CC80',
		flexDirection: 'row',
		padding: 20,
		height: 130,
		marginBottom: 20,
		borderRadius: 8
	},
	dentalHeaderWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	dentalHeaderContainer: { marginLeft: 20 },
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
	},
	journalNotification: {
		width: 20,
		height: 20,
		backgroundColor: 'red',
		position: 'absolute',
		right: -5,
		top: -5,
		borderRadius: 50
	},
	journalNotificationText: {
		display: 'flex',
		justifyContent: 'center',
		alignSelf: 'center',
		color: '#ffffff'
	}
});

export default styles;
