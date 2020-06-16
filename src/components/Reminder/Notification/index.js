import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, Modal, Image } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import Icon from '../../global/Icon';
import View from '../../global/View';
import { getReminder, updateReminder } from '../../../state/actions/reminder';
import moment from 'moment';

const editContent = [
	{ icon: 'check', content: 'I already brushed and flossed' },
	{ icon: 'pause', content: 'Remind me after 30 minutes again' },
	{ icon: 'exclamation', content: 'Brushed but not flossed' },
	{
		icon: 'exclamation',
		content: 'Unable to brush and floss today. Don\'t remind me again'
	}
];

function ReminderNotification(props) {
  const { route, navigation, getReminder, reminder } = props;
  const [ selectedContent, setSelectedContent ] = useState('');
  
  useEffect(() => {
    getReminder({ id: route.id });
  }, [ route ]);

  useEffect(() => {
    if (selectedContent !== '') {
      updateReminder();
    }
  }, [ selectedContent ]);

	return (
		<View style={ styles.container }>
      <View center style={ styles.mv25 }>
      <Text style={ styles.titleText }>Brushing and Flossing Reminder</Text>
      </View>
			<Modal transparent={ true } visible={ true }>
				<View style={ styles.modalContainer }>
					<View style={ styles.modalContent }>
						<TouchableOpacity
							style={ styles.crossButton }
							onPress={ () => navigation.replace('AppTabs') }>
							<Icon
								type={ 'MaterialCommunityIcons' }
								name={ 'close' }
								color={ '#767676' }
								size={ 22 }
							/>
						</TouchableOpacity>
						<View row style={ styles.profileContainer }>
							<View jC={ 'flex-start' }>
								<Image
									style={ styles.profileImage }
									source={ require('../../../assets/profile.png') }
								/>
							</View>
							<View
								row
								center
								jC={ 'space-between' }
								style={ styles.titleContainer }>
								<View>
                  <Text style={ styles.expandedTitle }>{reminder?.reminder_text}</Text>
									{/* <Text style={ styles.expandedSubTitle }>You and 4 others</Text> */}
								</View>
								<View row center>
									<View center style={ styles.timeContainer }>
										<Text style={ styles.mediumText }>{moment(reminder.reminder_time, 'HHmm').format('LT')}</Text>
									</View>
								</View>
							</View>
						</View>
						<View style={ styles.profileContent } />
						<View row center style={ styles.proImage }>
							<Image
								style={ styles.profileImage }
								source={ require('../../../assets/happy-face.png') }
							/>
							<View style={ styles.proText }>
								<Text>You have completed your task today!</Text>
							</View>
						</View>
						<View style={ styles.editContent }>
							{editContent &&
								editContent.map((item, index) => {
									return (
										<View row key={ `modal-${index}` } style={ styles.modContent }>
											<View
												row
												center
												style={ {
													...styles.modStatus,
													...{
														backgroundColor:
															item.icon === 'check'
																? '#00C57D'
																: item.icon === 'exclamation'
																? '#FA5050'
																: '#858585',
														borderColor:
															item.icon === 'check'
																? '#00C57D'
																: item.icon === 'exclamation'
																? '#FA5050'
																: '#858585'
													}
												} }>
												<View style={ styles.statusContent }>
													<Icon
														type={ 'MaterialCommunityIcons' }
														name={ item.icon }
														color={ 'white' }
														size={ 14 }
													/>
												</View>
											</View>
											<TouchableOpacity
												style={ styles.radioContainer }
												onPress={ () =>
													setSelectedContent(
														selectedContent === index ? '' : index
													)
												}>
												<View
													style={ {
														...styles.radioGroup,
														...{
															backgroundColor:
																selectedContent === index ? '#33D197' : 'white'
														}
													} }
												/>
											</TouchableOpacity>
											<View style={ styles.width80 }>
												<Text>{item.content}</Text>
											</View>
										</View>
									);
								})}
						</View>
            <TouchableOpacity style={ styles.buttonContainer } onPress={ () => navigation.replace('AppTabs') }>
              <Text style={ styles.buttonText }>Home</Text>
            </TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
}

const mapStateToProps = state => {
	return {
    reminder: state.reminder.reminder
  };
};

export default connect(
	mapStateToProps,
	{
    getReminder,
    updateReminder
  }
)(ReminderNotification);
