import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	note: {
		fontSize:11,
		marginTop: -22,
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
		marginTop: -20,
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
		marginTop: 200,
		fontWeight: 'bold',
		color: '#3F4440',
		marginBottom: 10
	}
});

export default styles;
