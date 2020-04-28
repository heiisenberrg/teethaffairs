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
    content: {
        flexGrow: 1,
        marginTop: 15,
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF'
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
    eyeIcon: {
		position: 'absolute',
		right: 20,
		top: 15
    },
    labelContainer: {
		position: 'absolute',
		backgroundColor: '#FFF',
		top: -15,
		left: 14,
		padding: 7,
		zIndex: 1
	},
	textInputContainer: {
		height: 45,
		width: '100%',
		position: 'relative'
	},
	label: {
		color: '#6A6A6A',
		backgroundColor: 'white',
		fontSize: 12
    },
    errorText: {
		color: '#CF0000',
		marginBottom: 10,
		marginTop: 1,
		textAlign: 'left',
		fontSize: 12,
		marginLeft: 10
	},
	dataPicker: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#A1A1A1',
		justifyContent: 'flex-end',
		borderRadius: 20,
		paddingHorizontal: 25,
		width: '100%'
    },
    calenderStyle: {
		position: 'absolute',
		right: 10,
		top: 10
	},
	calenderText: {
		position: 'absolute',
		left: 20,
		top: 13,
		color: 'grey',
		fontSize: 12
	}
}); 

export default styles;