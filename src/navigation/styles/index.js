import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	homeIcon: {
		justifyContent: 'center',
		marginTop: 20
	},
	container: {
		flexDirection: 'row'
	},
	icon: {
		width: 38,
		height: 38,
		marginRight: 11
	},
	companyText1: {
		fontSize: 21,
		color: '#1DCB86',
		fontWeight: 'bold',
		textTransform: 'uppercase'
	},
	companyText2: {
		fontSize: 21,
		color: '#1DCB86',
		fontWeight: 'normal',
		textTransform: 'uppercase'
	},
	companyTextWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent:'center',
		alignContent:'center',
		alignSelf:'center'
	},
	noteTitle: {
		color: 'white',
		fontWeight: 'bold',
		textTransform:'uppercase',
		fontSize: 21
	}
});

export default styles;
