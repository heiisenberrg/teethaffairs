import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
		marginHorizontal: 20
	},
	dentalVisitWrapper: { marginTop: 10 },
	wrapper: {  
		paddingTop: 2,
		display: 'flex'
	},
	title: {
		margin: 5,
		color: '#000',
		textTransform: 'capitalize'
	},
	experienceText: {
		textTransform: 'capitalize'
	},
	inputText: {
		borderColor: '#A1A1A1',
		borderWidth: 1,
		color: 'black',
		borderRadius: 5,
		height: 50,
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
	},
	dropdownContainer: {
		marginHorizontal: 6,
		elevation: 2,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderColor: '#A1A1A1'
	},
	dropDownContent: {
		borderBottomWidth: 0.5, 
		borderColor: '#A1A1A1', 
		padding: 10, 
		justifyContent: 'center', 
		alignItems: 'center'
	},
	flexRow: {
		flexDirection: 'row', 
		justifyContent: 'space-between', 
		alignItems: 'center'
	},
	flexEnd: {
		justifyContent: 'flex-end', 
		alignItems: 'flex-end'
	},
	errorText: {
		color: '#CF0000',
		fontSize: 12,
		margin: 5
	}
});

export default styles;
