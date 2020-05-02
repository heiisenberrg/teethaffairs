/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';

function loader(props) {
  const { loading } = props;
	return (
		<Modal transparent={ true } visible={ loading }>
			<View
				style={ {
					backgroundColor: '#000000aa',
					flex: 1,
					justifyContent: 'center',
          alignItems: 'center'
				} }>
				<ActivityIndicator size='large' color="#00ff00" />
			</View>
		</Modal>
	);
}

export default loader;
