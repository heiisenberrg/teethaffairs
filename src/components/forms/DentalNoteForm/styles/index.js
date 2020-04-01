import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	title: {
		margin: 10,
		fontWeight: 'bold',
		color: '#0080ff',
		textTransform: 'capitalize',
		fontSize: 20,
		textAlign: 'center'
	},
	notes: {
		borderWidth: 1,
		padding: 5,
		margin: 10,
		borderColor: '#0080ff'
	},
	dentalText: {
		height: 75,
		justifyContent: 'flex-start'
	},
	symHeader: {
		margin: 5
	},
	symText: { height: 50, justifyContent: 'flex-start' },
	buttonWrap: {
		margin: 10
	},
	symTextInput: {
		borderColor: '#0080ff',
		borderWidth: 1,
		padding: 5,
		margin: 10
	},
	image: {
		width: 70,
		height: 70
	},
	container: {
		borderColor: 'white',
		margin: 10,
		shadowColor: 'white',
		shadowOpacity: 0.1,
		shadowRadius: 0.1,
		elevation: 1,
		borderRadius: 5
	},
	notesHeader: {
		flexDirection: 'row',
		padding: 20
	},
	notesHeaderTitle: {
		textTransform: 'capitalize',
		fontWeight: 'bold'
	},
	subImage: {
		width: 35,
		height: 35
	},
	date: {},
	subHeader: {
		flexDirection: 'row'
	},
	description: {
		borderWidth: 1,
		borderColor: 'black',
		flexWrap: 'wrap',
		width: 50
	}
});

export default styles;
