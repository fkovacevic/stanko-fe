
import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import AuthorizationContext from './context';

import RequireAuth from 'common/hocs/RequireAuth';
import './app.scss';

import { collection, getFirestore } from '@firebase/firestore'

import Apartments from './pages/Apartments/index';
import Notifications from './pages/Notifications/index';

import NavigationBar from 'common/components/NavigationBar';


// import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Login from 'pages/Login';
import { firebaseAuth } from './firebase';
import Homepage from 'pages/Homepage';


require('firebase/auth');





firebase.initializeApp({
	apiKey: "AIzaSyC6eAX2gJosjg8fQ0DDuZoQUymFj_OpAis",
	authDomain: "home-net-599d5.firebaseapp.com",
	projectId: "home-net-599d5",
	storageBucket: "home-net-599d5.appspot.com",
	messagingSenderId: "618113681928",
	appId: "1:618113681928:web:e4c80179321cbcffdc5fbd",
	measurementId: "G-4C1M60GN5S",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

interface Apartment {
	id: string;
	title: string;
}

const apartmentConverter = {
	toFirestore(apartment: Apartment): firebase.firestore.DocumentData {
		const { title } = apartment;
		return { title };
	  },
	  fromFirestore(
		snapshot: firebase.firestore.QueryDocumentSnapshot,
		options: firebase.firestore.SnapshotOptions
	  ): Apartment {
		const data = snapshot.data(options);
		const { id, title } = data;
		return { id, title }
	  }
}

function App() {
	// const signInWithGoogle = () => {
	// 	const provider = new firebase.auth.GoogleAuthProvider();
	// 	auth.signInWithPopup(provider).then((user) => console.log(user.user?.displayName));
	// }
	// const apartmentsRef = firestore.collection('apartments');
	// const query = apartmentsRef.orderBy('title').limit(5).withConverter(apartmentConverter);
	// const [apartments, isLoading, error] = useCollection(collection(firestore, 'apartments'));
	// console.log(apartments?.docs.forEach((value) => console.log(value.data())));
	const { user } = useContext(AuthorizationContext);

	return (
		<BrowserRouter>
				{user && <NavigationBar />}
			<Routes>
				<Route path='/' element={<Homepage />}/>
				<Route path='/stanovi' element={
					<RequireAuth>
						<Apartments />
					</RequireAuth>
				}/>
				<Route path='/obavijesti' element={
					<RequireAuth>
						<Notifications />
					</RequireAuth>
				} />
				<Route path='/prijava' element={<Login />} />
			</Routes>
		</BrowserRouter>

	);
}

export default App;
