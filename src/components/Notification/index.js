import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	FlatList,
	SafeAreaView,
	TouchableOpacity
} from 'react-native';
import Icon from '../global/Icon';
import { getNotifications } from '../../state/actions/user';
import styles from './styles';

function Notification(props) {
	const { getNotifications, notifications } = props;

	const [ list, setList ] = useState(notifications);

	useEffect(() => {
		getNotifications();
	}, []);

	useEffect(() => {
		if (notifications && notifications.length > 0) {
			setList(notifications);
		}
	}, [ notifications ]);

	const _renderNotificationCards = item => {
		const notification = JSON.parse(
			item?.notification_info.replace(/'/g, '"').toString()
		);
		return (
			<View style={ styles.card }>
				<View style={ styles.noteTitle }>
					<Text style={ styles.title }>{notification.title}</Text>
					<TouchableOpacity style={ styles.iconWrapper }>
						<Icon type={ 'Entypo' } color="#959CAC" name={ 'cross' } size={ 18 } />
					</TouchableOpacity>
				</View>
				<View style={ styles.descriptionContainer }>
					<Text style={ styles.description }>{notification.desc}</Text>
				</View>
			</View>
		);
	};

	return (
		<View style={ styles.container }>
			<SafeAreaView style={ styles.cardContainer }>
				{list && list.length !== 0 && (
					<FlatList
						data={ list }
						renderItem={ ({ item }) => _renderNotificationCards(item) }
						keyExtractor={ item => item.id }
						showsVerticalScrollIndicator={ false }
					/>
				)}
			</SafeAreaView>
		</View>
	);
}

const mapStateToProps = state => {
	return {
		notifications: state.user.notifications
	};
};

export default connect(
	mapStateToProps,
	{
		getNotifications
	}
)(Notification);
