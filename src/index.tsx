import React from 'react';
import ReactDOM from 'react-dom';

import { AuthorizationContextProvider } from 'context';
import { register } from 'serviceWorkerRegistration';
import App from './App';

register();

ReactDOM.render(
	<React.StrictMode>
		<AuthorizationContextProvider>
			<App />
		</AuthorizationContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
