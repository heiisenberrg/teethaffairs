import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		padding: 10
	},
	dentalVisitWrapper: { marginTop: 10 },
	title: {
		margin: 5,
		color: '#0080ff',
		textTransform: 'capitalize'
	},
	pickerWrapper: {
		borderWidth: 1,
		borderColor: '#0080ff',
		margin: 5
	},
	pickerContainer: {
		height: 20,
		width: 300,
		borderWidth: 1,
		borderColor: '#0080ff',
		margin: 10,
		opacity: 0.3
	},
	note: {
		margin: 5,
		color: '#0080ff'
	},
	noteWrapper: {
		padding: 5,
		margin: 5,
		borderWidth: 1,
		borderColor: '#0080ff'
	},
	noteText: { height: 110, justifyContent: 'flex-start' },
	feesText: {
		margin: 5,
		color: '#0080ff'
	},
	feesWrapper: {
		padding: 5,
		margin: 5,
		borderWidth: 1,
		borderColor: '#0080ff'
	},
	feesInput: { height: 40, justifyContent: 'flex-start' },
	buttonWrapper: { margin: 5 }
});

export default styles;
