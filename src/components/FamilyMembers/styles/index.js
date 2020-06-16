import { StyleSheet, Dimensions, Platform } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		padding: 10,
		marginVertical: 5,
		...Platform.select({
            ios: {
				height: (height - 170)
            },
            android: {
				height: (height - 150)
            }
		}),
		width
	},
	listContainer: {
		display: 'flex',
		justifyContent: 'center',
		flex: 1
	},
	noMemberText: {
		alignSelf: 'center'
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
		right: 10,
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
	expandedTitle: {
		textTransform: 'capitalize',
		fontSize: 14,
		fontWeight: 'bold'
	},
	expandedSubTitle: {
		fontSize: 12,
		color: '#B1AFAF'
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
		padding: 10
	},
	profileImage: {
		width: 45,
		height: 45
	},
	titleContainer: {
		marginHorizontal: 10,
		width: '82%'
	},
	actionContainer: {
		width: '35%'
	},
	mediumText: {
		fontSize: 12
	},
	expandedContainer: {
		borderTopColor: '#B1AFAF',
		borderTopWidth: 0.2,
		backgroundColor: '#fafafa',
		padding: 10,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5
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
		alignItems: 'center',
		position:'relative',
		left: 5
	},
	deleteText: {
		color: '#FA5050',
		fontSize: 12,
		marginLeft: 5
	},
	modalWrap: {
		backgroundColor: '#000000aa',
		flex: 1,
		justifyContent: 'center'
	},
	successModalTextWrap: {
		borderRadius: 10,
		margin: 25
	},
	successTextWrap: {
		alignItems: 'center',
		marginBottom: 40
	},
	closeIcon: {
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
		marginLeft: 300,
		marginTop: 10
	},
	successIcon: {
		marginTop: 20
	},
	successModalText: {
		marginTop: 10,
		color: 'white'
	},
	continueButton: {
		paddingTop: 5,
		paddingBottom: 5,
		backgroundColor: 'white',
		borderRadius: 20,
		borderWidth: 1,
		borderColor: 'white',
		width: 120,
		marginBottom: 10,
		alignItems: 'center',
		alignContent: 'center',
		alignSelf: 'center',
		marginLeft: 10
	},
	continueButtonText: {
		color: '#555555',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
		textTransform: 'uppercase'
	},
	modalButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	hideText: {
		display: 'none'
	},
	membersContainer: {
		padding: 10
	},
	profile: {
		flex: 2
	}
});

export default styles;
