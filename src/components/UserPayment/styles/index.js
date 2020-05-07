import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		width,
		height,
		flex: 1,
		backgroundColor: 'green'
	}
});

export default styles;