import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1DCB86' },
  mv25: { marginVertical: 25 },
	modalContainer: {
		backgroundColor: '#000000aa',
		flex: 1,
		justifyContent: 'center'
  },
  titleText: { fontSize: 24, color: 'white', textAlign: 'center' },
  profileImage: {
		width: 45,
		height: 45
  },
  titleContainer: {
		marginHorizontal: 10,
		width: '82%'
  },
  expandedTitle: {
		fontSize: 14
  },
  expandedSubTitle: {
		fontSize: 12,
		color: '#363636'
  },
  timeContainer: {
		width: 60,
		padding: 3,
		borderRadius: 15,
		backgroundColor: '#00C57D',
		marginLeft: 10
  },
  mediumText: {
		fontSize: 12
  },
  modContent: { 
		alignItems: 'center', 
		marginVertical: 10 
	},
	modStatus: {
		borderRadius: 10,
		width: 17,
		height: 17,
		borderWidth: 0.5,
		marginRight: 10
	},
	modalWrap: {
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
	profileContainer: {
		paddingTop: 0,
		top: 0
	},
	profileContent: {
		borderWidth: 0.3,
		borderColor: '#767676',
		opacity: 0.6,
		marginVertical: 10
	},
	proImage: {
		padding: 10,
		paddingTop: 0
	},
	proText: {
		width: '50%',
		marginHorizontal: 10
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
	editContent: {
		padding: 10
  },
  buttonContainer: {
		marginVertical: 10,
		width: '50%',
		borderRadius: 30,
		backgroundColor: '#0A8A7B',
		justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
		paddingVertical: 10
	},
	buttonText: {
		color: 'white',
		textTransform: 'uppercase',
		fontWeight: 'bold',
		fontSize: 16
	}
});

export default styles;
