import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { enableIndexedDbPersistence, getDocs, getDocsFromCache } from "firebase/firestore";


import { firestore } from '../firebase';
import ApartmentVM from 'models/ApartmentVM';
import axios, { AxiosRequestConfig } from 'axios';
import { STANKO_API_PATH } from 'constants/ApiPath';

export const getApartmentsForUser = async (userId: string) => {
	const apartmentsRef = firestore.collection('apartments');
	return apartmentsRef.orderBy('createdAt').withConverter(ApartmentVM.apartmentConverter).where('createdById', '==', userId).get();
}

export const deleteApartment = async (apartment: ApartmentVM) => {
	const { id } = apartment;
	const config: AxiosRequestConfig = {
		data: { apartment },
	};

	const url = `${STANKO_API_PATH}/apartments/${id}`;

	return await axios.delete(url, config);
}

