import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import OnBoardingStack from './OnBoardingStack';
import AppTabs from './AppTabs';
import ReminderNotification from '../screens/Reminder/Notification';

const Stack = createStackNavigator();

function MainStack(props) {
	const { isAuth } = props;
	return (
		<Stack.Navigator
			screenOptions={ () => ({
				gestureEnabled: false
			}) }		
			headerMode="none"
		>
			{
				isAuth ?
				<>
					<Stack.Screen name="AppTabs" component={ AppTabs } 
						options={ {
							gestureEnabled: false
						} }
					/>
					<Stack.Screen name="OnBoarding" component={ OnBoardingStack } />
					<Stack.Screen name="ReminderNotification" component={ ReminderNotification } />
				</>
				:
				<>
					<Stack.Screen name="OnBoarding" component={ OnBoardingStack } />
					<Stack.Screen name="AppTabs" component={ AppTabs } />
					<Stack.Screen name="ReminderNotification" component={ ReminderNotification } />
				</>
			}
		</Stack.Navigator>
	);
}

export default MainStack;
