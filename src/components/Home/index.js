import React from 'react';
import { View, Button } from 'react-native';

import styles from './styles';

function Home() {
	return (
		<View style={ styles.container }>
			<View>
				<View style={ styles.buttonWrap }>
					<Button title="next" />
				</View>
			</View>
		</View>
	);
}

export default Home;
