import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		flexGrow: 1
	},
	logoWrapper: {
		flexDirection: 'row'
	},
	logo: {
		width: 46,
		height: 47,
		marginRight: 23,
		marginTop: -8
	},
	companyTextWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center'
	},
	companyText1: {
		color: '#1DCB86',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		fontSize: 21
	},
	companyText2: {
		color: '#1DCB86',
		textTransform: 'uppercase',
		fontSize: 21
	},
	slidesHome: {
		marginTop: 100,
		marginBottom: 34
	},
	slideImage: {
		width: 307,
		height: 200
	},
	decription: {
		textAlign: 'center',
		color: '#363636',
		marginTop: 10,
		lineHeight: 21
	},
	decription1: {
		textAlign: 'center',
		color: '#B3B3B3',
		marginTop: 20,
		lineHeight: 21,
		fontSize: 12
	},
	dotStyle: {
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: '#1DCB86'
	},
	activeDotStyle: {
		backgroundColor: '#1DCB86'
	},
	buttonWrapper: {
		alignSelf: 'center'
	}
});

export default styles;
