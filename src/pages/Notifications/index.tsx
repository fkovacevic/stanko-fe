import { useState, useContext, useEffect } from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select, Slider, Button, Switch, FormControlLabel } from '@material-ui/core';
import { Snackbar, Alert } from '@mui/material';
import { IoMdSave } from 'react-icons/io';
import { CircularProgress } from '@material-ui/core';

import { setUserSubscription, getUserSubscription } from 'services/UserService'
import { partsOfTown } from 'models/ApartmentVM'
import { UserSubscription } from 'models/UserVM';
import './_notifications.scss';
import AuthorizationContext from 'context';
import useDeviceWidth from 'common/custom-hooks/useDeviceWidth';

function renderPriceLabel(value: number) {
	return <div>{`${value}€`}</div>;
}

function renderAreaLabel(value: number) {
	return <div>{`${value}`}</div>
}
function renderPriceAiaLabel() {
	return 'Cijena';
}

function renderAreaAriaLabel() {
	return 'Površina';
}

const Notifications = () => {
	const { user } = useContext(AuthorizationContext);

	const [partOfTown, setPartOfTown] = useState<string>();
	const [priceMin, setPriceMin] = useState(100);
	const [priceMax, setpriceMax] = useState(1500);
	const [areaMin, setareaMin] = useState(10);
	const [areaMax, setareaMax] = useState(200);
	const [turnOffNotifications, setTurnOffNotifications] = useState(false);
	const [openSuccessAlert, setopenSuccessAlert] = useState(false);
	const [openNotificationChangeAlert, setOpenNotificationChangeAlert] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const deviceType = useDeviceWidth();

	useEffect(() => {
		async function fetchUserSubscription() {
			setIsLoading(true);
			const userSubscriptionSnapshot = await getUserSubscription(user?.uid);
			const userSubscription = userSubscriptionSnapshot.data()?.userSubscription;

			let usKeys: string[] = [];
			if (userSubscription) {
				usKeys = Object.keys(userSubscription);
			}
			if (usKeys.length > 0) {
				console.log('postoji user subscription')
				setPartOfTown(userSubscription?.partOfTown!);
				setPriceMin(userSubscription?.priceMin!);
				setpriceMax(userSubscription?.priceMax!);
				setareaMin(userSubscription?.areaMin!);
				setareaMax(userSubscription?.areaMax!);
				setTurnOffNotifications(false);
			} else {
				setTurnOffNotifications(true);
			}
			setIsLoading(false);
		}
		fetchUserSubscription();
	}, [user?.uid])

	function handlePartOfTownChange(event: any) {
		setPartOfTown(event.target.value);
	}

	function handlePriceRange(event: any, newValue: any) {
		setPriceMin(newValue[0]);
		setpriceMax(newValue[1]);
	};

	function handleAreaRange(event: any, newValue: any) {
		setareaMin(newValue[0]);
		setareaMax(newValue[1]);
	};

	async function handleSwitchChange(value: any) {
		if (value.currentTarget.checked) {
			await setUserSubscription(user?.uid, {});
			setOpenNotificationChangeAlert(true);
			setTurnOffNotifications(true);
		} else {
			setTurnOffNotifications(false);
		}
	}

	async function saveUserSubscription() {
		const userSubscription: UserSubscription = {
			areaMax,
			areaMin,
			partOfTown,
			priceMax,
			priceMin,
		};
		await setUserSubscription(user?.uid, userSubscription);
		setopenSuccessAlert(true);
		setTimeout(() => {
			setopenSuccessAlert(false);
		}, 10000);
	}

	function handleCloseSuccessAlert() {
		setopenSuccessAlert(false);
	}

	function handleCloseNotificationChangeAlert() {
		setOpenNotificationChangeAlert(false);
	}

	const isFormDisabled = turnOffNotifications;
	const isPC = deviceType === 'PC_WIDTH';
	const gridWidth = isPC ? 4 : 10;

	return (
		<div className='notifications-container'>
			<div className='notifications'>
				{isLoading
					? <div className='notifications__loading'>
						<CircularProgress />
					</div>
					: <>
						<div className='notifications__title'>
							Postavi obavijesti
						</div>
						<Grid container className='notifications__part-of-town'>
							<Grid item xs={gridWidth}>
								<Grid container>
									<Grid item xs={12}>
										<FormControl fullWidth>
											<InputLabel id="part-of-town-dropdown">Kvart</InputLabel>
											<Select
												labelId="part-of-town-dropdown"
												id="part-of-town-dropdown-id"
												label="Kvart"
												onChange={handlePartOfTownChange}
												defaultValue={partOfTown ?? ''}
												className='notifications__part-of-town__dropdown'
												disabled={isFormDisabled}
											>
												{partsOfTown.map((pot) => <MenuItem value={pot} key={pot}>{pot}</MenuItem>)}
											</Select>
										</FormControl>
									</Grid>
									<Grid item xs={12}>
										<div className='notifications__slider-label'>
											{`Cijena ${priceMin}(€) - ${priceMax}(€)`}
										</div>
										<Slider
											getAriaLabel={renderPriceAiaLabel}
											valueLabelFormat={renderPriceLabel}
											value={[priceMin, priceMax]}
											step={10}
											min={100}
											max={1500}
											onChange={handlePriceRange}
											valueLabelDisplay="auto"
											getAriaValueText={renderPriceAiaLabel}
											className='notifications__slider'
											disabled={isFormDisabled}
										/>
									</Grid>
									<Grid item xs={12}>
										<div className='notifications__slider-label'>
											{`Površina ${areaMin}m2 - ${areaMax}m2`}
										</div>
										<Slider
											getAriaLabel={renderAreaAriaLabel}
											valueLabelFormat={renderAreaLabel}
											value={[areaMin, areaMax]}
											min={10}
											max={200}
											step={5}
											onChange={handleAreaRange}
											valueLabelDisplay="auto"
											getAriaValueText={renderAreaAriaLabel}
											className='notifications__slider'
											disabled={isFormDisabled}
										/>
									</Grid>
									<Grid item xs={12} className='notifications__save-button'>
										<Button
											endIcon={<IoMdSave />}
											onClick={saveUserSubscription}
											disabled={isFormDisabled}
										>
											Spremi
										</Button>
									</Grid>
									<Grid container>
										<Grid item xs={12} className='notifications__turn-off'>
											<span className='notifications__switch-label'>
												Prestani primati obavijesti?
											</span>
											<Switch
												checked={turnOffNotifications}
												onChange={handleSwitchChange}
												inputProps={{ 'aria-label': 'controlled' }}
											/>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</>}
			</div>
			<Snackbar
				open={openSuccessAlert}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				onClose={handleCloseSuccessAlert}
			>
				<Alert severity='success'>
					<div style={{ 'color': 'green' }}>
						<b>
							Uspješno ste postavili postavke za notifikacije:
						</b>
					</div>
					<div>
						{`Raspon cijena: ${priceMin} - ${priceMax} (€)`}
					</div>
					<div>
						{`Raspon kvadrature: ${areaMin} - ${areaMax} (m^2)`}
					</div>
					<div>
						{partOfTown && `Kvart: ${partOfTown}`}
					</div>
				</Alert>
			</Snackbar>
			<Snackbar
				open={openNotificationChangeAlert}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				onClose={handleCloseNotificationChangeAlert}
			>
				<Alert severity='success'>
					<div style={{ 'color': 'green' }}>
						<b>
							Uspješno ste ugasili obavijesti.
						</b>
					</div>
				</Alert>
			</Snackbar>
		</div>
	);
};

export default Notifications;