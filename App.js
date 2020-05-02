/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';

import MainNavigation from './src/navigation';
import store from './src/state/store';
import Splash from './src/screens/Splash';
import FlashMessage from 'react-native-flash-message';
import localStorage from './src/state/localstorage';

// For Getting Network Requests in React Native Debugger.
global.XMLHttpRequest = global.originalXMLHttpRequest
	? global.originalXMLHttpRequest
	: global.XMLHttpRequest;
global.FormData = global.originalFormData
	? global.originalFormData
	: global.FormData;

fetch; // Ensure to get the lazy property

if (window.__FETCH_SUPPORT__) {
	// it's RNDebugger only to have
	window.__FETCH_SUPPORT__.blob = false;
} else {
	/*
	 * Set __FETCH_SUPPORT__ to false is just work for `fetch`.
	 * If you're using another way you can just use the native Blob and remove the `else` statement
	 */
	global.Blob = global.originalBlob ? global.originalBlob : global.Blob;
	global.FileReader = global.originalFileReader
		? global.originalFileReader
		: global.FileReader;
}

function App() {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ isAuth, setIsAuth ] = useState(false);
	const [ user, setUser ] = useState({});

	useEffect(() => {
		const checkAuth = async () => {
			const accessToken = await localStorage.getStringItem('accessToken');
			const user = await localStorage.getItem('user');
			if (accessToken) {
				setIsAuth(true);
			}
			if (user && Object.keys(user).length > 0) {
				setUser(user);
			}
		};
		checkAuth();
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, []);

	if (isLoading) {
		return <Splash />;
	}
	return (
		<Provider store={ store }>
			<MainNavigation isAuth={ isAuth } user={ user }/>
			<FlashMessage position="top" style={ { borderBottomLeftRadius: 20, borderBottomRightRadius: 20, zIndex: 1001 } } />
		</Provider>
	);
}

export default App;
