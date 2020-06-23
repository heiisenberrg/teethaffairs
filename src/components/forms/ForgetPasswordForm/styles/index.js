import { StyleSheet, Dimensions } from 'react-native';
const {  width } = Dimensions.get('screen');

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#1DCB86',
		flexGrow: 1,
		width: width
	},
	textInput: {
		borderWidth: 1,
		borderColor: '#F2F2F2',
		padding: 9,
		fontSize: 12,
		borderRadius: 10,
		marginBottom: 10,
		textAlign: 'center',
		marginTop: 50,
		color: 'white',
		flex: 1,
		minHeight: 43
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
	buttonText: {
		color: '#fff',
		textAlign: 'center',
		textTransform: 'uppercase'
	},
	inputContainer: { marginTop: 10 },
	inputContainer1: { marginTop: 20 },
	buttonStyle: {
		marginTop: 10
	},
	errorText: {
		color: '#CF0000',
		fontSize: 12,
		textAlign: 'center'
	},
	forgetPassword: {
		marginTop: 20,
		fontWeight: 'bold',
		fontSize: 18
	},
	loginButton: {
		padding: 13,
		backgroundColor: '#66CC80',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#66CC80',
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
		backgroundColor: '#0F8E79',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#0F8E79',
		width: 345,
		marginBottom: 10
	},
	header: {
		textTransform: 'capitalize',
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 24,
		color: 'white',
		marginTop: 120
	},
	label: {
		marginLeft: 10,
		color: 'black',
		width: 75,
		backgroundColor: 'white',
		zIndex: 1,
		textAlign: 'center'
	},
	scrollView: {
		marginTop: 50
	},
	resetContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		position:'relative',
		top: 80
	},
	lock: {
		position: 'absolute'
	},
	questionIcon: {
		top: 30,
		left: 55
	},
	dummyEmailText: {
		color: 'white',
		fontSize: 14,
		textAlign: 'center',
		marginLeft: 10
	},
	emailContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 10,
		marginBottom: 20
	},
	newUserText: {
		color: 'white',
		textAlign: 'center',
		marginTop: 50,
		marginBottom: 10
	},
	resetContainer1: {
		marginHorizontal: 25
	},
	buttonWrapper:{
		flex: 1,
		alignItems:'center',
		marginTop: 20
	}
});
export default styles;
