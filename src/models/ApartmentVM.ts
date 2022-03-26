import firebase from 'firebase/compat/app';
import { format } from 'date-fns'


export enum Tag {
	PET_FRIENDLY = 'Pet-friendly',
	SMOKING_ALLOWED = 'Pušenje dozvoljeno',
	NEAR_STATION = 'Blizina stanice',
	PARKING_SLOT = 'Parking mjesto',
}

export enum PartOfTown {
	TRESNJEVKA = 'Trešnjevka',
	KNEZIJA = 'Knežija',
	DUBRAVA = 'Dubrava',
}

interface Coordinate {
	lat: number;
	lng: number;
}

interface ApartmentServiceModel {
	id: string;
	data: firebase.firestore.DocumentData;
}

class ApartmentVM {
	id: string;
	title: string;
	coordinates: Coordinate;
	partOfTown: PartOfTown;
	street: string;
	streetNumber: number;
	description?: string;
	images: string[];
	tags: Tag[];
	area: number;
	createdAt: string;
	price: number;
	// comments?: string[];
	contactNumber: string;
	roomCount: number;
	bathroomCount: number;
	availableFrom: string;

	constructor(serviceData :ApartmentServiceModel) {
		const { id, data } = serviceData;
		const {
			title,
			coordinates,
			partOfTown,
			street,
			streetNumber,
			description,
			images,
			tags,
			area,
			createdAt,
			price,
			contactNumber,
			roomCount,
			bathroomCount,
			availableFrom,
		} = data;
		this.id = id;
		this.title = title;
		this.coordinates = { lat: coordinates._lat, lng: coordinates._long };
		this.partOfTown = partOfTown;
		this.street = street;
		this.streetNumber = streetNumber;
		this.description = description;
		this.images = images;
		this.tags = tags as Tag[];
		this.area = area;
		this.createdAt = ApartmentVM.secondsToDateFormat(createdAt.seconds);
		this.price = price;
		this.contactNumber = contactNumber;
		this.roomCount = roomCount;
		this.bathroomCount = bathroomCount;
		this.availableFrom = ApartmentVM.secondsToDateFormat(availableFrom.seconds);
	}



	static apartmentConverter = {
		toFirestore(apartment: ApartmentVM): firebase.firestore.DocumentData {
			const { title } = apartment;
			return { title };
		  },
		  fromFirestore(
			snapshot: firebase.firestore.QueryDocumentSnapshot,
			options: firebase.firestore.SnapshotOptions
		  ): ApartmentVM {
			const data = snapshot.data(options);

			return new ApartmentVM({ id: snapshot.id, data });
		  }
	}

	static secondsToDateFormat = (seconds: number) => {
		const availableFromDate = new Date(1970, 0, 1);
    	availableFromDate.setSeconds(seconds);
		return format(availableFromDate, 'dd.M.yyyy.');
	}

}

export default ApartmentVM;