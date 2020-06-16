import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('screen');

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flexGrow: 1
	},
	inputText: {
		borderWidth: 1,
		borderColor: 'blue',
		padding: 9,
		fontSize: 12,
		borderRadius: 20,
		marginTop: -8,
		marginBottom: 10,
		width: 340
	},
	buttonContainer: { marginTop: 20 },
	buttonStyle: {
		marginBottom: 10
	},
	buttonText: {
		textAlign: 'center'
	},
	errorText: {
		color: '#CF0000',
		marginBottom: 10,
		marginTop: 1,
		textAlign: 'left',
		fontSize: 12,
		marginLeft: 10
	},
	dataPicker: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#A1A1A1',
		justifyContent: 'flex-end',
		borderRadius: 20,
		paddingHorizontal: 25,
		width: '100%'
	},
	labelContainer: {
		position: 'absolute',
		backgroundColor: '#FFF',
		top: -15,
		left: 14,
		padding: 7,
		zIndex: 1
	},
	textInputContainer: {
		height: 45,
		width: '100%',
		position: 'relative',
		marginTop: 10
	},
	label: {
		color: '#363636',
		backgroundColor: 'white',
		fontSize: 13
	},
	header: {
		textAlign: 'center',
		fontSize: 22,
		marginTop: 90,
		fontWeight: 'bold',
		color: '#3F4440',
		marginBottom: 10
	},

	lable: {
		marginLeft: 10,
		color: 'black',
		width: 100,
		backgroundColor: 'white',
		zIndex: 1,
		textAlign: 'center'
	},
	loginButton: {
		padding: 13,
		backgroundColor: '#0F8E79',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#0F8E79',
		width: 345,
		marginBottom: 10
	},
	loginText: {
		color: '#fff',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
		textTransform: 'uppercase'
	},
	scrollView: {
		marginTop: 50
	},
	termsText2: {
		marginLeft: 3,
		fontSize: 12,
		textAlign: 'center',
		color: '#003CFF',
		textDecorationLine: 'underline',
		marginTop: 7
	},
	loginLink: {
		fontSize: 12,
		textAlign: 'center',
		color: '#003CFF',
		textDecorationLine: 'underline',
		marginTop: 8,
		marginLeft: 3
	},
	normalText: {
		fontSize: 12,
		textAlign: 'center',
		color: '#6A6A6A',
		marginTop: 7
	},
	termsText1: {
		fontSize: 12,
		textAlign: 'center',
		color: '#6A6A6A',
		marginTop: 7
	},
	termsWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginLeft: 40
	},
	loginTermsWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 50
	},
	checkBoxWrap: {
		flexDirection: 'row',
		marginBottom: 10,
		marginLeft: 0
	},
	signupContainer: {
		margin: 25
	},
	logoHeader: {
		height: 60,
		backgroundColor: '#108E79',
		maxHeight: height - 210,
		justifyContent: 'center',
		zIndex: 1,
		top: 0
	},
	filter: {
		backgroundColor: '#ffffff',
		borderRadius: 100,
		paddingHorizontal: 10,
		alignSelf: 'center',
		position: 'absolute',
		zIndex: 101,
		top: 0,
		alignItems: 'center',
		shadowColor: '#707070',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 10,
		elevation: 10,
		width: 126,
		height: 120
	},
	filterWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		flex: 1
	},
	avatar: {
		width: 76,
		height: 75
	},
	checkbox: {
		width: 14,
		height: 14,
		position: 'absolute',
		left: 10,
		top: 4
	},

	radioContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 30
	},
	circle: {
		height: 20,
		width: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ACACAC',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 5
	},
	checkedCircle: {
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor: '#33D197'
	},
	radioWrapper: {
		flexDirection: 'row',
		paddingVertical: 10
	},
	radioWrap: {
		flexDirection: 'row',
		padding: 5
	},
	questionContainer: {
		flexDirection: 'row',
		marginLeft: 5,
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center'
	},
	questionText1: {
		fontWeight: 'bold',
		fontSize: 13,
		marginLeft: 10,
		margin: -10
	},
	genderContainer: {
		marginBottom: 0,
		marginLeft: 10
	},
	questionText: {
		marginTop: 6,
		marginBottom: 10,
		color: '#6A6A6A',
		fontSize: 12
	},
	genderText: {
		marginRight: 10,
		color: '#6A6A6A',
		fontSize: 12
	},
	genderWrapper: {
		flexDirection: 'column',
		marginHorizontal: 20
	},
	calenderStyle: {
		position: 'absolute',
		right: 10,
		top: 10
	},
	calenderText: {
		position: 'absolute',
		left: 20,
		top: 13,
		color: 'grey',
		fontSize: 12
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
	eyeIcon: {
		position: 'absolute',
		right: 60,
		top: 12
	},
	passwordWrapper: {
		flexDirection: 'row'
	},
	icon: {
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFF',
		alignSelf: 'center',
		borderRadius: 50,
		borderWidth: 1,
		borderColor: '#ACACAC',
		marginHorizontal: 10
	},
	activeTickIcon: {
		backgroundColor: '#14DF94'
	},
	infoIcon: {
		backgroundColor: '#f48100',
		borderColor: '#FFF'
	},
	tooltipContainer: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'flex-start'
	},
	popoverContainerText: {
		display: 'flex'
	},
	popoverTitle: {
		fontSize: 14,
		fontWeight: 'bold'
	},
	popoverText: {
		fontSize: 12,
		marginVertical: 10,
    width: '85%',
		flexWrap: 'wrap'
	},
	popoverLineItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	bullet: {
		width: 8,
		height: 8,
		borderRadius: 50,
		backgroundColor: '#14DF94',
		marginHorizontal: 10
	}
});

export default styles;
