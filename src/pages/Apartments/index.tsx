import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { BsFilterSquareFill } from 'react-icons/bs';
import { LatLngExpression } from 'leaflet';

import { getApartments } from 'services/ApartmentsService';
import ApartmentVM from 'models/ApartmentVM';
import ApartmentCard from './ApartmentCard';
import './_apartments.scss';

const Apartments = () => {
    const [apartments, setApartments] = useState<ApartmentVM[]>([]);
    const [markers, setMarkers] = useState<LatLngExpression[]>([]);
    console.log(apartments)

    useEffect(() => {
        async function fetchData (){
            const fetchedApartments = await getApartments();
            const apartments = fetchedApartments.docs.map((apartment) => apartment.data());
            setApartments(apartments);
        }
        fetchData();
    }, [])

    useEffect(() => {
        setMarkers(apartments.map(({ coordinates: { lat, lng } }) => [lat, lng]));
    }, [apartments])
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
                {apartments?.map((apartment) => <ApartmentCard apartment={apartment} /> )}
            </Grid>
            <Grid item xs={6}>
                <MapContainer center={[45.815399, 15.966568]} zoom={13} scrollWheelZoom={true} style={{ "height": "80vh", "borderRadius": "20px" }}>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {markers?.map((marker) => <Marker position={marker} />)}
                </MapContainer>
            </Grid>
        </Grid>
    );
};

export default Apartments;