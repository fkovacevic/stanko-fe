import axios from "axios";
import { firebaseAuth, firestore } from '../firebase';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import ApartmentVM from 'models/ApartmentVM';

require('firebase/auth');


export const getApartments = async() => {
	const apartmentsRef = firestore.collection('apartments');
	await apartmentsRef.orderBy('title').limit(5).withConverter(ApartmentVM.apartmentConverter).get().then((snap) => snap.docs.forEach((value) => console.log(value.data())));
}