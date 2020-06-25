import React, { useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import Stripe from 'tipsi-stripe';
import Config from 'react-native-config';
import View from '../../../components/global/View';
import Text from '../../../components/global/Text';
import styles from './styles';
import Loader from '../../global/Loader';

import { getCards, createCard } from '../../../state/actions/payment';

Stripe.setOptions({
	publishableKey: Config.STRIPE_PUBLISHABLE_KEY
});

const cardBrands = {
	visa: '#1FE9A7',
	mastercard: '#119989',
	default: '#0BE3DF'
};

function PaymentList(props) {
	const { cards, getCards, createCard, loading, navigation } = props;

	const [ , setCardToken ] = useState('');

	useEffect(() => {
		getCards();
	}, []);

	const onSuccess = () => {
		getCards();
		if (props.route.params !== undefined) {
			if (props.route.params.from === 'remote') {
				navigation.goBack();
			}
		}
	};

	const addCardDetails = async () => {
		try {
			const options = {
				requiredBillingAddressFields: 'full',
				prefilledInformation: {
					billingAddress: {
						name: '',
						line1: '',
						line2: '',
						city: '',
						state: '',
						country: '',
						postalCode: ''
					}
				}
			};
			const token = await Stripe.paymentRequestWithCardForm(options);

			setCardToken(token.tokenId);
			createCard({ data: { card_token: token.tokenId }, onSuccess });
		} catch (e) {}
	};

	const renderItem = ({ item, index }) => {
		return (
			<TouchableOpacity
				key={ `carditem-${index}` }
				activeOpacity={ 1 }
				style={ {
					...styles.cardContainer,
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
					<View style={ styles.mr10 }>
						<Text c={ 'white' } s={ 14 } style={ styles.upperCase }>
							Cardholder name
						</Text>
						<Text c={ 'white' } s={ 18 } w={ '500' } style={ styles.mv10 }>
							{item.name}
						</Text>
					</View>
					<View style={ styles.expire }>
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

	return (
		<View style={ styles.container }>
			<Loader loading={ loading } />
			<FlatList
				data={ cards }
				keyExtractor={ item => item.id }
				extraData={ cards }
				renderItem={ renderItem }
				ListEmptyComponent={ () => (
					<View center style={ styles.mt100 }>
						<Text>No payment cards</Text>
					</View>
				) }
				showsVerticalScrollIndicator={ false }
			/>
			<TouchableOpacity
				style={ styles.fabButton }
				activeOpacity={ 0.8 }
				onPress={ addCardDetails }>
				<Image
					style={ styles.fabIcon }
					source={ require('../../../assets/round-plus.png') }
				/>
			</TouchableOpacity>
		</View>
	);
}

function mapStateToProps(state) {
	return {
		cards: state.payment.cards,
		loading: state.payment.loading,
		createCardSuccess: state.payment.createCardSuccess
	};
}

export default connect(
	mapStateToProps,
	{ getCards, createCard }
)(PaymentList);
