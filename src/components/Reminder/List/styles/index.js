import { Dimensions, StyleSheet, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		padding: 10,
		marginTop: 20,
		height: height,
		width: width
	},
	fabButton: {
		position: 'absolute',
		backgroundColor: '#00C57D',
		width: 50,
		height: 50,
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
		...Platform.select({
            ios: {
              bottom: 10
            },
            android: {
              bottom: 25
            }
		}),
		right: 0,
		shadowColor: '#000000',
		shadowOpacity: 0.8,
		shadowRadius: 1,
		shadowOffset: {
			height: 1,
			width: 0
		},
		elevation: 2,
		zIndex: 101
	},
	fabIcon: {
		width: 35,
		height: 35
	},
	divider: {
		height: 25,
		backgroundColor: '#108E79'
	},
	cardContainer: {
		backgroundColor: 'white',
		borderRadius: 5,
		marginVertical: 10,
		marginHorizontal: 10,
		shadowColor: '#000000',
		shadowOpacity: 0.2,
		shadowRadius: 2,
		shadowOffset: {
			height: 1,
			width: 1
		},

		elevation: 2
	},
	cardContent: {
		padding: 10,
		top: 10
	},
	profileImage: {
		width: 45,
		height: 45
	},
	statusContainer: {
		position: 'absolute',
		bottom: 1,
		right: -15,
		borderRadius: 10,
		width: 17,
		height: 17,
		borderWidth: 0.5,
		marginRight: 10
	},
	statusContent: {
		paddingLeft: 1,
		paddingTop: 1
	},
	titleContainer: {
		marginHorizontal: 10,
		width: '82%'
	},
	timeContainer: {
		width: 60,
		padding: 3,
		borderRadius: 15,
		backgroundColor: '#00C57D',
		marginLeft: 10
	},
	actionContainer: {
		width: '35%'
	},
	mediumText: {
		fontSize: 12
	},
	expandedContainer: {
		backgroundColor: '#DADADA',
		padding: 10,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		top: 15
	},
	editContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	editText: {
		fontSize: 12,
		marginLeft: 5
	},
	deleteContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	deleteText: {
		color: '#FA5050',
		fontSize: 12,
		marginLeft: 5
	},
	filterContainer: {
		position: 'absolute',
		width: '75%',
		alignSelf: 'center',
		zIndex: 101
	},
	filter: {
		flexDirection: 'column',
		backgroundColor: '#ffffff',
		borderRadius: 20,
		paddingHorizontal: 10,
		zIndex: 101,
		top: 0,
		maxHeight: 600,
		shadowColor: '#707070',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 2,
		elevation: 2
	},
	filterWrapper: {
		paddingHorizontal: 10,
		paddingVertical: 10
	},
	filterImage: {
		width: 35,
		height: 35
	},
	filterContent: {
		width: '80%',
		marginHorizontal: 10
	},
	filterText: {
		fontSize: 14,
		color: '#363636'
	},
	filterArrow: {
		width: 25,
		height: 25,
		borderRadius: 20,
		shadowOpacity: 0.2,
		shadowOffset: {
			height: 1,
			width: 1
		},
		shadowRadius: 3,
		elevation: 2,
		borderColor: 'grey',
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 2,
		paddingTop: 2
	},
	listContainer: {
		flex: 1,
		marginBottom: 200
	},
	daysContainer: {
		marginVertical: 15,
		paddingHorizontal: 10
	},
	daysContent: {
		borderRadius: 5,
		borderWidth: 0.5,
		width: 45,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},
	userContainer: {
		paddingHorizontal: 10,
		marginBottom: 5
	},
	dashColor: {
		color: 'grey'
	},
	expandedTitle: {
		fontSize: 14
	},
	expandedSubtitle: {
		fontSize: 12,
		color: '#363636'
	},
	scrollViewContainer: {
		maxHeight: 300
	}, 
	scrollView: {
		flexGrow: 1
	},
	userContent: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '80%',
		marginHorizontal: 10
	},
	userContentText: {
		fontSize: 14,
		color: '#363636'
	},
	profileWrapper: {
		paddingVertical: 5
	},
	separator: {
		borderBottomWidth: 1,
		borderRadius: 5,
		borderStyle: 'dashed',
		borderColor: '#CAC7C7'
	},
	modalContainer: {
		backgroundColor: '#000000aa',
		flex: 1,
		justifyContent: 'center'
	},
	modalContent: {
		marginHorizontal: 20,
		padding: 20,
		borderRadius: 10,
		backgroundColor: 'white'
	},
	crossButton: { 
		justifyContent: 'center', 
		alignItems: 'flex-end' 
	},
	profileContainer: { 
		paddingTop: 0, 
		top: 0 
	},
	profileContent: {
		borderWidth: 0.3,
		borderColor: '#767676',
		opacity: 0.6,
		marginVertical: 10
	},
	proImage: { 
		padding: 10, 
		paddingTop: 0 
	},
	proText: { 
		width: '50%', 
		marginHorizontal: 10 
	},
	radioContainer: {
		width: 15,
		height: 15,
		borderWidth: 1,
		borderColor: '#767676',
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 10
	},
	radioGroup: {
		width: 10,
		height: 10,
		borderRadius: 10
	},
	width80: { 
		width: '80%'
	},
	editContent: { 
		padding: 10 
	},
	modContent: { 
		alignItems: 'center', 
		marginVertical: 10 
	},
	modStatus: {
		borderRadius: 10,
		width: 17,
		height: 17,
		borderWidth: 0.5,
		marginRight: 10
	}
});

export default styles;
