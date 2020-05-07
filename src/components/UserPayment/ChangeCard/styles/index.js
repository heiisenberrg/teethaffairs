import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: { 
		flex: 1
	},
	card: {
		marginHorizontal: 10,
		width: width - 20,
		justifyContent: 'space-between',
		height: 200
	},
	carouselContainer: { 
		height: 250, 
		marginTop: 30 
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
		borderWidth: 0.5,
		borderColor: '#D5D5D5',
		marginHorizontal: 10
	},
	buttonContainer: {
		borderRadius: 30,
		backgroundColor: '#0A8A7B',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 20,
		marginHorizontal: 20
	},
	mv10: {
		marginVertical: 10
	},
	m10: { margin: 10 },
	m15: { margin: 15 },
	upperCase: {
		textTransform: 'uppercase'
    },
    p15: {
        padding: 15
    },
    bw: { 
        borderBottomWidth: 0.5, 
        borderColor: '#D5D5D5' 
	},
	details: {
		margin: 10,
		width: '70%'
	}
});

export default styles;
