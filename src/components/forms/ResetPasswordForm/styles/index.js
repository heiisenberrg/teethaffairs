import { StyleSheet, Dimensions } from 'react-native';
const {  height } = Dimensions.get('screen');

const styles = StyleSheet.create({
	logoHeader: {
		height: 60,
		backgroundColor: '#108E79',
		maxHeight: (height - 210),
		justifyContent:'center',
		zIndex: 1,
		top: 0
		},
	container: {
		backgroundColor: 'white',
		flexGrow: 1
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
normalText: {
	fontSize: 14,
	color: '#B8B8B8',
	paddingHorizontal: 5
},
note: {
fontSize:11,
marginTop: -25,
color:'#6A6A6A',
marginLeft: 15
},
divider: {
marginTop: 28,
marginBottom: 20
},
filterArrow: {
	justifyContent: 'flex-end'
},
	textInput: {
		borderWidth: 1,
		borderColor: '#A1A1A1',
		padding: 9,
		fontSize: 12,
		borderRadius: 20,
		marginTop: -8,
		marginBottom: 10,
		width: 340,
		color: '#6A6A6A',
		shadowColor: '#000000',
		opacity: 0.9,
		zIndex: -1,
		flex: 1
	},

	buttonWrap: { marginTop: 10 },
	buttonContainer: {
		marginTop: 10,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: '#0080ff',
		borderRadius: 20,
		borderWidth: 1,
		borderColor: '#fff'
	},
	inputContainer: { marginTop: 10 },
	inputContainer1: { marginTop: 20 },
	buttonStyle: {
		marginTop: 10
	},
	errorText: {
		color: '#CF0000',
		fontSize: 12,
		textAlign: 'left'
	},
	forgetPassword: {
		fontSize: 12,
		textAlign: 'center',
		color: '#003CFF',
		textDecorationLine: 'underline',
		marginTop: 21
	},
	loginButton: {
		padding: 13,
		backgroundColor: '#14DF94',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#14DF94',
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
	signupButton: {
		padding: 13,
		backgroundColor: '#0A8A7B',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#0A8A7B',
		width: 345,
		marginBottom: 10
	},
	header: {
		textTransform: 'capitalize',
		textAlign: 'center',
		fontSize: 21,
		marginTop: 135,
		fontWeight: 'bold',
		color: '#3F4440'
	},

	label: {
		marginLeft: 10,
		color: '#6A6A6A',
		width: 75,
		backgroundColor: 'white',
		zIndex: 1,
		textAlign: 'center',
		fontSize: 12
	},

	loginContainer: {
		marginTop:43,
		marginLeft: 25,
		marginRight: 25,
		marginBottom: 25
	},
	failedResponse: {
		color: '#CF0000',
		fontSize: 12,
		marginLeft: 17
	},
	passwordIcon: {
		zIndex: 1
	},
	searchSection: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	searchIcon: {
		padding: 10,
		zIndex: 1
	},
	input: {
		flex: 1,
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		paddingLeft: 0,
		backgroundColor: '#fff',
		color: '#424242'
	},
	SectionStyle: {
		flexDirection: 'row',
		justifyContent: 'center',

		borderWidth: 1,
		borderColor: '#A1A1A1',
		padding: 9,
		fontSize: 12,
		borderRadius: 20,
		marginTop: -8,
		marginBottom: 10,
		width: 340,
		color: '#6A6A6A',
		shadowColor: '#000000',
		opacity: 0.9,
		zIndex: -1,
		flex: 1
	},
	ImageStyle: {
		alignSelf: 'center'
	},
	signupWrap: {
		marginTop: -20
	},
	responseWrap: {
		marginTop: -35,
		marginBottom: 10
	}
});

export default styles;
