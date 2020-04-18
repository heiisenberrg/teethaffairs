import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		width: width,
		flexGrow: 1
	},
	profileContainer: {
		flex: 1
	},
	profileWrapper: {
		borderColor: '#ffffff',
		flexDirection: 'row',
		borderWidth: 1,
		flex: 1,
		shadowColor: '#707070',
		shadowRadius: 2,
		backgroundColor: '#ffffff',
		borderTopRightRadius: 5,
		borderTopLeftRadius: 5,
		display: 'flex',
		paddingHorizontal: 10,
		shadowOffset: { width: 10, height: 2 },
		elevation: 10,
		minHeight: 100
	},
	profileImage: {
		width: 45,
		height: 45,
		marginLeft: 10,
		marginTop: 10
	},
	userContentWrapper: {
		flex: 6
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
		borderColor: '#f2eded',
		borderWidth: 1,
		minHeight: 35,
		backgroundColor: '#fcfafa',
		flex: 1,
		shadowColor: '#707070',
		shadowRadius: 1,
		borderBottomRightRadius: 5,
		borderBottomLeftRadius: 5,
		paddingHorizontal: 10,
		shadowOffset: { width: 0, height: 0 },
		elevation: 2
	},
	iconContainer: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		alignContent: 'center',
		position: 'relative',
		right: 10
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
		position: 'relative',
		left: '81%',
		bottom: '4%'
	},
	containerButton: {
		position: 'absolute',
		top: 30,
		left: 8
	},
	button: {
		width: 53,
		height: 53
	},
	modalWrap: {
		backgroundColor: '#000000aa',
		flex: 1,
		justifyContent: 'center'
	},
	successModalTextWrap: {
		borderRadius: 10,
		margin: 25
	},
	successTextWrap: {
		alignItems: 'center',
		marginBottom: 40
	},
	closeIcon: {
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
		textAlign: 'right',
		marginLeft: 260,
		marginTop: 10
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
	},
	hideText: {
		display: 'none'
	},
	membersContainer: {
		padding: 10
	},
	profile: {
		flex: 2
	}
});

export default styles;
