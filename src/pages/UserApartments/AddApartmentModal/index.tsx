import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Button, Dialog, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, MenuItem, TextField } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import { MdClose, MdAddAPhoto, MdEdit } from 'react-icons/md';
import { BsFillHouseFill, BsCurrencyEuro } from 'react-icons/bs'
import { FaBath, FaBed } from 'react-icons/fa'
import { IoMdAdd } from 'react-icons/io';
import { format } from 'date-fns';
import MuiPhoneNumber from 'material-ui-phone-number';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import ApartmentVM, { Coordinate, partsOfTown } from 'models/ApartmentVM';
import { upsertApartmentForUser } from 'services/UserService';
import Tags from '../Tags/Tags';
import './_add-apartment-modal.scss';
import LocationFinder from '../LocationFinder'
import ApartmentRM from 'models/ApartmentRM';
import AuthorizationContext from 'context';
import { getApartmentsForUser } from 'services/ApartmentsService';


interface Props {
	open: boolean;
	onClose: () => void;
	apartment: ApartmentVM | null;
	setApartments: (apartments: ApartmentVM[]) => void;
	closeModal: () => void;
	openSuccessAlert: () => void;
}

const MINIMUM_IMAGE_COUNT = 1;

const AddApartmentModal = (props: Props) => {
	const { open, onClose, apartment, setApartments, closeModal, openSuccessAlert } = props;

	const { user } = useContext(AuthorizationContext);

	const [title, setTitle] = useState<string>(apartment?.title ?? '');
	const [area, setArea] = useState<number | null>(apartment?.area || null);
	const [price, setPrice] = useState<number | null>(apartment?.price || null);
	const [partOfTown, setPartOfTown] = useState<string | null>(apartment?.partOfTown || null);
	const [street, setStreet] = useState<string>(apartment?.street || '');
	const [streetNumber, setStreetNumber] = useState<number | null>(apartment?.streetNumber || null);
	const [description, setDescription] = useState<string>(apartment?.description || '');
	const [tags, setTags] = useState<string[]>(apartment?.tags ?? []);
	const [roomCount, setRoomCount] = useState<number | null>(apartment?.roomCount ?? null);
	const [bathroomCount, setBathroomCount] = useState<number | null>(apartment?.bathroomCount ?? null);
	const [contactNumber, setContactNumber] = useState<string>(apartment?.contactNumber ?? '');
	const [availableFrom, setAvailableFrom] = useState<string>(apartment?.availableFrom ?? '');
	const [coordinates, setCoordinates] = useState<Coordinate | null>(apartment?.coordinates ?? null);
	const [images, setImages] = useState<File[] | string[]>([]);
	const [isProcessingRequest, setIsProcessingRequest] = useState(false);

	useEffect(() => {
		setTitle(apartment?.title ?? '');
		setArea(apartment?.area || null);
		setPrice(apartment?.price || null);
		setPartOfTown(apartment?.partOfTown || null);
		setStreet(apartment?.street || '');
		setStreetNumber(apartment?.streetNumber || null);
		setDescription(apartment?.description ?? '');
		setTags(apartment?.tags ?? []);
		setRoomCount(apartment?.roomCount ?? null);
		setBathroomCount(apartment?.bathroomCount ?? null);
		setContactNumber(apartment?.contactNumber ?? '');
		setAvailableFrom(apartment?.availableFrom ?? '');
		setCoordinates(apartment?.coordinates ?? null);
		setImages(apartment?.images ?? []);
	}, [apartment])

	const handleTitleChange = useCallback((title: any) => {
		setTitle(title.target.value);
	}, []);

	const handleAreaChange = useCallback((area: any) => {
		setArea(area.target.value);
	}, []);

	const handlePriceChange = useCallback((price: any) => {
		setPrice(price.target.value);
	}, [])

	const handlePartOfTownChange = useCallback((partOfTown: any) => {
		setPartOfTown(partOfTown.target.value);
	}, []);

	const handleStreetChange = useCallback((street: any) => {
		setStreet(street.target.value);
	}, []);

	const handleStreetNumberChange = useCallback((streetNumber: any) => {
		setStreetNumber(streetNumber.target.value);
	}, []);

	const handleDescriptionChange = useCallback((description: any) => {
		setDescription(description.target.value);
	}, [])

	const handleTagsChange = useCallback((tags: string[]) => {
		return () => setTags(tags);
	}, []);

	const handleRoomCountChange = useCallback((roomCount: any) => {
		setRoomCount(roomCount.target.value);
	}, [])

	const handleBathroomCountChange = useCallback((bathroomCount: any) => {
		setBathroomCount(bathroomCount.target.value);
	}, [])

	const handleAvailableFromChange = useCallback((af: any) => {
		setAvailableFrom(af.target.value)
	}, [])

	const handleContactNumberChange = useCallback((contactNumber: any) => {
		setContactNumber(contactNumber);
	}, [])

	const handleImagesChange = useCallback((e: any) => {
		if (e.target.files) {
			setImages([...images, e.target.files[0]]);
		}
	}, [images]);

	const handleAddButtonClick = async() => {
		if (isFilledIn) {
			setIsProcessingRequest(true);
			let userName;
			const apartmentId = apartment?.id ?? '';
			if (user?.displayName) {
				userName = user?.displayName;
			} else {
				userName = 'Anonimni Oglašivač'
			}
			const apartmentRM = new ApartmentRM(title, coordinates, partOfTown, street, streetNumber,
				area, price, contactNumber, roomCount, bathroomCount, availableFrom, user?.uid!, userName, apartmentId, description, tags);
			await upsertApartmentForUser(apartmentRM, images);
			if (user) {
				const { docs } = await getApartmentsForUser(user?.uid);
				const apartments = docs.map((apartment) => apartment.data());
				setApartments(apartments);
				closeModal();
				openSuccessAlert();
				setIsProcessingRequest(false);
			}
		}
	}


	const availableFromFormated = useMemo(() => format(availableFrom ? new Date(availableFrom) : new Date(), 'yyyy-MM-dd'), [availableFrom]);

	const buttonName = !!apartment ? 'Ažuriraj' : 'Dodaj';
	const buttonIcon = !!apartment ? <MdEdit /> : <IoMdAdd />;
	const titleName = !!apartment ? 'Ažuriraj oglas' : 'Dodaj oglas';

	const isFilledIn =
		!!title &&
		!!area &&
		!!price &&
		!!partOfTown &&
		!!roomCount &&
		!!bathroomCount &&
		!!street &&
		!!streetNumber &&
		!!availableFrom &&
		!!contactNumber &&
		!!coordinates &&
		!!contactNumber &&
		!!(images.length > MINIMUM_IMAGE_COUNT);

	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth='md'
		>
			<Grid container className='add-apartment-modal'>
				<Grid container className='add-apartment-modal__title'>
					<Grid item xs={11}>
						{titleName}
					</Grid>
					<Grid item xs={1}>
						<MdClose onClick={onClose} />
					</Grid>
				</Grid>
				<Grid container className='add-apartment-modal__body'>
					<Grid container className='add-apartment-modal__row'>
						<Grid item xs={12} className='add-apartment-modal__input'>
							<TextField
								required
								label='Naslov'
								fullWidth
								size='small'
								onChange={handleTitleChange}
								error={!title}
								value={title}
							/>
						</Grid>
					</Grid>
					<Grid container className='add-apartment-modal__row'>
						<Grid item xs={6} className='add-apartment-modal__input'>
							<FormControl variant="standard" onChange={handleAreaChange} required>
								<InputLabel htmlFor="input-area">
									Površina (m^2)
								</InputLabel>
								<Input
									id="input-area"
									startAdornment={
										<InputAdornment position="start">
											<BsFillHouseFill className='add-apartment-modal__input-icon' />
										</InputAdornment>
									}
									type='number'
									error={!area}
									value={area}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={6} className='add-apartment-modal__input'>
							<FormControl variant="standard" required onChange={handlePriceChange}>
								<InputLabel htmlFor="input-price">
									Cijena (€)
								</InputLabel>
								<Input
									id="input-price"
									startAdornment={
										<InputAdornment position="start">
											<BsCurrencyEuro className='add-apartment-modal__input-icon' />
										</InputAdornment>
									}
									type='number'
									error={!price}
									value={price}
								/>
							</FormControl>
						</Grid>
					</Grid>
					<Grid container className='add-apartment-modal__row'>
						<Grid item xs={6} className='add-apartment-modal__input'>
							<FormControl variant="standard" onChange={handleRoomCountChange} required>
								<InputLabel htmlFor="input-room-count">
									Broj soba
								</InputLabel>
								<Input
									id="input-room-count"
									startAdornment={
										<InputAdornment position="start">
											<FaBed className='add-apartment-modal__input-icon' />
										</InputAdornment>
									}
									type='number'
									error={!roomCount}
									value={roomCount}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={6} className='add-apartment-modal__input'>
							<FormControl variant="standard" required onChange={handleBathroomCountChange}>
								<InputLabel htmlFor="input-bathroom-count">
									Broj kupaona
								</InputLabel>
								<Input
									id="input-bathroom-count"
									startAdornment={
										<InputAdornment position="start">
											<FaBath className='add-apartment-modal__input-icon' />
										</InputAdornment>
									}
									type='number'
									error={!bathroomCount}
									value={bathroomCount}
								/>
							</FormControl>
						</Grid>
					</Grid>
					<Grid container className='add-apartment-modal__row'>
						<Grid item xs={12} className='add-apartment-modal__input'>
							<TextField
								id="selectPartOfTown"
								select
								label="Kvart"
								fullWidth
								onChange={handlePartOfTownChange}
								required
								value={partOfTown}
								error={!partOfTown}
							>
								{partsOfTown.map((partOfTown, index) => (
									<MenuItem key={index} value={partOfTown}>
										{partOfTown}
									</MenuItem>
								))}
							</TextField>
						</Grid>
					</Grid>
					<Grid container className='add-apartment-modal__row'>
						<Grid item xs={7} className='add-apartment-modal__input'>
							<TextField
								required
								label='Ulica'
								fullWidth
								size='small'
								onChange={handleStreetChange}
								error={!street}
								value={street}
							/>
						</Grid>
						<Grid item xs={5} className='add-apartment-modal__input'>
							<TextField
								required
								label='Kućni broj'
								fullWidth
								size='small'
								type='number'
								onChange={handleStreetNumberChange}
								error={!streetNumber}
								value={streetNumber}
							/>
						</Grid>
					</Grid>
					<Grid container className='add-apartment-modal__row'>
						<Grid item xs={12} className='add-apartment-modal__input'>
							<TextField
								placeholder='Opis'
								multiline
								fullWidth
								rows={6}
								maxRows={10}
								onChange={handleDescriptionChange}
								value={description}
							/>
						</Grid>
					</Grid>
					<Grid container className='add-apartment-modal__row'>
						<Grid item xs={12} className='add-apartment-modal__input'>
							<Tags setTags={handleTagsChange} tags={tags}/>
						</Grid>
					</Grid>
					<Grid container className='add-apartment-modal__row'>
						<Grid item xs={12} className='add-apartment-modal__input'>
							<TextField
								fullWidth
								type='date'

								InputProps={{ inputProps: { min: format(new Date(), 'yyyy-MM-dd') } }}
								required
								value={availableFromFormated}
								label='Dostupno od'
								onChange={handleAvailableFromChange}
								error={!availableFrom}
							/>
						</Grid>
					</Grid>
					<Grid container className='add-apartment-modal__row'>
						<Grid item xs={12} className='add-apartment-modal__input'>
							<MuiPhoneNumber
								defaultCountry='hr'
								onChange={handleContactNumberChange}
								label='Broj telefona'
								required fullWidth
								error={!contactNumber}
								value={contactNumber}
							/>
						</Grid>
					</Grid>
					<Grid container className='add-apartment-modal__row'>
						<Grid item xs={12} className='add-apartment-modal__input'>
							<InputLabel htmlFor='add-map' required className='add-apartment-modal__input--custom' error={!coordinates}>
								Lokacija
							</InputLabel>
							<MapContainer center={[45.815399, 15.966568]} zoom={13} scrollWheelZoom={true} style={{ "height": "30vh" }} id='add-map' >
								<TileLayer
									attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
									url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								/>
								<LocationFinder setCoordinates={setCoordinates}/>
								{coordinates && <Marker position={[coordinates.lat, coordinates.lng]}></Marker>}
							</MapContainer>
						</Grid>
					</Grid>
					<Grid container className='add-apartment-modal__row'>
						<Grid item xs={12} className='add-apartment-modal__input'>
							<InputLabel htmlFor='import-button' required className='add-apartment-modal__input--custom' error={images.length < MINIMUM_IMAGE_COUNT}>
								Slike (min. 5)
							</InputLabel>
							<input
								accept='image/*'
								style={{ display: 'none' }}
								id='import-button'
								multiple
								type='file'
								onChange={handleImagesChange}
								required
							/>
							<label htmlFor='import-button'>
								<IconButton component='span'>
									<MdAddAPhoto />
								</IconButton>
							</label>
						</Grid>
						<Grid item className='add-apartment-modal__input'>
							{images.map((image) => {
								let imageSrc = image;
								if (image instanceof File) {
									imageSrc = URL.createObjectURL(image);
								}
								return (
									<img
										className='add-apartment-modal__input__uploaded-image'
										src={imageSrc as string}
										key={imageSrc as string}
										alt={imageSrc as string}
									/>);
								})
							}
						</Grid>
					</Grid>
				</Grid>
				<Grid container className='add-apartment-modal__footer'>
					{isProcessingRequest
						? <CircularProgress/>
						: <div className='add-apartment-modal__footer__button'>
							<Button endIcon={buttonIcon} disabled={!isFilledIn} onClick={handleAddButtonClick}>
								{buttonName}
							</Button>
						</div>}
				</Grid>
			</Grid>
		</Dialog>
	);
};

export default AddApartmentModal;