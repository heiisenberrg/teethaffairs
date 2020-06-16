import { StyleSheet, Dimensions } from 'react-native';
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
        padding: 10,
        marginVertical: 10,
        shadowColor: '#707070',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2
    },
    noteTitle: {
        flex: 1,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
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
    iconWrapper: {
        width: 30,
        height: 30,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;