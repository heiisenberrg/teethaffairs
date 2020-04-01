import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		padding: 10
	},
	primaryUserContainer: {
		borderWidth: 1,
		backgroundColor: '#0080ff',
		borderColor: '#0080ff',
		flexDirection: 'row',
		marginBottom: 10
	},
	primaryWrap: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		padding: 15
	},
	primaryNameBlock: { paddingLeft: 10, paddingRight: 90 },
	primaryNameText: { fontSize: 20, color: 'white', fontWeight: 'bold' },
	primaryNameSubText: { fontSize: 10, color: 'white' },
	secondaryUserContainer: {
		borderWidth: 1,
		backgroundColor: '#e6f7ff',
		borderColor: '#e6f7ff',
		flexDirection: 'row',
		marginRight: 15,
		marginLeft: 15
	},
	secondaryWrap: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		padding: 15
	},
	secondaryNameBlock: { paddingLeft: 10, paddingRight: 90 },
	secondaryNameText: { fontSize: 20, color: '#0080ff', fontWeight: 'bold' },
	secondaryNameSubText: { fontSize: 10, color: '#0080ff' }
});

export default styles;
