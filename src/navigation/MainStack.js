import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import OnBoardingStack from './OnBoardingStack';
import AppTabs from './AppTabs';

const Stack = createStackNavigator();

function MainStack() {
	return (
		<Stack.Navigator headerMode="none">
			<Stack.Screen name="OnBoarding" component={ OnBoardingStack } />
			<Stack.Screen name="AppTabs" component={ AppTabs } />
		</Stack.Navigator>
	);
}

export default MainStack;
