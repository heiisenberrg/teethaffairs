import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';

import MainStack from './MainStack';
import store from '../state/store';
import { getLoginSuccess, setDeviceToken } from '../state/actions/user';
import messaging from '@react-native-firebase/messaging';

function MainNavigation(props) {
	const { user, setDeviceToken } = props;
	if (user && Object.keys(user).length > 0) {
       store.dispatch(getLoginSuccess(user));
	}

	useEffect(() => {
        messaging()
            .getToken()
            .then(token => {
                setDeviceToken(token);
            });
        // Listen to whether the token changes
        return messaging().onTokenRefresh(token => {
            console.log('tokeeeeeeeenn', token);
        });
	}, []);
	
	return (
		<NavigationContainer>
			<MainStack isAuth={ props.isAuth } />
		</NavigationContainer>
	);
}

const mapDispatchToProps = dispatch => ({
	setDeviceToken: (token) => dispatch(setDeviceToken(token))
});

export default connect(null, mapDispatchToProps)(MainNavigation);
