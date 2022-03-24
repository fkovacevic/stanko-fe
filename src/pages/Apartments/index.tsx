import React, { useEffect, useState } from 'react';
import { Grid, Button, Modal } from '@material-ui/core';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { BsFilterSquareFill } from 'react-icons/bs';
import { LatLngExpression } from 'leaflet';

import { getApartments } from 'services/ApartmentsService';
import ApartmentVM from 'models/ApartmentVM';
import ApartmentCard from './ApartmentCard';
import LoadingApartment from './LoadingApartment/LoadingApartment';
import './_apartments.scss';
import ApartmentModal from './ApartmentModal';

const loadingSkeletons = Array.apply(null, Array(4)).map((_,i) => i);

const array1 = [{
    "id": "0xmcluXUoaAdwyVs93VU",
    "title": "Ugodan stan na Trešnjevci",
    "coordinates": {
        "lat": 45.805593,
        "lng": 15.951978
    },
    "partOfTown": "Trešnjevka",
    "street": "Nova cesta",
    "streetNumber": 27,
    "description": "POGODNOST:  temeljem Ugovora o najmu stana najmoprimac može kupiti mjesečnu povlaštenu parkirališnu kartu samo za 75,00 kuna s kojom može parkirati u cijelom Zagrebu neograničeno, u drugoj i trećoj naplatnoj zoni. - NAJMOPRIMAC NE PLAĆA RAČUN ZA PRIČUVU  STAN SE SASTOJI od ulaznog prostora zaštićenog protuprovalnim vratima, atraktivne, zasebne kuhinje sa šankom, atraktivno novonamještenog i prostranog dnevnog boravka s blagovaonicom u jednoj funkcionalnoj cjelini, vrlo prostrane i atraktivne spavaće sobe s bračnim ležajem i garderobnim ormarom i kupaonice s tuš kabinom i WC-om.  Grijanje je centralno etažno plinsko.  U stanu su ugrađena zasebna brojila za očitavanje utroška struje i plina - plaćanje režija prema stvarnoj, kontroliranoj potrošnji.",
    "images": [
        "https://firebasestorage.googleapis.com/v0/b/home-net-599d5.appspot.com/o/1b6c5546-2bab-4fcc-b958-653fc4fccee4.jpeg?alt=media&token=a8fed172-f048-40c2-929f-0bdff5386e4d",
        "https://firebasestorage.googleapis.com/v0/b/home-net-599d5.appspot.com/o/267262611.jpeg?alt=media&token=bf82b434-4791-49db-b530-8c6f1bd3b7eb"
    ],
    "tags": [
        "Pet-friendly",
        "Blizina stanice"
    ],
    "area": 69,
    "createdAt": "11.3.2022.",
    "price": 500,
    "contactNumber": "0998765432",
    "roomCount": 2,
    "bathroomCount": 1,
    "availableFrom": "10.3.2022."
}, {
    "id": "0xmcluXUoaAdwyVs93VU",
    "title": "Ugodan stan na Trešnjevci",
    "coordinates": {
        "lat": 45.905193,
        "lng": 15.951978
    },
    "partOfTown": "Trešnjevka",
    "street": "Nova cesta",
    "streetNumber": 27,
    "description": "POGODNOST:  temeljem Ugovora o najmu stana najmoprimac može kupiti mjesečnu povlaštenu parkirališnu kartu samo za 75,00 kuna s kojom može parkirati u cijelom Zagrebu neograničeno, u drugoj i trećoj naplatnoj zoni. - NAJMOPRIMAC NE PLAĆA RAČUN ZA PRIČUVU  STAN SE SASTOJI od ulaznog prostora zaštićenog protuprovalnim vratima, atraktivne, zasebne kuhinje sa šankom, atraktivno novonamještenog i prostranog dnevnog boravka s blagovaonicom u jednoj funkcionalnoj cjelini, vrlo prostrane i atraktivne spavaće sobe s bračnim ležajem i garderobnim ormarom i kupaonice s tuš kabinom i WC-om.  Grijanje je centralno etažno plinsko.  U stanu su ugrađena zasebna brojila za očitavanje utroška struje i plina - plaćanje režija prema stvarnoj, kontroliranoj potrošnji.",
    "images": [
        "https://firebasestorage.googleapis.com/v0/b/home-net-599d5.appspot.com/o/1b6c5546-2bab-4fcc-b958-653fc4fccee4.jpeg?alt=media&token=a8fed172-f048-40c2-929f-0bdff5386e4d",
        "https://firebasestorage.googleapis.com/v0/b/home-net-599d5.appspot.com/o/267262611.jpeg?alt=media&token=bf82b434-4791-49db-b530-8c6f1bd3b7eb"
    ],
    "tags": [
        "Pet-friendly",
        "Blizina stanice"
    ],
    "area": 69,
    "createdAt": "11.3.2022.",
    "price": 500,
    "contactNumber": "0998765432",
    "roomCount": 2,
    "bathroomCount": 1,
    "availableFrom": "10.3.2022."
}, {
    "id": "0xmcluXUoaAdwyVs93VU",
    "title": "Ugodan stan na Trešnjevci",
    "coordinates": {
        "lat": 45.905993,
        "lng": 15.951978
    },
    "partOfTown": "Trešnjevka",
    "street": "Nova cesta",
    "streetNumber": 27,
    "description": "POGODNOST:  temeljem Ugovora o najmu stana najmoprimac može kupiti mjesečnu povlaštenu parkirališnu kartu samo za 75,00 kuna s kojom može parkirati u cijelom Zagrebu neograničeno, u drugoj i trećoj naplatnoj zoni. - NAJMOPRIMAC NE PLAĆA RAČUN ZA PRIČUVU  STAN SE SASTOJI od ulaznog prostora zaštićenog protuprovalnim vratima, atraktivne, zasebne kuhinje sa šankom, atraktivno novonamještenog i prostranog dnevnog boravka s blagovaonicom u jednoj funkcionalnoj cjelini, vrlo prostrane i atraktivne spavaće sobe s bračnim ležajem i garderobnim ormarom i kupaonice s tuš kabinom i WC-om.  Grijanje je centralno etažno plinsko.  U stanu su ugrađena zasebna brojila za očitavanje utroška struje i plina - plaćanje režija prema stvarnoj, kontroliranoj potrošnji.",
    "images": [
        "https://firebasestorage.googleapis.com/v0/b/home-net-599d5.appspot.com/o/1b6c5546-2bab-4fcc-b958-653fc4fccee4.jpeg?alt=media&token=a8fed172-f048-40c2-929f-0bdff5386e4d",
        "https://firebasestorage.googleapis.com/v0/b/home-net-599d5.appspot.com/o/267262611.jpeg?alt=media&token=bf82b434-4791-49db-b530-8c6f1bd3b7eb"
    ],
    "tags": [
        "Pet-friendly",
        "Blizina stanice"
    ],
    "area": 69,
    "createdAt": "11.3.2022.",
    "price": 500,
    "contactNumber": "0998765432",
    "roomCount": 2,
    "bathroomCount": 1,
    "availableFrom": "10.3.2022."
}]

const Apartments = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentOpenedApartment, setCurrentOpenedApartment] = useState<ApartmentVM | null>(null);
    const [apartments, setApartments] = useState<ApartmentVM[]>([]);
    const [markers, setMarkers] = useState<LatLngExpression[]>([]);

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
        setMarkers(apartments.map(({ coordinates: { lat, lng } }) => [lat, lng]));
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
                    array1?.map((apartment) => <ApartmentCard apartment={apartment as ApartmentVM} onClick={openApartmentModal} /> )
                }
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
            {currentOpenedApartment && <ApartmentModal open={!!currentOpenedApartment} onClose={closeApartmentModal} apartment={currentOpenedApartment} />}
        </Grid>
    );
};

export default Apartments;