import axios from "axios";
import { firebaseAuth, firestore } from '../firebase';
import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import ApartmentVM from 'models/ApartmentVM';

export const getApartments = async() => {
	const apartmentsRef = firestore.collection('apartments');
	return apartmentsRef.orderBy('title').limit(5).withConverter(ApartmentVM.apartmentConverter).get();
}