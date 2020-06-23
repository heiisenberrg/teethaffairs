import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        flexGrow: 1,
        backgroundColor: '#FFFFFF'
    },
    container: {
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    profileWrapper: {
        margin: 10,
        padding: 10
    },
    title: {
        justifyContent: 'center',
        fontSize: 18
    },
    sectionWrapper: {
        marginVertical: 15
    },
    officeWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    content: {
        flexGrow: 1,
        marginTop: 15,
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
        shadowOpacity: 0.2,
		shadowOffset: {
			height: 2,
			width: 0
		},
		shadowRadius: 2,
        elevation: 4
    },
    circleWrapper: {
        backgroundColor: '#EFEFEF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        height: 25,
        width: 25,
        shadowOpacity: 0.4,
		shadowOffset: {
			height: 2,
			width: 0
		},
		shadowRadius: 4,
        elevation: 4
    },
    licenceContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10
    },
    imageReport: {
        width: 100,
        height: 70,
        borderRadius: 10,
        marginRight: 10
    },
    imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
		width: 100,
        height: 100,
        borderRadius: 50
    },
    imageContainer: {
		marginVertical: 15,
		borderColor: '#0A8A7B',
		borderStyle: 'dashed',
		borderRadius: 50,
		borderWidth: 1
	},
	noSpace: {
		marginTop: -10
	}
}); 

export default styles;
