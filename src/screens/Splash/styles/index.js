import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1DCB86',
		resizeMode: 'cover'
	},
	logoWrap: { 	
		textAlign: 'center',
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		height: '100%' 
	},
	logo: {
		width: 83,
		height: 82,
		marginBottom: 8
	},
	companyTextWrap: {
		flexDirection:'row'
	},
	companyText1: {
		fontSize: 30,
		color:'#FFFFFF',
		fontWeight:'bold'
	},
	companyText2: {
		fontSize: 30,
		color:'#FFFFFF'
	}
});

export default styles;
