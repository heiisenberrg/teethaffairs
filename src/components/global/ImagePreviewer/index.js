import React from 'react';
import {
	Image,
	Modal,
	View,
	Dimensions,
	TouchableOpacity,
	Text,
	StyleSheet
} from 'react-native';
import globalStyles from '../../../globalStyles';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#000000aa',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	closeButton: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 20,
		backgroundColor: 'transparent',
		borderColor: 'white',
		width: width / 2
	},
	buttonText: {
		color: 'white',
		fontSize: 16
	}
});

function ImagePreviewer(props) {
	const { uri, enablePreview, handlePreview } = props;

	return (
		<Modal transparent={ true } visible={ enablePreview }>
			<View style={ styles.container }>
				<Image
					source={ { uri: uri } }
					style={ {
						width: width / 1.1,
						height: height / 1.5
					} }
				/>
				<TouchableOpacity
					activeOpacity={ 0.8 }
					onPress={ handlePreview }
					style={ [ globalStyles.primaryButton, styles.closeButton ] }>
					<Text style={ styles.buttonText }>Close</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
}

export default ImagePreviewer;
