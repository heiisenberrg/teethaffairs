import { StyleSheet } from 'react-native';

const groupButton = {
	color: '#14DF94',
	borderWidth: 1,
	paddingHorizontal: 50,
	paddingVertical: 5,
	borderColor: '#14DF94'
};

const styles = StyleSheet.create({
	note: {
		fontSize:11,
		marginTop: -15,
		marginBottom: 20,
		color:'#6A6A6A',
		marginLeft: 15
	},
	forgetPassword: {
		fontSize: 12,
		textAlign: 'center',
		color: '#003CFF',
		textDecorationLine: 'underline',
		marginTop: 21
	},
	responseWrap: {
		marginTop: -10,
		marginBottom: 10
	},
	failedResponse: {
		color: '#CF0000',
		fontSize: 12,
		marginLeft: 17
	},
	eyeIcon: {
		position: 'absolute',
		right: 20,
		top: 15
	},
	header: {
		textAlign: 'center',
		fontSize: 22,
		marginTop: 25,
		fontWeight: 'bold',
		color: '#3F4440',
		marginBottom: 10
	},
	textInput: {
		flex: 1,
		borderWidth: 1,
		color: 'black',
		borderColor: '#A1A1A1',
		justifyContent: 'flex-end',
		height: 44,
		borderRadius: 20,
		paddingHorizontal: 25
	},
	textInputContainer: {
		position: 'relative',
		marginBottom: 14
	},
	labelContainer: {
		position: 'absolute',
		backgroundColor: '#FFF',
		top: -15,
		left: 14,
		padding: 5,
		zIndex: 1
	},
	errorText: {
		color: '#CF0000',
		fontSize: 12,
		marginLeft: 17
	},
	groupButtonContainer: {
		marginTop: 100,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	groupButton: {
		color: '#14DF94',
		borderWidth: 1,
		paddingHorizontal: 50,
		paddingVertical: 5,
		borderColor: '#14DF94'
	},
	buttonLeftCorner: {
		...groupButton,
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5
	},
	buttonRightCorner: {
		...groupButton,
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5
	},
	activeGroupButton: {
		backgroundColor: '#14DF94',
		color: '#ffffff'
	}
});

export default styles;
