enum Tag {
	PET_FRIENDLY = 'Pet-friendly',
	SMOKING_ALLOWED = 'Pušenje dozvoljeno',
	NEAR_STATION = 'Blizina stanice',
	PARKING_SLOT = 'Parking mjesto',
}

enum PartOfTown {
	TRESNJEVKA = 'Trešnjevka',
	KNEZIJA = 'Knežija',
	DUBRAVA = 'Dubrava',
}

class ApartmentVM {
	id: string;
	// title: string;
	// coordinates: number[];
	// partOfTown: PartOfTown;
	// street: string;
	// streetNumber: number;
	// description: string;
	// tags: Tag[];
	// area: number;
	// createdAt: string;
	// price: number;
	// // comments?: string[];
	// contactNumber: string;
	// roomCount: number;
	// bathroomCount: number;
	// availableFrom: string;

	constructor() {
		this.id = '';
	}

}

export default ApartmentVM;