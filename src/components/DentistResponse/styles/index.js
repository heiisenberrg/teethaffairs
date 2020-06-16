import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	m5: {
		margin: 5
	},
	m10: {
		margin: 10
	},
	mv10: {
		marginVertical: 10
	},
	mv20: {
		marginVertical: 20
	},
	mv5: {
		marginVertical: 5
	},
	p10: {
		padding: 10
	},
	pb10: {
		paddingBottom: 10
	},
	flex: {
		flex: 1
	},
	upperCase: {
		textTransform: 'uppercase'
	},
	ph10: {
		paddingHorizontal: 10
	},
	mb20: {
		marginBottom: 20
	},
	flexGrow: {
		flexGrow: 1
	},
	ph20: {
		paddingHorizontal: 20
	},
	m15: { margin: 15 },
	pV3: { paddingVertical: 3 },
	scrollViewContainer: {
		backgroundColor: 'white',
		margin: 10,
		shadowColor: '#000000',
		shadowOpacity: 0.2,
		shadowRadius: 1,
		shadowOffset: {
			height: 1,
			width: 1
		},
		elevation: 2,
		borderRadius: 10
	},
	container: {
		width: 60,
		height: 60,
		borderRadius: 50,
		backgroundColor: '#959CAC'
	},
	content: {
		paddingHorizontal: 10,
		flex: 1,
		padding: 5
	},
	profileImage: {
		width: 20,
		height: 20
	},
	arrowContainer: {
		width: 20,
		height: 20,
		borderRadius: 20,
		shadowOpacity: 0.2,
		shadowOffset: {
			height: 1,
			width: 1
		},
		shadowRadius: 3,
		elevation: 2,
		borderColor: 'grey',
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 2,
		paddingTop: 2
	},
	textInputContainer: {
		borderWidth: 0.5,
		borderColor: 'grey',
		borderRadius: 5,
		minHeight: 70
	},
	buttonContainer: {
		borderRadius: 30,
		backgroundColor: '#0A8A7B',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 20
	},
	attachmentImage: {
		height: 60,
		width: 60,
		marginTop: 10,
		marginRight: 10
	},
	flexColumnContainer: {
		borderWidth: 0.5,
		borderColor: '#ccc',
		marginVertical: 10
	},
	flexColumn: {
		flex: 1,
		borderRightWidth: 0.5,
		borderColor: '#ccc',
		padding: 10
	},
	selectedDrugContainer: {
		flex: 1,
		paddingVertical: 20,
		paddingHorizontal: 10,
		maxHeight: 200
	},
	selectedDrugContent: {
		borderWidth: 0.5,
		borderColor: '#CAC7C7',
		elevation: 2,
		flex: 1,
		paddingVertical: 5,
		paddingHorizontal: 5,
		marginVertical: 5,
		marginRight: 5
	},
	dropdownContainer: {
		elevation: 2,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		borderColor: '#A1A1A1',
		maxHeight: 150
	},
	medicationContainer: {
		flex: 1.4
	},
	dropdownContent: {
		padding: 10
	},
	searchContainer: {
		borderRadius: 1,
		borderWidth: 0.5,
		width: 15,
		height: 15,
		marginRight: 10
	},
	followUpContainer: {
		borderRadius: 1,
		borderWidth: 0.5,
		width: 15,
		height: 15,
		marginRight: 10,
		marginTop: 5
	},
	searchContent: {
		borderWidth: 0.5,
		borderColor: 'grey',
		borderRadius: 5,
		minHeight: 25
	},
	modalContainer: {
		backgroundColor: '#000000aa',
		flex: 1,
		justifyContent: 'center'
	},
	modalContent: {
		marginHorizontal: 20,
		padding: 20,
		borderRadius: 10,
		backgroundColor: 'white'
	},
	crossButton: {
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	okButton: {
		width: '40%',
		backgroundColor: '#0A8A7B',
		alignSelf: 'center',
		paddingVertical: 10,
		marginTop: 15,
		marginBottom: 10
	},
	radioContainer: {
		width: 15,
		height: 15,
		borderWidth: 1,
		borderColor: '#767676',
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 10
	},
	radioGroup: {
		width: 10,
		height: 10,
		borderRadius: 10
	},
	width80: {
		width: '80%'
	},
	actionButtonContent: { alignSelf: 'center', width: '90%' },
	actionables: {
		padding: 10,
		borderBottomWidth: 0.5,
		borderColor: '#7C7C7C'
	},
	actionableText: {
		paddingLeft: 15,
		letterSpacing: 0.5
	},
	doctorResponseContainer: {
		marginVertical: 20,
		paddingVertical: 20,
		backgroundColor: '#EAEAEA'
	},
	doctorImage: { width: 80, height: 80 },
	avatarContainer: { paddingHorizontal: 20 },
	doctorNameContainer: { paddingLeft: 25, flex: 1 },
	backgroundVideo: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	},
	mediaPlayer: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		backgroundColor: 'black'
	},
	toolbar: {
		marginTop: 30,
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 5
	}
});

export default styles;
