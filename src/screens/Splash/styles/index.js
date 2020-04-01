import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1DCB86',
		resizeMode: 'cover'
	},

	backgroundImage: {
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center'
	},
	logoWrap: { margin: 5, justifyContent: 'center', alignItems: 'center' },
	logo: {
		width: 50,
		height: 50
	},
	logoTextWrap: {
		textAlign: 'center',
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		height: '100%'
	},
	logoText: {
		fontSize: 30,
		fontWeight: 'bold',
		color: 'white',
		// fontFamily: 'Roboto',
		// marginTop: 10,
		textTransform: 'uppercase',
		top: 310,
		left: 90
	},
	logoText1: {
		fontSize: 30,
		color: 'white',
		// fontFamily: 'Roboto',
		// marginTop: 10,
		textTransform: 'uppercase',
		top: 310,
		left: 90
	},
	loginButton: { marginTop: 30 },
	signupButton: { marginTop: 10 },
	doctorWrap: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 100
	},
	wrapText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#0080ff',
		// fontFamily: 'Roboto',
		marginTop: 10,
		textTransform: 'capitalize'
	},
	buttonWrap: { marginTop: 10 },
	doctorLoginButton: {
		marginRight: 40,
		marginLeft: 40,
		marginTop: 10,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: '#1DCB86',
		borderRadius: 20,
		borderWidth: 1,
		borderColor: '#fff'
	},
	buttonText: {
		color: '#fff',
		textAlign: 'center',
		textTransform: 'capitalize'
	},
	container1: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	container2: {
		marginLeft: 50,
		width: 110,
		height: 110,
		borderRadius: 70 / 2
	},
	textHeaderStyle: {
		textAlign: 'left',
		marginLeft: 15,
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20
	},
	textStyle: {
		textAlign: 'left',
		marginLeft: 15,
		color: 'white',
		fontSize: 12,
		marginBottom: 6
	},
	gradient: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20
	},
	button: {
		width: '70%',
		height: 45
	},
	text: {
		color: 'white',
		fontSize: 16
	},
	profile: {
		flexDirection: 'row',
		width: 350
	},
	profilePicture: {},
	profileContent: {
		marginTop: 8
	},
	editCameraWrap: {
		flexDirection: 'row',
		marginLeft: 15
	},
	iconStyle: {
		marginRight: 15,
		marginTop: 10
	},
	viewStyles: {
		// flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#1DCB86'
	},
	textStyles: {
		color: 'white',
		fontSize: 40,
		fontWeight: 'bold'
	}
});

export default styles;
