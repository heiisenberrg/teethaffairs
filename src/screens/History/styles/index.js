import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		padding: 10
	},
	title: {
		fontWeight: 'bold',
		textTransform: 'capitalize',
		fontSize: 20,
		textAlign: 'center',
		color: '#0080ff'
	},
	questionWrapper: { padding: 5 },
	questionHeader1: {
		textTransform: 'capitalize',
		textAlign: 'center',
		color: '#0080ff',
		justifyContent: 'center'
	},
	questionHeader2: {
		fontWeight: 'bold',
		textTransform: 'capitalize',
		fontSize: 15,
		textAlign: 'center',
		color: '#0080ff'
	},
	questionInputWrapper: {
		borderWidth: 1,
		padding: 5,
		margin: 10,
		borderColor: '#0080ff'
	},
	questionInput: { height: 75, justifyContent: 'flex-start' },
	pickerWrapper: {
		borderWidth: 1,
		borderColor: '#0080ff',
		margin: 10
	},
	pickerHeader: {
		height: 20,
		width: 310,
		borderWidth: 1,
		borderColor: '#0080ff',
		margin: 10,
		opacity: 0.3
	},
	termsWrapper: {
		flexDirection: 'row'
	},
	termsText: { textTransform: 'capitalize', margin: 5, color: '#0080ff' }
});
export default styles;
