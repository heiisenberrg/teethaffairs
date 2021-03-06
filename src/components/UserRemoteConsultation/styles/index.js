import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flexGrow: 1,
		width: width
	},
	healthHistoryText: {
		color: '#363636',
		fontSize: 13,
		textAlign: 'left',
		fontWeight: 'bold',
		textTransform: 'capitalize'
	},
	healthHistoryContainer: {
		flexDirection: 'row',
		margin: 15
	},
	dropdownIconWrapper: {
		borderColor: '#ffffff',
		borderWidth: 1,
		width: 30,
		height: 30,
		backgroundColor: '#ffffff',
		elevation: 10,
		borderRadius: 15,
		shadowColor: '#000000',
		shadowOpacity: 0.5,
		shadowRadius: 1,
		shadowOffset: {
			height: 1,
			width: 0
		},
		left: 10
	},
	dropright: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		left: 12,
		top: 9,
		width: 0,
		height: 0,
		borderTopWidth: 5,
		borderTopColor: 'transparent',
		borderStyle: 'solid',
		borderBottomWidth: 5,
		borderBottomColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: '#555'
	},
	dropdown: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		left: 9,
		top: 12,
		width: 0,
		height: 0,
		borderTopWidth: 5,
		borderTopColor: '#555',
		borderStyle: 'solid',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent'
	},
	iconViewWrap: {
		right: 0,
		top: -4,
		position: 'absolute'
	},
	primaryInfoInputWrap: {
		flexDirection: 'row',
		marginTop: 15
	},
	label1: {
		marginLeft: 10,
		color: '#363636',
		textAlign: 'left',
		fontWeight: 'bold',
		marginBottom: 10,
		fontSize: 13
	},
	textInput1: {
		borderWidth: 1,
		borderColor: '#A1A1A1',
		padding: 10,
		fontSize: 14,
		borderRadius: 6,
		marginRight: 5,
		marginLeft: 5,
		height: 35,
		color: 'black'
	},
	errorText: {
		color: '#CF0000',
		fontSize: 12,
		textAlign: 'center'
	},
	textBoxWrapper: {
		flexDirection: 'row',
		marginTop: 15,
		marginLeft: 1,
		marginRight: 15,
		flex: 1
	},
	allergiesTextInput: {
		borderWidth: 1,
		borderColor: '#A1A1A1',
		padding: 10,
		fontSize: 14,
		borderRadius: 6,
		marginRight: 20,
		width: 378,
		marginLeft: 10,
		minHeight: 43
	},
	allergiesBox: {
		flex: 1
	},
	infoText: {
		fontSize: 12,
		color: '#3A3A3A',
		padding: 10,
		textAlign: 'left'
	},
	medicalIssuesTextInput: {
		borderWidth: 1,
		borderColor: '#A1A1A1',
		padding: 10,
		fontSize: 14,
		borderRadius: 6,
		marginRight: 20,
		width: 188,
		marginLeft: 10
	},
	checkBoxText: {
		marginTop: 5,
		color: '#B3B3B3',
		fontSize: 12,
		marginRight: 30,
		marginBottom: 5,
		flex: 1
	},
	checkBoxWrapper: {
		flexDirection: 'row',
		flex: 1
	},
	medicalIssueContainer: {
		borderWidth: 1,
		borderColor: '#A1A1A1',
		padding: 10,
		fontSize: 14,
		borderRadius: 6,
		marginRight: 10,
		marginLeft: 10,
		flex: 1
	},
	checkbox: {
		height: 14,
		position: 'relative',
		top: 5
	},
	customCheckbox: {
		width: 15,
		height: 15,
		borderWidth: 1,
		borderColor: '#2E2E2E',
		position: 'relative',
		top: 4,
		borderRadius: 2
	},
	checkedStyle: {
		position: 'absolute',
		top: 2,
		right: 1
	},
	issueTextWrapper: {
		marginTop: 20,
		flex: 1
	},
	medicalContainer: {
		flexDirection: 'row',
		flex: 1
	},
	selectedText: {
		fontSize: 14,
		textAlign: 'center',
		color: '#2E2E2E'
	},
	crossText: {
		fontSize: 10,
		color: '#E50000',
		fontWeight: 'bold',
		marginTop: 2,
		marginRight: 5,
		marginLeft: 5
	},
	selectedTextWrapper: {
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: '#A1A1A1',
		shadowColor: 'rgba(0,0,0, .4)',
		shadowOffset: { height: 1, width: 0 },
		shadowOpacity: 1,
		shadowRadius: 1,
		backgroundColor: '#fff',
		elevation: 2,
		padding: 1,
		marginBottom: 11
	},
	switchWrapper: {
		flexDirection: 'row',
		marginTop: 15,
		flex: 1,
		alignItems: 'center'
	},
	switchContainer: {
		padding: 10
	},
	switchText: {
		marginLeft: 10,
		color: '#363636',
		backgroundColor: 'white',
		textAlign: 'left',
		fontWeight: 'bold',
		marginBottom: 10,
		fontSize: 13
	},
	switchButton: {
		position: 'relative',
		marginLeft: 10,
		marginBottom: 10
	},
	dentistText: {
		color: '#363636',
		fontSize: 13,
		textAlign: 'left',
		fontWeight: 'bold',
		textTransform: 'capitalize'
	},
	dentistContainer: {
		margin: 20,
		flex: 1
	},
	dummy: {
		display: 'none'
	},
	sendButtonWrapper: {
		alignItems: 'center'
	},
	MainContainer: {
		margin: 5,
		flexDirection: 'row',
		alignContent: 'center',
		marginBottom: 10,
		flex: 1
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44
	},
	textInputStyle: {
		textAlign: 'center',
		minHeight: 35,
		borderWidth: 1,
		borderColor: '#A1A1A1',
		padding: 10,
		borderRadius: 6,
		marginRight: 5,
		flexWrap: 'wrap',
		fontSize: 14,
		marginLeft: 5,
		flex: 3
	},
	button: {
		height: 40,
		padding: 10,
		justifyContent: 'center',
		flex: 1
	},
	buttonText: {
		color: '#fff',
		textAlign: 'center'
	},
	flat: {
		height: 1,
		width: '100%',
		backgroundColor: '#607D8B'
	},
	selectedTextWrapper1: {
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: '#A1A1A1',
		shadowColor: 'rgba(0,0,0, .4)',
		shadowOffset: { height: 1, width: 0 },
		shadowOpacity: 1,
		shadowRadius: 1,
		backgroundColor: '#fff',
		elevation: 2,
		width: 100,
		height: 30,
		padding: 5,
		marginBottom: 11
	},
	enteredAllergies: {
		padding: 3,
		marginRight: 5,
		fontSize: 14
	},
	dummy1: {
		minHeight: 37,
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: '#A1A1A1',
		padding: 10,
		borderRadius: 6,
		marginRight: 10,
		marginLeft: 10,
		flexWrap: 'wrap',
		flex: 1
	},
	enteredAllergiesBox: {
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: '#A1A1A1',
		shadowColor: 'rgba(0,0,0, .4)',
		shadowOffset: { height: 1, width: 0 },
		shadowOpacity: 1,
		shadowRadius: 1,
		backgroundColor: '#fff',
		elevation: 2,
		margin: 5
	},
	crossText1: {
		fontSize: 9,
		color: '#E50000',
		fontWeight: 'bold',
		marginTop: 5,
		marginRight: 10
	},
	roundButton: {
		width: 30,
		height: 30
	},
	searchInput: {
		padding: 10,
		borderColor: '#CCC',
		borderWidth: 1
	},
	updateBox: {
		flex: 1
	},
	histoyrFormBlock: {
		borderWidth: 1,
		margin: 7,
		borderColor: '#ffffff',
		backgroundColor: '#ffffff',
		elevation: 20,
		shadowColor: '#000000',
		shadowOpacity: 0.5,
		shadowRadius: 1,
		shadowOffset: {
			height: 1,
			width: 0
		},
		flex: 1
	},
	card: {
		marginHorizontal: 10,
		width: width - 20,
		justifyContent: 'space-between',
		height: 200
	},
	cardContainer: {
		padding: 10,
		marginVertical: 10,
		borderRadius: 10,
		shadowOpacity: 0.2,
		shadowOffset: {
			height: 1,
			width: 1
		},
		shadowRadius: 3,
		elevation: 2,
		borderWidth: 0.5,
		borderColor: '#D5D5D5',
		marginHorizontal: 10
	},
	mv10: {
		marginVertical: 10
	},
	m10: { margin: 10 },
	m15: { margin: 15 },
	upperCase: {
		textTransform: 'uppercase'
	},
	details: {
		margin: 10,
		width: '70%'
	},
	selectedDrugContent: {
		borderWidth: 0.5,
		borderColor: '#CAC7C7',
		elevation: 2,
		flex: 1,
		paddingVertical: 5,
		paddingHorizontal: 5,
		marginVertical: 5,
		marginRight: 5
	},
	flex: {
		flex: 1
	},
	medicalConditionContainer: {
		elevation: 2,
		borderWidth: 1,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		borderColor: '#A1A1A1'
	},
	dropdownContainer: {
		elevation: 2,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		borderColor: '#A1A1A1',
		maxHeight: 150
	},
	m5: {
		margin: 5
	},
	searchContent: {
		borderWidth: 0.5,
		borderColor: 'grey',
		borderRadius: 5,
		minHeight: 25
	},
	p10: {
		padding: 10
	},
	medicationContainer: {
		flex: 1.4
	},
	dropdownContent: {
		padding: 10,
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	searchContainer: {
		borderRadius: 1,
		borderWidth: 0.5,
		width: 23,
		height: 23,
		marginRight: 10
	},
	carouselContainer: { height: 250, marginTop: 30 },
	noDentist: {
		marginTop: 20
	}
});
export default styles;
