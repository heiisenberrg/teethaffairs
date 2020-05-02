import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import OnBoardingStack from './OnBoardingStack';
import AppTabs from './AppTabs';


const Stack = createStackNavigator();

function MainStack(props) {
	const { isAuth } = props;
	return (
		<Stack.Navigator headerMode="none">
			{
				isAuth ?
				<>
					<Stack.Screen name="AppTabs" component={ AppTabs } />
					<Stack.Screen name="OnBoarding" component={ OnBoardingStack } />
				</>
				:
				<>
					<Stack.Screen name="OnBoarding" component={ OnBoardingStack } />
					<Stack.Screen name="AppTabs" component={ AppTabs } />
				</>
			}
		</Stack.Navigator>
	);
}

export default MainStack;
