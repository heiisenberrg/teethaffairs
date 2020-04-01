import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';

function DentalNoteForm() {
	return (
		<View style={ styles.container }>
			<View style={ styles.notesHeader }>
				<Image
					style={ styles.image }
					source={ require('../../../assets/profile.png') }
				/>
				<View style={ styles.description }>
					<Text style={ styles.notesHeaderTitle }>
						Pddjkjkd kdjk jndkj jkjkj. kdnkj djk jknk nkjkknkkkk jdjkm
					</Text>
					<View style={ styles.subHeader }>
						<Image
							style={ styles.subImage }
							source={ require('../../../assets/profile.png') }
						/>
						<Text style={ styles.date }>11 march 2020</Text>
					</View>
				</View>
			</View>
			<View>
				<Text>
					lkk knkjdkj dknkj cknkjsd ckjkjcks dkjkd kjjk kjdcksa alkaokeo ijoi.
					jidjiw jedij jdiew wiooqks sjmnwikjs wlkmlqma
				</Text>
			</View>
			<View>
				<Image
					style={ styles.image }
					source={ require('../../../assets/profile.png') }
				/>
			</View>
		</View>
	);
}

export default DentalNoteForm;
