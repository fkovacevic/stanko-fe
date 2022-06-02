import { Coordinate } from './ApartmentVM';

class ApartmentRM {
    id?: string;
    title: string; // rj
	coordinates: Coordinate;
	partOfTown: string; // rj
	street: string; // rj
	streetNumber: number; // rj
	description?: string; // rj
	tags?: string[]; // rj
	area: number; // rj
	createdAt: Date;
	price: number; // rj
	// comments?: string[];
	contactNumber: string; // rj
	roomCount: number; // rj
	bathroomCount: number; // rj
	availableFrom: Date; // rj
    createdByName: string;
    createdById: string;
    images: string[];

    constructor(
        title: string,
        coordinates: Coordinate,
        partOfTown: string,
        street: string,
        streetNumber: number,
        area: number,
        price: number,
        contactNumber: string,
        roomCount: number,
        bathroomCount: number,
        availableFrom: string,
        createdById: string,
        createdByName: string,
        id?: string,
        description?: string,
        tags?: string[],
    ) {
        this.title = title;
        this.coordinates = { lat: coordinates.lat, lng: coordinates.lng };
        this.partOfTown = partOfTown;
        this.street = street;
        this.streetNumber = streetNumber;
        this.area = area;
        this.createdAt = new Date();
        this.price = price;
        this.contactNumber = contactNumber;
        this.roomCount = roomCount;
        this.bathroomCount = bathroomCount;
        this.availableFrom = new Date(availableFrom);
        this.description = description;
        this.tags = tags;
        this.createdByName = createdByName;
        this.id = id;
        this.createdById = createdById;
        this.images = [];
    }

    setImages = (imagesURL: string[]) => {
        this.images = imagesURL;
    }
}

export default ApartmentRM;