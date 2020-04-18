import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
        padding: 10,
        marginTop: 20,
        height: height,
        width: width
    },
    cardContainer: {
        height: height - 200
    },
    card: {
        backgroundColor: '#ffffff',
        width: '100%',
        height: 90,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 10,
        shadowColor: '#707070',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2
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
        bottom: 20,
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
    }
});

export default styles;
