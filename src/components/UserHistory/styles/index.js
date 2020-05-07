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
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
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
		alignItems: 'center',
		padding: 10
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
        justifyContent: 'center'
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
	userText: {
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
        paddingLeft: 10,
        flex: 1,
        display: 'flex',
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
	},
	categoryCard: {
		position: 'absolute',
		alignItems: 'center',
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		right: 0,
		backgroundColor:'#0A8A7B'
	},
	cardText:{
		fontSize: 12,
		color:'white',
		fontWeight: 'bold'
	},
	remoteCard: {
		flex: 1,
		height: 23,
		width: 139,
		minWidth: 10,
		backgroundColor:'#00C57D',
		alignContent:'flex-end',
		alignSelf:'flex-end'
	},
	noteCard: {
		flex: 1,
		height: 23,
		width: 100,
		minWidth: 10,
		backgroundColor:'#0BE3DF',
		alignContent:'flex-end',
		alignSelf:'flex-end'
	},
	time: {
		marginTop: 3,
		width:23,
		height: 23,
		marginLeft: 10
	},
	descriptionWrap: {
		flex: 1,
		borderWidth: 1
	},
	closeIcon: {
		alignSelf: 'flex-end',
		position: 'relative'
	},
	modalTextWrap: {
		borderWidth: 1,
		borderColor: 'white',
		backgroundColor: '#ffffff',
		marginTop: 5,
		marginRight: 20,
		marginLeft: 10,
		padding: 20,
		borderRadius: 10
	},
	successModalText: {
		margin: 10,
		color: 'green',
		textAlign: 'center'
	},
	consultButton: {
		padding: 15,
		backgroundColor: '#0A8A7B',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#0A8A7B',
		marginBottom: 22
	},
	loginText: {
		color: '#fff',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
		textTransform: 'uppercase',
		marginRight: 10
	},
	filterHeader: {
		color:'#7C7C7C',
		fontSize: 14,
		textAlign:'center',
		paddingTop: 15,
		paddingBottom: 15,
		borderBottomWidth: 1,
		borderColor: '#DFDFDF'
	},
	filterHeader1: {
		color:'#7C7C7C',
		fontSize: 14,
		textAlign:'center',
		paddingTop: 15,
		paddingBottom: 15,
		borderBottomWidth: 1,
		borderColor: '#DFDFDF',
		borderTopWidth: 1,
		marginTop: 10
	},
	filterHeader2: {
		color:'#7C7C7C',
		fontSize: 14,
		textAlign:'center',
		paddingTop: 15,
		paddingBottom: 15,
		borderBottomWidth: 1,
		borderColor: '#DFDFDF',
		marginBottom: 30
	},
	footerText: {
		color: '#7C7C7C',
		fontSize: 13,
		fontWeight: 'bold',
		flex: 1
	},
	footerWrapper: {
		paddingTop: 10,
		borderBottomWidth: 1,
		borderColor: '#DFDFDF',
		flex: 1,
		paddingBottom: 10
	},
	footerImage: {
		marginRight: 7
	},
	footerContainer: {
		flex: 1,
		padding: 10
	},
	footerContent: {
		flex: 1,
		flexDirection: 'row'
	},
	modalWrap: {
		backgroundColor: '#000000aa',
		flex: 1,
		justifyContent: 'center'
	},
	filterText1: {
		color:'#00C57D',
		fontSize: 16,
		marginLeft: 10
		
	},
	filterHeaderContainer: {
		flexDirection:'row',
		alignSelf:'center',
		justifyContent:'center'
	},
	renderHeader:{
		borderWidth: 1,
		borderColor: '#dcdcdc',
		padding: 10,
		fontSize: 14,
		borderRadius: 30,
		height: 40,
		marginTop: 10,
		backgroundColor: '#FFF'
	},
	searchIcon: {
		position: 'relative'
	},
	searchContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection:'row',
		marginHorizontal: 5,
		marginVertical: 10
	},
	searchInput: {
		flex: 0.9
	},
	filterText: {
		fontSize: 12,
		fontWeight: 'bold',
		color: '#B8B8B8',
		paddingHorizontal: 5
	},
	filterIcon: {
		borderWidth: 1,
		borderColor: '#B8B8B8',
		paddingHorizontal: 15,
		borderRadius: 5,
		paddingVertical: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 0.2
	}
});

export default styles;
