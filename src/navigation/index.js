import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import MainStack from './MainStack';
import { setDeviceToken } from '../state/actions/user';
import { navigationRef } from './RootNavigation';

function MainNavigation(props) {
	return (
		<NavigationContainer ref={ navigationRef }>
			<MainStack isAuth={ props.isAuth } { ...props } />
		</NavigationContainer>
	);
}

const mapDispatchToProps = dispatch => ({
	setDeviceToken: token => dispatch(setDeviceToken(token))
});

export default connect(
	null,
	mapDispatchToProps
)(MainNavigation);
