import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		alignContent: 'center',
		justifyContent: 'center',
		flexWrap: 'wrap'
	},
	viewPadding: {
		marginTop: 10
	},
	dashboardWrapper: {
		borderWidth: 1,
		backgroundColor: '#0080ff',
		borderColor: '#0080ff',
		flexDirection: 'row',
		marginBottom: 10
	},
	primaryUserWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		padding: 15
	},
	nameBlock: { paddingLeft: 10, paddingRight: 90 },
	nameText: { fontSize: 20, color: 'white' },
	subNameText: { fontSize: 10, color: 'white' },
	reminderWrapper: {
		backgroundColor: '#cce6ff',
		borderColor: '#0080ff',
		marginTop: 10,
		marginLeft: 20,
		marginRight: 20,
		height: 200
	},
	reminderHeaderBlock: { flexDirection: 'row', padding: 10, marginBottom: 10 },
	reminderText: {
		fontWeight: 'bold',
		textTransform: 'uppercase',
		textAlign: 'left',
		marginRight: 120
	},
	reminderButton: {
		padding: 5,
		backgroundColor: '#0080ff',
		borderRadius: 15,
		borderWidth: 1,
		borderColor: '#0080ff',
		height: 30,
		width: 100
	},
	reminderButtonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 10,
		textTransform: 'uppercase'
	},
	imageWrap: {
		backgroundColor: 'white',
		marginLeft: 20,
		marginRight: 20,
		height: 35,
		marginTop: 10
	},
	imageContent: {
		textAlign: 'center',
		textTransform: 'uppercase',
		padding: 5
	},
	questionWrap: {
		backgroundColor: '#cce6ff',
		borderColor: '#0080ff',
		marginTop: 10,
		marginLeft: 20,
		marginRight: 20,
		height: 200
	},
	questionHeaderWrap: { flexDirection: 'row', padding: 10, marginBottom: 10 },
	questionHeaderText: {
		fontWeight: 'bold',
		textTransform: 'uppercase',
		textAlign: 'left',
		marginRight: 70
	},
	questionButton: {
		padding: 5,
		backgroundColor: '#0080ff',
		borderRadius: 15,
		borderWidth: 1,
		borderColor: '#0080ff',
		height: 30,
		width: 100
	},
	questionButtonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 10,
		textTransform: 'uppercase'
	},
	headerContainer: {
		flexDirection: 'row',
		width: 374
	},
	headerText: {
		color: 'black',
		fontWeight: 'bold',
		textTransform: 'capitalize',
		fontSize: 15,
		marginLeft: 10
	},

	mapContainer: {
		flexDirection: 'row',
		marginTop: 10,
		borderColor: 'grey',
		marginLeft: 5,
		marginRight: 5,
		shadowColor: 'grey',
		shadowOpacity: 0.9,
		shadowRadius: 1,
		elevation: 1
	},

	map1: {
		width: 250,
		height: 100,
		marginLeft: 5,
		marginRight: 8,
		padding: 5
	},
	map2: {
		width: 50,
		height: 100,
		marginRight: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},

	headerStyle: {
		fontSize: 14,
		padding: 5
	},
	loginText: {
		color: '#fff',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 15,
		textTransform: 'uppercase'
	},
	signupButton: {
		padding: 10,
		backgroundColor: '#0F8E79',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#0F8E79',
		width: 370,
		marginBottom: 10,
		marginTop: 20
	}
});

export default styles;
