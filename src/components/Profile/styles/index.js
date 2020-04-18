import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flexGrow: 1,
		borderTopColor:'#D2D2D2',
		borderTopWidth: 1,
		width: width,
		padding: 10
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
		alignSelf: 'center',
		flex: 1
	},
	imageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignSelf: 'center',
		alignContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	imageWrap1: {
		backgroundColor: '#129079',
		marginRight: 10,
		height: 122,
		borderRadius: 5,
		justifyContent: 'center',
		// marginLeft: 20,
		flex: 1
	},

	imageWrap2: {
		backgroundColor: '#00C1F8',
		marginRight: 10,
		height: 122,
		borderRadius: 5,
		justifyContent: 'center',
		flex: 1

	},
	imageWrap3: {
		backgroundColor: '#1CD08F',
		// marginRight: 10,
		height: 122,
		borderRadius: 5,
		justifyContent: 'center',
		flex: 1

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
		alignSelf:'center'
	},
	profileWrapper: {
	flex: 1
	},
	buttonContainer: {
		marginBottom: 36
	}
});

export default styles;
