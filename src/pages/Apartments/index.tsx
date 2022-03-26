import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Grid, Button } from '@material-ui/core';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { BsFilterSquareFill } from 'react-icons/bs';
import { DivIcon } from 'leaflet';

import { getApartments } from 'services/ApartmentsService';
import ApartmentVM from 'models/ApartmentVM';
import LeafletMarker from 'models/MarkerVM';
import ApartmentCard from './ApartmentCard';
import LoadingApartment from './LoadingApartment/LoadingApartment';
import ApartmentModal from './ApartmentModal';
import CustomMapMarker from './CustomMapMarker';
import './_apartments.scss';

const loadingSkeletons = Array.apply(null, Array(4)).map((_,i) => i);

const Apartments = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentOpenedApartment, setCurrentOpenedApartment] = useState<ApartmentVM | null>(null);
    const [apartments, setApartments] = useState<ApartmentVM[]>([]);
    const [markers, setMarkers] = useState<LeafletMarker[]>([]);

    function closeApartmentModal() {
        setCurrentOpenedApartment(null);
    }

    function openApartmentModal(apartment: ApartmentVM) {
        setCurrentOpenedApartment(apartment);
    }

    useEffect(() => {
        async function fetchData() {
            const fetchedApartments = await getApartments();
            const apartments = fetchedApartments.docs.map((apartment) => apartment.data());
            setApartments(apartments);
        }
        setIsLoading(true);
        fetchData().then(() => setIsLoading(false));
    }, [])

    useEffect(() => {
        setMarkers(apartments.map(({ coordinates: { lat, lng }, price }) => ({ position: [lat, lng], price })));
    }, [apartments]);
    return (
        <Grid container className='apartments__container'>
            <Grid container xs={6} className='apartments__list'>
                <Grid item xs={10} className='apartments__header'>
                    pretraga stanova:
                </Grid>
                <Grid item xs={2} className='apartments__header'>
                    <Button className='apartments__filter'>
                        <BsFilterSquareFill className='apartments__filter__icon'/>
                    </Button>
                </Grid>
                {isLoading ?
                    loadingSkeletons.map(() => <LoadingApartment/>) :
                    apartments?.map((apartment) => <ApartmentCard apartment={apartment as ApartmentVM} onClick={openApartmentModal} /> )
                }
            </Grid>
            <Grid item xs={6}>
                <MapContainer center={[45.815399, 15.966568]} zoom={13} scrollWheelZoom={true} style={{ "height": "80vh", "borderRadius": "20px" }}>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {markers?.map(({ position, price}) => {
                        const divIcon = new DivIcon({
                            className: '',
                            html: ReactDOMServer.renderToString(<CustomMapMarker price={price}/>),
                            iconSize: [40, 40],
                            iconAnchor: [12, 40],
                            popupAnchor: [0, -40],
                        });
                       return <Marker position={position} icon={divIcon}/>
                    })}
                </MapContainer>
            </Grid>
            {currentOpenedApartment && <ApartmentModal open={!!currentOpenedApartment} onClose={closeApartmentModal} apartment={currentOpenedApartment} />}
        </Grid>
    );
};

export default Apartments;