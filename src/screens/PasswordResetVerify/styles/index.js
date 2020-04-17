import { StyleSheet, Dimensions } from 'react-native';

const {  width } = Dimensions.get('screen');

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: '#1DCB86',
		width: width
	},
	logo: {
		marginTop: 200,
		alignSelf:'center'
	},
	content1: {
		fontSize: 24,
		color: '#FFFFFF',
		fontWeight:'bold',
		textTransform: 'capitalize',
		marginTop: 35,
		textAlign:'center'
	},
	content2: {
		fontSize: 14,
		color: '#FFFFFF',
		marginTop: 18,
		textAlign:'center'
	},
	content3: {
		fontSize: 14,
		color: '#FFFFFF',
		marginTop: 5,
		textAlign:'center'
	},
	buttonWrap: {
		alignSelf: 'center',
		marginTop: 45
	}
});

export default styles;
