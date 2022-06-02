import axios, { AxiosRequestConfig } from 'axios';
import { getStorage, ref, uploadBytes, getDownloadURL, UploadMetadata, updateMetadata } from 'firebase/storage';


import { STANKO_API_PATH } from 'constants/ApiPath';
import { firestore } from '../firebase';
import { UserSubscription } from 'models/UserVM';
import UserVM from 'models/UserVM';
import ApartmentRM from 'models/ApartmentRM';
import firebase from 'firebase/compat/app';
import ApartmentVM from 'models/ApartmentVM';

export const setPushSubscription = async (userId: string | undefined, pushSubscription: PushSubscription) => {
	const url = `${STANKO_API_PATH}/user/${userId}/push-subscriptions`;
	const config: AxiosRequestConfig = {
		data: {
			userId,
			pushSubscription,
		},
	}
	return await axios.post(url, config);
}

export const unsubscribeUserForPushSubscription = async (userId: string, pushSubscription: PushSubscription) => {
	console.log(userId, pushSubscription);
	const usersRef = firestore.collection('users');
	await usersRef.doc(userId).update({
		pushSubscription: firebase.firestore.FieldValue.arrayRemove(JSON.parse(JSON.stringify(pushSubscription))),
	});
};

export const setUserSubscription = async (userId: string | undefined, userSubscription: UserSubscription) => {
	const usersRef = firestore.collection('users');
	return await usersRef.doc(userId).update({ userSubscription });
}

export const getUserSubscription = async (userId: string | undefined) => {
	const usersRef = firestore.collection('users');
	return await usersRef.doc(userId).withConverter(UserVM.userSubscriptionConverter).get();
}

export const upsertApartmentForUser = async(apartmentRM: ApartmentRM, images: File[] | string[]) => {
	const { createdById } = apartmentRM;

	const url = `${STANKO_API_PATH}/user/${createdById}/apartments`;

	const storage = getStorage();
	const urlImages: string[] = [];

	for (const imageFile of images) {
		if (imageFile instanceof File) {
			const imagesRef = ref(storage, imageFile.name);
			await uploadBytes(imagesRef, imageFile);
			// Create file metadata to update
			const metadata: UploadMetadata = {
				cacheControl: 'public,max-age=4000',
				contentType: imageFile.type,
			}
			await updateMetadata(imagesRef, metadata);
			const imageURL = await getDownloadURL(imagesRef);
			urlImages.push(imageURL);
		} else {
			urlImages.push(imageFile);
		}
	}

	apartmentRM.setImages(urlImages);

	const config: AxiosRequestConfig = {
		data: { apartmentRM },
	};
	return await axios.post(url, config);
}