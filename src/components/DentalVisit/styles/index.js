import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
	container: {
        padding: 10,
        marginTop: 20,
        maxHeight: (height - 210),
        width: width
    },
    cardContainer: {
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
        paddingHorizontal: 10,
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
        fontSize: 18,
        fontWeight: '400'
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
        bottom: 50,
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
    filter: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        paddingHorizontal: 10,
        width: '75%',
        alignSelf: 'center',
        position: 'absolute',
        zIndex: 101,
        top: 0,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#707070',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2
    },
    filterWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 1
    },
    filterArrow: {
        justifyContent: 'flex-end'
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
    }
});

export default styles;
