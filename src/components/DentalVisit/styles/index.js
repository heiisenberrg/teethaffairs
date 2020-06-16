import { Dimensions, StyleSheet, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
        padding: 10,
        marginTop: 20,
        height: (height - 210),
        width: width
    },
    cardContainer: {
        display: 'flex',
        flex: 1,
        maxHeight: (height - 210),
        paddingBottom: 10
    },
    card: {
        backgroundColor: '#ffffff',
        width: '100%',
        height: 'auto',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        marginVertical: 10,
        shadowColor: '#707070',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2
    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 50,
        height: 50
    },
    avatar: {
        width: 20,
        height: 20
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
        fontSize: 14,
        fontWeight: '500'
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
        paddingHorizontal: 5
    },
    fabButton: {
        position: 'absolute',
        backgroundColor: '#00C57D',
        width: 60,
        height: 60,
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
        right: 20,
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 0
        },
        elevation: 2,
        zIndex: 101
    },
    fabIcon: {
        width: 50,
        height: 50
    },
    divider: {
        height: 25,
        backgroundColor: '#108E79'
    },
    descriptionContainer: {
        display: 'flex',
        paddingVertical: 10
    },
    description: {
        fontSize: 14,
        color: '#707070',
        paddingHorizontal: 5
    },
    reportContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10
    },
    imageReport: {
        width: 75,
        height: 75,
        marginRight: 10
    },
    emptyResult: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10
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
    visitContainer: {
        flex: 1,
        height,
        width
    },
    visitHeader: {
        display: 'flex',
        padding: 10
    },
    visitWrapper: {
        padding: 10,
        margin: 15,
        shadowColor: '#707070',
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.5,
				shadowRadius: 2,
        elevation: 2,
        backgroundColor: 'white',
        borderRadius: 5
    },
    circleWrapper: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#959CAC',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconWrapper: {
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: '#959CAC',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },
    deleteWrapper: {
        width: 30,
        height: 30,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F77474'
    },
    titleWrapper: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    visitTitle: {
        fontWeight: 'bold',
        fontSize: 16
    },
    nameWrapper: {
        paddingVertical: 4,
        justifyContent: 'space-between'
    },
    light: {
        color: '#8E8B8B',
        textAlign: 'center'
    },
    boldText: {
        fontWeight: 'bold',
        paddingVertical: 10,
        textTransform: 'capitalize'
    },
    rowContainer: {
        marginHorizontal: 10,
        marginVertical: 10
    },
    backButton: {
        marginHorizontal: 10
    }
});

export default styles;
