import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	opinionContainer: {
		borderColor: '#DADADA',
		borderWidth: 1,
		width: 350,
		height: 170,
		flexDirection: 'row',
		backgroundColor: 'white',
		shadowColor: '#555555',
		shadowOpacity: 0.1,
		shadowRadius: 1,
		elevation: 4,
		marginBottom: 5,
		borderRadius: 30,
		marginTop: 25
	},

	signupButton: {
		padding: 10,
		backgroundColor: '#00C57D',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#00C57D',
		width: 225,
		marginBottom: 10
	},
	opinionWrapper: {
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 20,
		marginRight: 20,
		alignItems: 'center'
	},
	opinionText: {
		marginBottom: 20,
		color: '#878787',
		fontSize: 14,
		lineHeight: 24,
		textAlign: 'center'
	},
	learnButtonText: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 16
	},
	stepIndicator: {
		marginTop: 25,
		alignItems: 'center',
		marginBottom: 20
	},
	keyBoardView: {
		marginTop: 20
	},
	loginButton: {
		padding: 15,
		backgroundColor: '#0A8A7B',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#0A8A7B',
		width: 345,
		marginBottom: 10,
		marginTop: 10
	},
	loginText: {
		color: '#fff',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
		textTransform: 'uppercase',
		marginRight: 10
	},
	issueButton: {
		padding: 10,
		backgroundColor: '#66CC80',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#66CC80',
		width: 80,
		marginBottom: 10,
		marginTop: 10
	},
	issueButtonText: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 12,
		textTransform: 'capitalize'
	},
	questionText: {
		fontWeight: 'bold',
		fontSize: 13
	},
	questionContainer: {
		flexDirection: 'row'
	},
	choices: {
		marginRight: 10
	},
	symtamsContainer: {
		marginBottom: 10,
		marginLeft: 10
	},
	checkBoxButtonText: {
		fontWeight: 'bold',
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		marginTop: 5
	},
	checkboxChoices: {
		flexDirection: 'row'
	},
	consultButton: {
		padding: 15,
		backgroundColor: '#0A8A7B',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#0A8A7B',
		// width: 345,
		marginBottom: 10,
		marginTop: 10
	},

	modalWrap: {
		backgroundColor: '#000000aa',
		flex: 1,
		justifyContent: 'center'
	},
	modalTextWrap: {
		borderWidth: 5,
		borderColor: '#66CC80',
		backgroundColor: '#ffffff',
		marginTop: 5,
		marginBottom: 10,
		marginRight: 20,
		marginLeft: 10,

		padding: 20,
		borderRadius: 10
	},
	modalText: {
		fontSize: 20,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		color: '#0F8E79'
	},
	continueButton: {
		padding: 15,
		backgroundColor: 'white',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#0F8E79',
		// width: 345,
		marginBottom: 10,
		marginTop: 10
	},
	continueButtonText: {
		color: 'black',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
		textTransform: 'uppercase'
	},
	successTextWrap: {
		alignItems: 'center',
		marginBottom: 50
	},
	successModalTextWrap: {
		borderWidth: 5,
		borderColor: '#66CC80',
		backgroundColor: '#66CC80',
		marginTop: 5,
		marginBottom: 10,
		marginRight: 20,
		marginLeft: 10,

		padding: 20,
		borderRadius: 10
	},
	successModalText1: {
		fontSize: 30,
		fontWeight: 'bold',
		color: 'white',
		textTransform: 'capitalize'
	},
	successModalText2: {
		fontSize: 15,
		color: 'white',
		textTransform: 'capitalize'
	},
	normalTextInputWrap: {
		flexDirection: 'row'
	},
	healthHistory: {
		borderBottomColor: 'grey',
		borderBottomWidth: 1
	},
	healthHistoryText: {
		marginBottom: 20,
		fontWeight: 'bold',
		textTransform: 'capitalize'
	},
	historyFormWrapper: {
		marginTop: -8,
		padding: 10,
		borderColor: 'grey',
		borderWidth: 1,
		backgroundColor: 'white',
		shadowColor: 'grey',
		shadowOpacity: 0.1,
		shadowRadius: 1,
		elevation: 10,
		borderRadius: 10
	},
	doctorImage: {
		width: 70,
		height: 70,
		marginRight: 20
	},
	doctorContainer: {
		borderWidth: 1,
		borderColor: 'green',
		marginBottom: 10
	},
	doctorDetailsWrapper: {
		flexDirection: 'row',
		padding: 10,
		marginRight: 10
	},
	doctorNameText: {
		fontWeight: 'bold',
		textTransform: 'capitalize',
		fontSize: 15
	},
	doctorAddressText: {
		textTransform: 'capitalize',
		fontSize: 15
	},
	doctorDetails: {
		marginRight: 20,
		marginTop: 10
	},
	radioButton: {
		marginTop: 20
	},
	dentistText: {
		fontWeight: 'bold',
		textTransform: 'capitalize',
		marginBottom: 10
	},
	sendButton: {
		padding: 15,
		backgroundColor: '#0F8E79',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#0F8E79',
		width: 345,
		marginBottom: 10,
		marginTop: 10
	},
	radioContainer: {
		flexDirection: 'row'
	},
	imageWrap: {
		marginTop: 5
	},
	imagePreview: {
		width: '100%',
		height: 200,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#ccc',
		borderWidth: 1
	},
	imagePreview1: {
		width: 80,
		height: 80,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#0A8A7B',
		borderStyle: 'dashed',
		borderRadius: 1,
		borderWidth: 1,
		marginRight: 20,
		flexDirection: 'row'
	},

	cameraTextPreview: {
		width: 80,
		height: 80,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 40
	},

	image: {
		width: '100%',
		height: '100%'
	},
	addFiles: {
		fontWeight: 'bold',
		fontSize: 13,
		marginBottom: 10
	},
	imageContainer: {
		flexDirection: 'row'
	},
	slider: {
		width: 200,
		height: 40,
		borderRadius: 100
	},
	painContainer: {
		flexDirection: 'row',
		marginTop: 20,
		marginLeft: -60,
		marginBottom: 10
	},
	rangeText: {
		marginTop: -10,
		textAlign: 'center',
		fontWeight: 'bold'
	},

	worstButton: {
		padding: 5,
		backgroundColor: '#CF0000',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#CF0000',
		width: 80,
		marginBottom: 10,
		marginTop: 10
	},
	activeButton: {
		padding: 5,
		backgroundColor: 'white',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: 'grey',
		width: 80,
		marginBottom: 10,
		marginTop: 10
	},
	activeButtonText: {
		color: 'grey',
		textAlign: 'center',
		fontSize: 12,
		textTransform: 'capitalize'
	},
	worstButtonText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 12,
		textTransform: 'capitalize'
	},
	cameraText: {
		fontSize: 14,
		color: '#6A6A6A',
		width: 250,
		marginLeft: 120,
		textAlign: 'center'
	},
	arrowWrap: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	arrow: {
		marginLeft: 10
	},
	questionText1: {
		fontWeight: 'bold',
		fontSize: 13,
		marginLeft: 10
	},
	step2Style: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	closeIcon: {
		alignSelf: 'flex-end'
	}
});

export default styles;
