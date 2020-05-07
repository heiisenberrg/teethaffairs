import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        width: '100%',
        height: 'auto',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        marginVertical: 10,
        shadowColor: '#707070',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        flex: 1
    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        padding: 10

    },
    avatar: {
        width: 20,
        height: 20
    },
    time: {
        marginTop: 3,
        width:23,
        height: 23,
        marginLeft: 10
    },
    content: {
        paddingHorizontal: 10,
        flex: 1,
        width: '100%',
        padding: 5
    },
    noteTitle: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    avatarContent: {
        margin: 5,
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    person: {
        paddingHorizontal: 10
    },
    normalText: {
        fontSize: 14,
        color: '#B8B8B8',
        textTransform: 'capitalize'
    },
    circleWrapper: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#959CAC',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: -5
    },
    doctorDetails: {
        flex: 1,
        flexDirection:'row',
        marginBottom: 20,
        padding: 10,
        shadowColor: '#707070',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2
    },
    doctorProfile: {
        flex: 3
    },
    doctorInfo: {
        flex: 10
    },
    doctorPic: {
        height: 60,
        width: 60
    },
    doctorNameText: {
        fontSize: 14,
        color:'#363636',
        fontWeight:'bold',
        textTransform:'capitalize'
    },
    addressText:{
        fontSize: 12,
        lineHeight: 20
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
    scrollViewContainer: {
		maxHeight: 300
	}, 
	scrollView: {
		flexGrow: 1
    },
    userContainer: {
		paddingHorizontal: 10,
		marginBottom: 5
    },
    profileWrapper: {
		paddingVertical: 5
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
    separator: {
		borderBottomWidth: 1,
		borderRadius: 5,
		borderStyle: 'dashed',
		borderColor: '#CAC7C7'
    },
    divider: {
        height: 25,
		backgroundColor: '#108E79'
    },
    doctorNotesContainer: {
        paddingTop: 30,
        padding: 10
    }
});

export default styles;
