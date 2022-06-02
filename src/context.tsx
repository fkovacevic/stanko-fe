import { createContext, useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import { firebaseAuth } from './firebase'

interface AuthorizationContextType {
	user: firebase.User | null,
	isLoading: boolean,
}

const AuthorizationContext = createContext<AuthorizationContextType>({
	user: null,
	isLoading: false,
});

export const AuthorizationContextProvider = (props: any) => {
	const [user, setUser] = useState<firebase.User | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		setIsLoading(true);
		firebaseAuth.onAuthStateChanged((user) => {
			setUser(user);
			setIsLoading(false);
		});
	}, [])

	const authContextValue: AuthorizationContextType = {
		user,
		isLoading,
	};

	return <AuthorizationContext.Provider value={authContextValue}>
		{props.children}
	</AuthorizationContext.Provider>
};

export default AuthorizationContext;


