import firebase from 'firebase/compat/app';

export interface ApartmentServiceModel {
	id: string;
	data: firebase.firestore.DocumentData;
}
