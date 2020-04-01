import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';

import MainNavigation from './src/navigation';
import store from './src/state/store';
import Splash from './src/screens/Splash';

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

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, []);

	if (isLoading) {
		return <Splash />;
	}
	return (
		<Provider store={ store }>
			<MainNavigation />
		</Provider>
	);
}

export default App;
