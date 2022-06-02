import firebase from 'firebase/compat/app';
import { format } from 'date-fns'
import { ApartmentServiceModel } from './ApartmentServiceModel';


export const Tag: Record<string, string> = {
	PET_FRIENDLY: 'Pet-friendly',
	SMOKING_ALLOWED: 'Pušenje dozvoljeno',
	NEAR_STATION: 'Blizina stanice',
	PARKING_SLOT: 'Parking mjesto',
}

export const tags = Object.keys(Tag).map((key) => Tag[key]);

export const PartOfTown: Record<string, string> = {
	TRESNJEVKA:'Trešnjevka',
	KNEZIJA: 'Knežija',
	DUBRAVA: 'Dubrava',
}

export const partsOfTown = Object.keys(PartOfTown).map((key) => PartOfTown[key]);

export interface Coordinate {
	lat: number;
	lng: number;
}

class ApartmentVM {
	id: string;
	title: string; // rj
	coordinates: Coordinate;
	partOfTown: string; // rj
	street: string; // rj
	streetNumber: number; // rj
	description?: string; // rj
	images: string[];
	tags?: string[]; // rj
	area: number; // rj
	createdAt: string;
	price: number; // rj
	// comments?: string[];
	contactNumber: string; // rj
	roomCount: number; // rj
	bathroomCount: number; // rj
	availableFrom: string; // rj
	createdBy: string;

	constructor(serviceData: ApartmentServiceModel) {
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
			createdBy,
		} = data;
		this.id = id;
		this.title = title;
		this.coordinates = coordinates;
		this.partOfTown = partOfTown as string;
		this.street = street;
		this.streetNumber = streetNumber;
		this.description = description;
		this.images = images;
		this.tags = tags;
		this.area = area;
		this.createdAt = format(new Date(createdAt), 'yyyy-MM-dd');
		this.price = price;
		this.contactNumber = contactNumber;
		this.roomCount = roomCount;
		this.bathroomCount = bathroomCount;
		this.availableFrom = format(new Date(availableFrom), 'yyyy-MM-dd');
		this.createdBy = createdBy;
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