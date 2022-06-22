
import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import AuthorizationContext from './context';
import CircularProgress from '@mui/material/CircularProgress';


import RequireAuth from 'common/hocs/RequireAuth';
import './app.scss';

import { collection, getFirestore, Query } from '@firebase/firestore'

import Apartments from './pages/Apartments/index';
import Notifications from './pages/Notifications/index';
import Homepage from './pages/Homepage';
import MyApartments from './pages/UserApartments';

import NavigationBar from 'common/components/NavigationBar';


// import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Login from 'pages/Login';
import { firebaseAuth } from './firebase';
import Register from 'pages/Register';


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
	const { isLoading } = useContext(AuthorizationContext);

	return (
		isLoading
		? <div className='app-loading'>
			<CircularProgress />
		</div>
		: <BrowserRouter>
			<NavigationBar />
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
				<Route path='/oglasi' element={
					<RequireAuth>
						<MyApartments />
					</RequireAuth>
				} />
				<Route path='/registracija' element={<Register />} />
				<Route path='*' element={<Login />} />
			</Routes>
		</BrowserRouter>

	);
}

export default App;
