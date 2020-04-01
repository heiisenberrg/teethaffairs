import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		justifyContent: 'center',
		alignSelf: 'stretch',
		textAlign: 'center',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	},
	profileContainer: {
		flex: 1,
		backgroundColor: 'white'
	},
	profileWrapper: {
		borderColor: '#f5f5f5',
		borderWidth: 1,
		width: 370,
		minHeight: 70,
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
		shadowColor: '#555555',
		shadowOpacity: 0.5,
		shadowRadius: 1,
		elevation: 10,
		alignSelf: 'center',
		marginTop: 15,
		paddingTop: 5,
		paddingBottom: 10,
		borderTopLeftRadius: 5,
		borderTopEndRadius: 5
	},
	profileImage: {
		width: 40,
		height: 40,
		marginLeft: 10,
		marginTop: 10
	},
	userContentWrapper: {
		borderColor: 'grey',
		marginLeft: 20,
		marginTop: 10
	},
	userName: {
		fontWeight: 'bold',
		color: '#363636',
		textTransform: 'capitalize',
		marginTop: 5
	},
	userEmail: {
		fontSize: 12,
		color: '#6C6868',
		marginTop: 5
	},
	editChoice: {
		borderColor: '#f5f5f5',
		borderWidth: 1,
		width: 370,
		minHeight: 20,
		backgroundColor: '#f5f5f5',
		shadowColor: '#555555',
		shadowOpacity: 0.5,
		shadowRadius: 1,
		elevation: 10,
		alignSelf: 'center',
		marginTop: -1,
		padding: 5,
		borderBottomStartRadius: 5,
		borderBottomEndRadius: 5,
		flexDirection: 'row'
	},
	iconContainer: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'flex-end',
		alignSelf: 'center',
		alignItems: 'center',
		alignContent: 'center'
	},
	image: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 60,
		marginRight: 5
	},
	editText: {
		fontSize: 12,
		color: '#363636',
		textTransform: 'uppercase',
		fontWeight: 'bold',
		marginLeft: 5
	},
	deleteText: {
		fontSize: 12,
		color: '#FA5050',
		textTransform: 'uppercase',
		fontWeight: 'bold',
		marginLeft: 5
	},
	noMemberList: {
		fontWeight: 'bold',
		textAlign: 'center',
		flex: 1,
		marginTop: 100
	},
	bottom: {
		paddingTop: 100,
		paddingBottom: 10,
		marginLeft: 310
	},
	containerButton: {
		position: 'absolute',
		top: 30,
		left: 8
	},
	button: {
		width: 60,
		height: 60
	},
	modalWrap: {
		backgroundColor: '#000000aa',
		flex: 1,
		justifyContent: 'center'
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
	closeIcon: {
		marginLeft: 300
	},
	successIcon: {
		marginTop: 20
	},

	successModalText: {
		marginTop: 10,
		color: 'white'
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
	},
	modalButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'center'
	}
});

export default styles;
