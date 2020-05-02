import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './MainStack';
import store from '../state/store';
import { getLoginSuccess } from '../state/actions/user';


function MainNavigation(props) {
	const { user } = props;
	if (user && Object.keys(user).length > 0) {
       store.dispatch(getLoginSuccess(user));
	}
	return (
		<NavigationContainer>
			<MainStack isAuth={ props.isAuth } />
		</NavigationContainer>
	);
}

export default MainNavigation;
