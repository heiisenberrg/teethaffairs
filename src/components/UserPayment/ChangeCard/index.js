import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Dimensions, FlatList } from 'react-native';
import styles from './styles';
import View from '../../global/View';
import Text from '../../global/Text';
import { connect } from 'react-redux';
import { getCards, upgradeApp } from '../../../state/actions/payment';
import { ScrollView } from 'react-native-gesture-handler';

const cardBrands = {
	visa: '#1FE9A7',
	mastercard: '#119989',
	default: '#0BE3DF'
};

function changeCard(props) {
	const { route, navigation, cards, getCards, upgradeApp, user } = props;
	const [ selectedCardId, setSelectedCardId ] = useState(0);
	const [ amount ] = useState(10);
	const { source } = route.params;

	useEffect(() => {
		getCards();
	}, []);
	const { width } = Dimensions.get('window');

	const renderItem = ({ item, index }) => {
		return (
			<TouchableOpacity
				key={ `carditem-${index}` }
				onPress={ () => navigation.navigate('ChangeCard') }
				style={ {
					...styles.cardContainer,
					...styles.card,
					...{
						backgroundColor: cardBrands[
							item.brand !== '' ? item.brand.toLowerCase() : 'default'
						]
							? cardBrands[
									item.brand !== '' ? item.brand.toLowerCase() : 'default'
							]
							: cardBrands.default
					}
				} }>
				<View row jC={ 'flex-end' } style={ styles.m10 }>
					<Text c={ 'white' } w={ 'bold' } s={ 16 }>
						{item.brand}
					</Text>
				</View>
				<View row jC={ 'flex-start' } style={ styles.m15 }>
					<Text c={ 'white' } s={ 40 } w={ 'bold' }>
						.... .... ....{' '}
					</Text>
					<Text c={ 'white' } s={ 20 } w={ 'bold' }>
						{item.last4}
					</Text>
				</View>
				<View row jC={ 'space-between' } style={ styles.details }>
					<View>
						<Text c={ 'white' } s={ 14 } style={ styles.upperCase }>
							Cardholder name
						</Text>
						<Text c={ 'white' } s={ 18 } w={ '500' } style={ styles.mv10 }>
							{item.name}
						</Text>
					</View>
					<View>
						<Text c={ 'white' } s={ 14 } style={ styles.upperCase }>
							Expiry date
						</Text>
						<Text c={ 'white' } s={ 18 } w={ '500' } style={ styles.mv10 }>
							{item.exp_month} / {item.exp_year}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	const onViewRef = React.useRef(({ viewableItems }) => {
		setSelectedCardId(viewableItems[0].item.id);
	});
	const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

	const onSuccess = () => {
		navigation.navigate('AppTabs', {
			screen: user && user.user_type === 'DOCTOR' ? 'Teledental' : 'Home'
		});
	};

	const pay = () => {
		upgradeApp({
			data: { card_id: selectedCardId, payment_description: 'payment' },
			onSuccess
		});
	};

	return (
		<View style={ styles.container }>
			<ScrollView>
				{cards && cards.length > 0 && (
					<View style={ styles.carouselContainer }>
						<FlatList
							data={ cards }
							decelerationRate="fast"
							horizontal={ true }
							pagingEnabled={ false }
							showsHorizontalScrollIndicator={ false }
							snapToInterval={ width }
							snapToAlignment="center"
							contentContainerStyle={ styles.scrollContainer }
							onViewableItemsChanged={ onViewRef.current }
							viewabilityConfig={ viewConfigRef.current }
							keyExtractor={ item => item.id }
							renderItem={ renderItem }
						/>
					</View>
				)}
				<View style={ styles.cardContainer }>
					<View row style={ styles.bw }>
						<Text s={ 16 } c={ '#363636' } style={ styles.p15 }>
							Payment Details
						</Text>
					</View>
					<View row jC={ 'space-between' }>
						<Text s={ 16 } c={ '#363636' } style={ styles.p15 }>
							{source !== 'settings' ? 'Remote Consultation' : 'Upgrade Plan'}
						</Text>
						<Text s={ 16 } c={ '#363636' } style={ styles.p15 }>
							$ {amount}.00
						</Text>
					</View>
					<View row jC={ 'space-between' }>
						<Text s={ 16 } c={ '#363636' } style={ styles.p15 }>
							Tax & Fees
						</Text>
						<Text s={ 16 } c={ '#363636' } style={ styles.p15 }>
							$ 0.00
						</Text>
					</View>
					<View style={ { ...styles.mv10, ...styles.bw } } />
					<View row jC={ 'space-between' }>
						<Text s={ 16 } c={ '#363636' } style={ styles.p15 }>
							Amount Payable
						</Text>
						<Text s={ 22 } c={ '#363636' } style={ styles.p15 }>
							$ {amount}.00
						</Text>
					</View>
				</View>
				<TouchableOpacity
					style={ [ styles.buttonContainer, styles.mv10 ] }
					onPress={ () => pay() }>
					<Text s={ 16 } lh={ 16 } w={ 'bold' } c={ 'white' } style={ styles.upperCase }>
						Pay now
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
}

function mapStateToProps(state) {
	return {
		cards: state.payment.cards,
		loading: state.payment.loading,
		user: state.user.user
	};
}

export default connect(
	mapStateToProps,
	{ getCards, upgradeApp }
)(changeCard);
