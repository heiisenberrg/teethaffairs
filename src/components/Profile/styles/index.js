import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		padding: 10,
		alignSelf: 'stretch',
		backgroundColor: 'white',
		flex: 1
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

	imageStyle: {
		marginTop: 20,
		alignContent: 'center',
		justifyContent: 'center',
		flexWrap: 'wrap'
	},
	imageWrap1: {
		backgroundColor: '#0F8E79',
		marginRight: 10,
		width: 110,
		height: 110,
		borderRadius: 6,
		justifyContent: 'center'
	},
	imageWrap2: {
		backgroundColor: '#f57674',
		marginRight: 10,
		width: 110,
		height: 110,
		borderRadius: 6,
		justifyContent: 'center'
	},
	imageWrap3: {
		backgroundColor: '#66CC80',
		marginRight: 10,
		width: 110,
		height: 110,
		borderRadius: 6,
		justifyContent: 'center'
	},
	imageContent: {
		textAlign: 'center',
		textTransform: 'uppercase',
		padding: 5,
		color: 'white',
		fontWeight: 'bold'
	},
	imageContainer: {
		flexDirection: 'row',
		width: 350
		// height: 300
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
	contentWrap: {
		alignItems: 'center'
	}
});

export default styles;
