import { useMapEvents } from "react-leaflet";
import { Coordinate } from "models/ApartmentVM";

interface Props {
	setCoordinates: (coordinates: Coordinate) => void;
}

const LocationFinder = (props: Props) => {
	const { setCoordinates } = props;
	useMapEvents({
		click({ latlng: { lat, lng } }) {
			setCoordinates({ lat, lng });
		}

	});
	return null;
};

export default LocationFinder;
