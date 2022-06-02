import { useState, useEffect, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import firebase from 'firebase/compat';

import { firebaseAuth } from '../../firebase';
import AuthorizationContext from '../../context';

interface Props {
	children: JSX.Element;
	// user: firebase.User | null;
}


const RequireAuth = (props: Props) => {
	const { children } = props;
	const { user, isLoading } = useContext(AuthorizationContext);
	let location = useLocation();

	if (!user && !isLoading) {
		console.log(user, isLoading)
		// Redirect them to the /prijava page, but save the current location they were
		// trying to go to when they were redirected.
		return <Navigate to="/prijava" state={{ from: location }} replace />;
	}

	return children;
}

export default RequireAuth;