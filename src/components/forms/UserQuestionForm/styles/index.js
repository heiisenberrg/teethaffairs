import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flexGrow: 1,
		width: width,
		padding: 10
	},
	stepIndicator: {
		// marginTop: 25,
		marginVertical: 20,
		alignItems: 'center'
		// marginBottom: 40
	},
	imageWrap: {
		marginBottom: 20,
		flex: 1
	},
	addFiles: {
		fontWeight: 'bold',
		fontSize: 13,
		marginBottom: 10,
		marginLeft: 5
	},
	imageContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap'
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
		borderWidth: 2,
		marginRight: 10,
		flexDirection: 'row'
	},
	imagePreview2: {
		width: 80,
		height: 80,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#0A8A7B',
		borderWidth: 1,
		marginRight: 10,
		flexDirection: 'row'
	},
	image: {
		width: '100%',
		height: '100%'
	},
	cameraTextPreview: {
		width: 80,
		height: 80,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 40
	},
	cameraText: {
		fontSize: 14,
		color: '#6A6A6A',
		textAlign: 'center',
		width: width-100,
		position: 'absolute',
		left:0,
		lineHeight: 20
	},
	symtamsContainer: {
		marginBottom: 24
	},
	questionText: {
		fontWeight: 'bold',
		fontSize: 13
	},
	questionContainer: {
		flexDirection: 'row',
		flex: 1
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
		fontSize: 13
	},
	painContainer: {
		display: 'flex',
		flexDirection: 'row',
		flex: 1,
		marginVertical: 15
	},
	choices: {
		flex: 1
	},
	activeButton: {
		padding: 5,
		backgroundColor: '#F0F1F1',
		borderRadius: 30,
		borderColor: '#707070',
		width: 80,
		marginBottom: 10,
		marginTop: 10
	},
	worstButton: {
		padding: 5,
		backgroundColor: '#00C1F8',
		borderRadius: 30,
		borderColor: '#00C1F8',
		width: 80,
		marginBottom: 10,
		marginTop: 10
	},
	activeButtonText: {
		color: '#6A6A6A',
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
	slider: {
		borderRadius: 50,
		width: width - 200,
		marginHorizontal: 10
		// position: 'relative',
		// top: 15
	},
	rangeText: {
		marginTop: 10,
		textAlign: 'center',
		fontWeight: 'bold'
	},
	radioContainer: {
		flexDirection: 'row'
	},
	step2Style: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20
	},
	modalWrap: {
		backgroundColor: '#000000aa',
		flex: 1,
		justifyContent: 'center'
	},
	modalTextWrap: {
		borderWidth: 3,
		borderColor: '#66CC80',
		backgroundColor: '#ffffff',
		marginTop: 5,
		marginRight: 20,
		marginLeft: 10,
		padding: 20,
		borderRadius: 10
	},

	closeIcon: {
		alignSelf: 'flex-end',
		position: 'relative'
	},
	modalText: {
		fontSize: 20,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		color: '#0A8A7B',
		textAlign: 'center',
		marginBottom: 30
	},
	savedButton: {
		padding: 10,
		backgroundColor: '#00C57D',
		borderWidth: 1,
		borderColor: '#707070',
		marginBottom: 10
	},
	savedButtonText: {
		color: '#fff',
		textAlign: 'left',
		alignContent: 'center',
		fontWeight: 'bold',
		textTransform: 'capitalize',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 10
	},
	consultButton: {
		padding: 15,
		backgroundColor: '#0A8A7B',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#0A8A7B',
		marginBottom: 22
	},
	loginText: {
		color: '#fff',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
		textTransform: 'uppercase',
		marginRight: 10
	},
	remoteButtonWrap: {
		alignContent: 'center',
		alignItems: 'center'
	},
	contentWrapText: {
		marginVertical: 15,
		marginHorizontal: 25
	},
	contentText: {
		fontSize: 13,
		color: '#4A4A4A',
		textAlign: 'center'
	},
	buttonContainer:{
		marginBottom: 18
	},
	hideText: {
		display:'none'
	},
	profileContainer: {
		flex: 1,
		backgroundColor: 'white'
	},
	profileWrapper: {
		display: 'flex',
		flex: 1,
		borderColor: '#f5f5f5',
		borderWidth: 1,
		backgroundColor: 'white',
		shadowOpacity: 2,
		shadowOffset: { height: 2, width: 2 },
		shadowRadius: 2,
		elevation: 10,
		shadowColor: '#f5f5f5',
		alignSelf: 'center',
		margin: 10,
		borderRadius: 5,
		padding: 10
	},
	title: {
		flexDirection: 'row'
	},
	image1: {
		width: 50,
		height: 50
	},
	medicareWrap: {
		width: 60,
		height: 60,
		backgroundColor: '#959CAC',
		borderRadius: 30
	},
	deleteWrap: {
		width: 30,
		height: 30,
		backgroundColor: '#F77474',
		borderRadius: 15
	},
	deleteIcon: {
		position: 'absolute',
		top: 7,
		alignSelf: 'center'
	},
	medicare: {
		position: 'absolute',
		top: 15,
		alignSelf: 'center'
	},
	miniProfileImageWrap: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 2
	},
	miniProfileImageWrap1: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		marginTop: 2,
		marginRight: 10,
		marginLeft: -50
	},
	miniProfileImageWrap2: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		marginTop: 2,
		marginRight: 5,
		marginLeft: 2
	},
	image3: {
		width: 23,
		height: 23,
		marginRight: 8
	},
	timeImage: {
		width: 23,
		height: 23,
		marginRight: 1,
		top: 4
	},
	deleteEditLogoContainer: {
		flexDirection: 'column',
		marginLeft: -5,
		marginTop: -14
	},
	image2: {
		width: 30,
		height: 30,
		marginBottom: 5
	},
	noteText: {
		marginTop: 20,
		marginBottom: 20
	},
	queryWrapper: {
		marginTop: 10
	},
	queryText: {
		color: '#363636',
		fontSize: 13,
		fontWeight: 'bold',
		marginTop: 8,
		lineHeight: 20
	},
	patientDetails: {
		textTransform: 'capitalize',
		color: '#4A4A4A',
		fontSize: 13
	},
	remoteCloseButton: {
		alignItems: 'center',
		marginTop: 20
	},
	successModalText: {
		margin: 10,
		color: 'green',
		textAlign: 'center'
	},
	priorHistory: {
		marginTop: 20
	},
	maskInput: {
		borderWidth: 1,
		borderColor: '#A1A1A1',
		padding: 10,
		fontSize: 14,
		borderRadius: 6,
		minWidth: 100,
		marginTop: 5
	},
	descriptionText: {
		color: '#363636',
		fontSize: 16,
		fontWeight: 'bold',
		width: 225,
		minHeight: 39,
		marginLeft: 20
	},
	dateText: {
		color: '#363636',
		fontSize: 12
	},
	successModalTextWrap: {
		marginTop: 5,
		marginBottom: 10,
		marginRight: 20,
		marginLeft: 10,
		padding: 20,
		borderRadius: 10
	},
	successTextWrap: {
		alignItems: 'center',
		marginBottom: 50
	},
	closeIcon1: {
		marginLeft: 300
	},
	successIcon: {
		marginTop: 20
	},
	successModalText1: {
		marginTop: 10,
		color: 'white'
	},
	modalButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	continueButton: {
		paddingTop: 5,
		paddingBottom: 5,
		backgroundColor: 'white',
		borderRadius: 20,
		borderWidth: 1,
		borderColor: 'white',
		width: 120,
		marginBottom: 10,
		alignItems: 'center',
		alignContent: 'center',
		alignSelf: 'center',
		marginLeft: 10
	},
	continueButtonText: {
		color: '#555555',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
		textTransform: 'uppercase'
	}
});

export default styles;
