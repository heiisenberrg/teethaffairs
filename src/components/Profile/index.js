import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';

function Profile(props) {
	const { navigation } = props;

	return (
		// <View style={styles.dashboardWrapper}>
		<View style={ styles.imageStyle }>
			<View style={ styles.imageContainer }>
				<View style={ styles.imageWrap1 }>
					<View style={ styles.contentWrap }>
						<Image
							source={ require('../../assets/group.png') }
							style={ styles.iconStyle }
							onPress={ () => navigation.navigate('AddMembers') }
						/>

						<Text
							style={ styles.imageContent }
							onPress={ () => navigation.navigate('AddMembers') }>
							members
						</Text>
					</View>
				</View>
				<View style={ styles.imageWrap2 }>
					<View style={ styles.contentWrap }>
						<Image
							source={ require('../../assets/alarm.png') }
							style={ styles.iconStyle }
						/>
						<Text style={ styles.imageContent }>reminders</Text>
					</View>
				</View>
				<View style={ styles.imageWrap3 }>
					<View style={ styles.contentWrap }>
						<Image
							source={ require('../../assets/note.png') }
							style={ styles.iconStyle }
						/>
						<Text style={ styles.imageContent }>notes</Text>
					</View>
				</View>
			</View>

			{/* </View> */}
			{/* <View style={styles.primaryUserWrapper}>
				<View style={styles.nameBlock}>
					<Text	
						onPress={() => navigation.navigate('AddMembers')}
						style={styles.nameText}>
						John Doe (5)
					</Text>
					<Text
						onPress={() => navigation.navigate('AddMembers')}
						style={styles.subNameText}>
						Primary
					</Text>
				</View>

				<Button title="add" onPress={() => navigation.navigate('AddMembers')} />
			</View> */}
		</View>
	);
}

export default Profile;
