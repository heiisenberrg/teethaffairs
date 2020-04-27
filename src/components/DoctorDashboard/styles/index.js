import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
		backgroundColor: 'white',
		flexGrow: 1,
		width,
		padding: 10
	},
	profileNameContainer: {
        textAlign: 'center',
        marginVertical: 10
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
    wrapper: {
        flex: 1,
        display: 'flex'
    },
    questionContainer: {
        flex: 1,
        display: 'flex'
    },
    emptyResult: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#3F4440',
        alignSelf: 'center'
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
        elevation: 4
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
        height: 20,
        borderRadius: 50
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
    }
});

export default styles;