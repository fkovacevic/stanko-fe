import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { enableIndexedDbPersistence } from 'firebase/firestore';

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

export const firebaseAuth = firebase.auth();
const firestore = firebase.firestore();
enableIndexedDbPersistence(firestore).then(() => console.log('uspjepšno')).catch((reason) => console.log(reason));
export { firestore };