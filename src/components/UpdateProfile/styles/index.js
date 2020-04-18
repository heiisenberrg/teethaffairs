import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
        flexGrow: 1,
        width,
        height: (height - 210)
    },
    formWrapper: {
        paddingHorizontal: 10
    },
    imageWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
		marginVertical: 30,
		borderColor: '#0A8A7B',
		borderStyle: 'dashed',
		borderRadius: 50,
		borderWidth: 1
	},
	image: {
		width: 100,
        height: 100,
        borderRadius: 50
    },
    dataPicker: {
        display: 'flex',
        flex: 1,
        width: '100%',
        paddingRight: 20
    },
    datePickerContainer: {
        width,
		height: 80,
		position: 'relative'
	},
	labelContainer: {
		position: 'absolute',
		backgroundColor: '#FFF',
		top: -12,
		left: 16,
		padding: 5,
		zIndex: 1
	},
	label: {
		color: '#6A6A6A',
		backgroundColor: 'white',
		fontSize: 12
    },
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default styles;
