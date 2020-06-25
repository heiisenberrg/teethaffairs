import React from 'react';
import {
	Modal,
	View,
	Dimensions,
	TouchableOpacity,
	Text,
	StyleSheet,
	ActivityIndicator
} from 'react-native';
import globalStyles from '../../../globalStyles';
import Video from 'react-native-video';

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

function VideoPreviewer(props) {
	const { uri, enablePreview, handlePreview } = props;

	return (
		<Modal transparent={ true } visible={ enablePreview }>
			<View style={ styles.container }>
				<Video
					source={ {
						uri: uri
					} }
					ref={ ref => {
						this.player = ref;
					} }
					paused={ true }
					onBuffer={ () => <ActivityIndicator /> }
					controls={ true }
					repeat={ false }
					playWhenInactive={ false }
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

export default VideoPreviewer;
