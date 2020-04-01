import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		marginTop: 5
	},
	imagePreview: {
		width: '100%',
		height: 200,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#ccc',
		borderWidth: 1
	},
	imagePreview1: {
		width: 80,
		height: 80,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#ccc',
		borderWidth: 1,
		marginRight: 20
	},
	image: {
		width: '100%',
		height: '100%'
	},
	addFiles: {
		fontWeight: 'bold',
		fontSize: 15,
		marginBottom: 10
	},
	imageContainer: {
		flexDirection: 'row'
	}
});

export default styles;
