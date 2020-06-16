import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 30,
		marginVertical: 20
	},
	timeContainer: {
		marginBottom: 10
	},
	timeText: {
		paddingVertical: 10
	},
	hourContent: {
		borderWidth: 0.5,
		borderColor: 'grey',
		borderRadius: 5,
		flex: 1
	},
	hourText: {
		paddingLeft: 10,
		paddingVertical: 10
	},
	minuteContent: {
		borderWidth: 0.5,
		borderColor: 'grey',
		borderRadius: 5,
		flex: 1,
		marginHorizontal: 10
	},
	minuteText: {
		paddingLeft: 10,
		paddingVertical: 10
	},
	timeZone: {
		borderWidth: 0.5,
		borderColor: 'grey',
		borderRadius: 5,
		flex: 1
	},
	timeZoneText: {
		paddingLeft: 10,
		paddingVertical: 10
	},
	muteContainer: {
		marginVertical: 20
	},
	daysContainer: {
		paddingVertical: 10,
		width,
		flex: 1
	},
	selectAllContent: {
		borderRadius: 1,
		borderWidth: 0.5,
		width: 23,
		height: 23,
		marginRight: 5
	},
	dayContainer: {
		marginVertical: 15,
		flex: 1
	},
	dayContent: {
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: '#CAC7C7',
		width: 35,
		height: 35,
		justifyContent: 'center',
		alignItems: 'center'
	},
	nameContainer: {
		marginVertical: 10
	},
	nameText: {
		paddingVertical: 10
	},
	nameInputContainer: {
		borderWidth: 0.5,
		borderColor: 'grey',
		borderRadius: 5,
		flex: 1
	},
	nameInput: {
		paddingLeft: 10,
		paddingVertical: 10
	},
	fullWidth: {
		width: '100%'
	},
	scrollContainer: {
		marginVertical: 5,
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: '#A1A1A1',
		padding: 10
	},
	userContainer: {
		marginVertical: 10,
		flex: 1
	},
	buttonContainer: {
		marginVertical: 20,
		width: '98%',
		borderRadius: 30,
		backgroundColor: '#0A8A7B',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 20
	},
	buttonText: {
		color: 'white',
		textTransform: 'uppercase',
		fontWeight: 'bold',
		fontSize: 16
	},
	accountContainer: {
		width: '50%',
		marginBottom: 10,
		marginRight: 5
	},
	checkContainer: {
		borderRadius: 10,
		width: 23,
		height: 23,
		borderWidth: 1,
		marginRight: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	accountIcon: {
		borderRadius: 50,
		width: 25,
		height: 25,
		borderWidth: 0.5,
		marginHorizontal: 5
	},
	flexRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	marginHorizontal: {
		marginHorizontal: 10
	},
	displayNone: {
		display: 'none'
	},
	dateTimePickerStyle: {
		backgroundColor: 'white',
		color: 'black'
	}
});

export default styles;
