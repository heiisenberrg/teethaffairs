import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	profileNameContainer: {
		textAlign: 'center',
		marginTop: 41
	},
	profileName: {
		fontSize: 25,
		textTransform: 'capitalize',
		color: '#3F4440',
		fontWeight: 'normal'
	},

	userName: {
		fontSize: 25,
		textTransform: 'capitalize',
		color: '#3F4440',
		fontWeight: 'bold'
	},
	welcomeText: {
		fontSize: 25,
		textTransform: 'capitalize',
		color: '#3F4440',
		textAlign: 'center'
	},
	contentWrapText: {
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		marginTop: 25
	},
	contentText: {
		fontSize: 13,
		textAlign: 'center',
		color: '#3F4440',
		lineHeight: 19
	},
	imageStyle: {
		marginTop: 24,
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	},
	imageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignSelf: 'center',
		alignContent: 'center',
		alignItems: 'center'
	},
	imageWrap1: {
		backgroundColor: '#129079',
		marginRight: 10,
		width: 120,
		height: 120,
		borderRadius: 5,
		justifyContent: 'center',
		marginLeft: 20
	},

	imageWrap2: {
		backgroundColor: '#00C1F8',
		marginRight: 10,
		width: 120,
		height: 120,
		borderRadius: 5,
		justifyContent: 'center'
	},
	imageWrap3: {
		backgroundColor: '#1CD08F',
		marginRight: 10,
		width: 120,
		height: 120,
		borderRadius: 5,
		justifyContent: 'center'
	},
	contentWrap: {
		alignItems: 'center'
	},
	imageContent: {
		textAlign: 'center',
		textTransform: 'capitalize',
		padding: 5,
		color: 'white',
		fontSize: 15,
		lineHeight: 20
	},
	questionHeaderText: {
		fontSize: 19,
		color: '#3F4440',
		textAlign: 'center',
		fontWeight: 'bold',
		marginTop: 43,
		marginBottom: 26
	},
	centerContainer: {
		flex: 1,
		alignSelf:'center',
		marginTop: 8
	}
});

export default styles;
