import { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Grid, Button } from '@material-ui/core';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { BsFilterSquareFill } from 'react-icons/bs';
import { DivIcon } from 'leaflet';
import { Query } from '@firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore';

import ApartmentVM from 'models/ApartmentVM';
import LeafletMarker from 'models/MarkerVM';
import ApartmentCard from './ApartmentCard';
import LoadingApartment from './LoadingApartment/LoadingApartment';
import ApartmentModal from './ApartmentModal';
import CustomMapMarker from './CustomMapMarker';
import './_apartments.scss';
import FilterModal from './FilterModal';
import { firestore } from '../../firebase';
import useDeviceWidth from 'common/custom-hooks/useDeviceWidth';
import { enableIndexedDbPersistence } from 'firebase/firestore';


const loadingSkeletons = Array.apply(null, Array(4)).map((_, i) => i);

export type FilterOptions = {
	title?: string;
	areaMin?: number;
	areaMax?: number;
	priceMin?: number;
	priceMax?: number;
	partOfTown?: string;
}

const Apartments = () => {
	// const [isLoading, setIsLoading] = useState(false);
	const [currentOpenedApartment, setCurrentOpenedApartment] = useState<ApartmentVM | null>(null);
	// const [apartments, setApartments] = useState<ApartmentVM[]>([]);
	const apartmentsRef = firestore.collection('apartments').withConverter(ApartmentVM.apartmentConverter).limit(10) as unknown as Query<ApartmentVM>;
	const [apartmentsSnapshot, isLoading, error ] = useCollection<ApartmentVM>(apartmentsRef);
	const [apartments, setApartments] = useState<ApartmentVM[]>([]);
	const [filteredApartments, setFilteredApartments] = useState<ApartmentVM[]>([]);
	const [markers, setMarkers] = useState<LeafletMarker[]>([]);
	const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
	const [filter, setFilter] = useState<FilterOptions | null>(null);
	const deviceType = useDeviceWidth();

	function closeApartmentModal() {
		setCurrentOpenedApartment(null);
	}

	function openApartmentModal(apartment: ApartmentVM) {
		setCurrentOpenedApartment(apartment);
	}

	function closeFilterModal() {
		setOpenFilterModal(false);
	}

	function showFilterModal() {
		setOpenFilterModal(true);
	}

	function openApartmentModalFromMarker(id: string) {
		return () => {
			const apartment = apartments?.find((apartment: any) => apartment.id === id);
			if (apartment) {
				openApartmentModal(apartment);
			}
		}
	}

	function clearFilter() {
		setFilteredApartments(apartments);
		setOpenFilterModal(false);
		setFilter(null);
	}

	useEffect(() => {
		const apartments = apartmentsSnapshot?.docs.map((apartment) => apartment.data() as ApartmentVM);
		if (apartments) {
			setApartments(apartments);
			setFilteredApartments(apartments);
		}
	}, [apartmentsSnapshot])


	useEffect(() => {
		const markers = apartments?.map(({ id, coordinates: { lat, lng }, price }) => ({ id, position: [lat, lng], price }));
		setMarkers(markers as LeafletMarker[]);
	}, [apartments]);

	if (filter) {
		const filteredApartments = apartments?.filter(({ area, price, partOfTown, title }) => {
			let filtered;
			if (filter.areaMax && filter.areaMin) {
				filtered = (area >= filter.areaMin && area <= filter.areaMax);
			} else {
				filtered = true;
			}
			if (filter.priceMin && filter.priceMax) {
				filtered = filtered && (price >= filter.priceMin && price <= filter.priceMax);
			} else {
				filtered = filtered && true;
			}
			if (filter.partOfTown) {
				filtered = filtered && (filter.partOfTown === partOfTown)
			} else {
				filtered = filtered && true;
			}
			if (filter.title) {
				filtered = filtered && (title.includes(filter.title))
			} else {
				filtered = filtered && true;
			}
			return filtered;
		})

		setFilteredApartments(filteredApartments);
		setFilter(null);
	}

	const isMobileDevice = deviceType === 'MOBILE_WIDTH';
	const gridWidth = isMobileDevice ? 12 : 6;
	const mapHeight = isMobileDevice ? '40vh' : '80vh';


	return (
		<Grid container className='apartments__container'>
			<Grid item xs={gridWidth}>
				<Grid container>
					<Grid item xs={10} className='apartments__header'>
						Ponuda stanova:
					</Grid>
					<Grid item xs={2} className='apartments__header'>
						<Button className='apartments__filter' onClick={showFilterModal}>
							<BsFilterSquareFill className='apartments__filter__icon'/>
						</Button>
					</Grid>
				</Grid>
				<Grid container className='apartments__list'>
					{isLoading ?
						loadingSkeletons.map(() => <LoadingApartment />) :
						filteredApartments?.map((apartment) => <ApartmentCard apartment={apartment as ApartmentVM} onClick={openApartmentModal} />)
					}
				</Grid>
			</Grid>
			<Grid item xs={gridWidth}>
				<MapContainer
					center={[45.815399, 15.966568]}
					zoom={12}
					scrollWheelZoom={true}
					style={{ 'height': mapHeight, 'borderRadius': '20px' }}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					{markers?.map(({ id, position, price }) => {
						const divIcon = new DivIcon({
							className: '',
							html: ReactDOMServer.renderToString(<CustomMapMarker price={price} />),
							iconSize: [40, 40],
							iconAnchor: [12, 40],
							popupAnchor: [0, -40],
						});
						return <Marker position={position} icon={divIcon} eventHandlers={{
							click: openApartmentModalFromMarker(id),
						}} />
					})}
				</MapContainer>
			</Grid>
			{currentOpenedApartment && <ApartmentModal open={!!currentOpenedApartment} onClose={closeApartmentModal} apartment={currentOpenedApartment} />}
			<FilterModal
				open={openFilterModal}
				onClose={closeFilterModal}
				setFilter={setFilter}
				clearFilter={clearFilter}
			/>
		</Grid>
	);
};

export default Apartments;