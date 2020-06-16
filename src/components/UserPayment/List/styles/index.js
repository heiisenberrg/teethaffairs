import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginHorizontal: 10
  },
	cardContainer: {
		padding: 10,
		marginVertical: 10,
		borderRadius: 10,
		shadowOpacity: 0.2,
		shadowOffset: {
			height: 1,
			width: 1
		},
		shadowRadius: 3,
		elevation: 2,
		borderColor: 'grey'
	},
	m10: {
		margin: 10
	},
	m15: {
		margin: 15
	},
	mr10: {
		marginRight: 10
	},
	mt100: {
		marginTop: 100
	},
	details: {
		margin: 10,
		width: '70%'
	},
	mv10: {
		marginVertical: 10
	},
	upperCase: {
		textTransform: 'uppercase'
	},
	fabButton: {
		position: 'absolute',
		backgroundColor: '#00C57D',
		width: 50,
		height: 50,
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
		...Platform.select({
			ios: {
				bottom: 10
			},
			android: {
				bottom: 25
			}
		}),
		right: 0,
		shadowColor: '#000000',
		shadowOpacity: 0.8,
		shadowRadius: 1,
		shadowOffset: {
			height: 1,
			width: 0
		},
		elevation: 2,
		zIndex: 101
	},
	fabIcon: {
		width: 35,
		height: 35
	},
	expire: {
		position: 'relative',
		left: 10
	}
});

export default styles;
