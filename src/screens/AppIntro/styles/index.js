import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		width: width,
		height: height
	},
	subContainer: {
		width: width,
		height: height-220
	},
	logoWrapper: {
		flexDirection: 'row',
		justifyContent:'center',
		alignContent:'center',
		alignItems:'center',
		alignSelf:'center',
		flex: 2
	},
	logo: {
		width: 46,
		height: 47,
		justifyContent:'center',
		alignContent:'center',
		alignItems:'center',
		alignSelf:'center',
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
		alignSelf:'center',
		flex: 4,
		justifyContent:'center',
		alignContent:'center',
		alignItems:'center'
	},
	slideImage3: {
		width:440,
		height:281
	},
	contentWrap: {
		alignSelf:'center',
		flex: 1,
		marginHorizontal: 10
	},
	decription: {
		textAlign: 'center',
		color: '#363636',
		lineHeight: 21,
		fontSize: 14
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
