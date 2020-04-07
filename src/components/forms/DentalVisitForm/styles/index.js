import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
		marginHorizontal: 20
	},
	dentalVisitWrapper: { marginTop: 10 },
	wrapper: {  
		paddingVertical: 5,
		display: 'flex'
	},
	title: {
		margin: 5,
		color: '#000',
		textTransform: 'capitalize'
	},
	inputText: {
		borderColor: '#A1A1A1',
		borderWidth: 1,
		borderRadius: 5,
		height: 40,
		marginHorizontal: 5,
		fontSize: 16,
		paddingHorizontal: 10
	},
	inputTextExpanded: {
		height: 100
	},
	button: {
		width: '100%',
		marginVertical: 20
	},
	fileContainer: {
		display: 'flex',
		flexDirection: 'row'
	},
	addTile: {
		width: 75,
		height: 75,
		borderRadius: 5,
		borderColor: '#0A8A7B',
		borderStyle: 'dashed',
		borderWidth: 2,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 5
	},
	textContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	lightText: {
		textAlign: 'center',
		color: '#A1A1A1'
	},
	image: {
		width: '100%',
		height: '100%'
	},
	imagePreview: {
		width: 75,
		height: 75,
		borderRadius: 5,
		borderColor: 'transparent',
		margin: 5,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		flexDirection: 'row'
	},
	radioContainer: {
		flexDirection: 'row'
	}
});

export default styles;
