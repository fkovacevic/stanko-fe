import { createContext, useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import { firebaseAuth } from './firebase'

interface AuthorizationContextType {
	user: firebase.User | null,
}

const AuthorizationContext = createContext<AuthorizationContextType>({
	user: null,
});

export const AuthorizationContextProvider = (props: any) => {
	const [user, setUser] = useState<firebase.User | null>(null);
	useEffect(() => {
		firebaseAuth.onAuthStateChanged((user) => {
			setUser(user);
		});
	}, [])

	const authContextValue: AuthorizationContextType = {
		user,
	};

	return <AuthorizationContext.Provider value={authContextValue}>
		{props.children}
	</AuthorizationContext.Provider>
};

export default AuthorizationContext;


