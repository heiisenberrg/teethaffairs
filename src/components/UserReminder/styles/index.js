import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		padding: 10
	},
	reminderHeaderText: {
		fontWeight: 'bold',
		color: '#0080ff',
		textTransform: 'capitalize',
		justifyContent: 'center',
		alignContent: 'center',
		textAlign: 'center',
		fontSize: 17
	},
	reminderWrap: { marginTop: 10 },
	dropDown: {
		margin: 5,
		color: '#0080ff'
	},
	pickerWrap: {
		borderWidth: 1,
		borderColor: '#0080ff',
		margin: 5
	},
	pickerHeader: {
		height: 20,
		width: 300,
		borderWidth: 1,
		borderColor: '#0080ff',
		margin: 10,
		opacity: 0.3
	},
	descText: {
		margin: 5,
		color: '#0080ff'
	},
	descWrap: {
		padding: 5,
		margin: 5,
		borderWidth: 1,
		borderColor: '#0080ff'
	},
	descInput: { height: 110, justifyContent: 'flex-start' },
	buttonWrap: { margin: 5 }
});
export default styles;
