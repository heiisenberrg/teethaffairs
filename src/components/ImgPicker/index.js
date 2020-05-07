import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';

import ImagePicker from 'react-native-image-picker';

import styles from './styles';

const options = {
	title: 'Select Avatar',
	storageOptions: {
		skipBackup: true,
		path: 'images'
	}
};

function ImgPicker(props) {
	const [ imageSource, setImageSource ] = useState('');

	const takeImageHandler = () => {
		ImagePicker.showImagePicker(options, response => {
			if (response.didCancel) {
			} else if (response.error) {
			} else if (response.customButton) {
			} else {
				const source = { uri: response.uri };
				props.value = source;
				setImageSource(source);
			}
		});
	};
	return (
		<View style={ styles.container }>
			<Text style={ styles.addFiles }>Add Files</Text>
			<View style={ styles.imageContainer }>
				<View style={ styles.imagePreview1 }>
					{imageSource ? (
						<Image source={ imageSource } style={ styles.image } />
					) : (
						<Text>No Image Picked Yet</Text>
					)}
				</View>
				<View style={ styles.imagePreview1 }>
					<Text onPress={ takeImageHandler }>+</Text>
				</View>
			</View>
		</View>
	);
}

export default ImgPicker;
