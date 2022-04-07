import React, { useState } from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select, Slider, Button } from '@material-ui/core';
import { IoMdSave } from 'react-icons/io';

import { PartOfTown, partsOfTown } from 'models/ApartmentVM'
import './_notifications.scss';




const Notifications = () => {
	const [partOfTown, setPartOfTown] = useState<typeof PartOfTown>();
	const [minPrice, setMinPrice] = useState(100);
	const [maxPrice, setMaxPrice] = useState(1500);
	const [minArea, setMinArea] = useState(10);
	const [maxArea, setMaxArea] = useState(200);

	function handlePartOfTownChange(event: any) {
		setPartOfTown(event.target.value);
	}

	function handlePriceRange(event: any, newValue: any) {
		console.log("handleChange2 newValue", newValue);
		setMinPrice(newValue[0]);
		setMaxPrice(newValue[1]);
	};

	function handleAreaRange(event: any, newValue: any) {
		console.log("handleChange2 newValue", newValue);
		setMinArea(newValue[0]);
		setMaxArea(newValue[1]);
	};

	function renderPriceLabel(value: number) {
		return <div>{`${value}€`}</div>;
	}

	function renderAreaLabel (value: number) {
		return <div>{`${value}`}</div>
	}
	function renderPriceAiaLabel() {
		return 'Cijena';
	}

	function renderAreaAriaLabel() {
		return 'Površina';
	}
	return (
		<div className='notifications-container'>
			<div className='notifications'>
				<div className='notifications__title'>
					Postavi obavijesti
				</div>
				<Grid container className='notifications__part-of-town'>
					<Grid item xs={4}>
						<Grid container>
							<Grid item xs={12}>
								<FormControl fullWidth>
									<InputLabel id="part-of-town-dropdown">Kvart</InputLabel>
									<Select
										labelId="part-of-town-dropdown"
										id="part-of-town-dropdown-id"
										label="Kvart"
										onChange={handlePartOfTownChange}
										defaultValue=''
										className='notifications__part-of-town__dropdown'
									>
										{partsOfTown.map((pot) => <MenuItem value={pot} key={pot}>{pot}</MenuItem>)}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<div className='notifications__slider-label'>
									Cijena (€)
								</div>
								<Slider
									getAriaLabel={renderPriceAiaLabel}
									valueLabelFormat={renderPriceLabel}
									value={[minPrice, maxPrice]}
									min={100}
									max={1500}
									onChange={handlePriceRange}
									valueLabelDisplay="auto"
									getAriaValueText={renderPriceAiaLabel}
									className='notifications__slider'
								/>
							</Grid>
							<Grid item xs={12}>
								<div className='notifications__slider-label'>
									Površina (m^2)
								</div>
								<Slider
									getAriaLabel={renderAreaAriaLabel}
									valueLabelFormat={renderAreaLabel}
									value={[minArea, maxArea]}
									min={10}
									max={200}
									onChange={handleAreaRange}
									valueLabelDisplay="auto"
									getAriaValueText={renderAreaAriaLabel}
									className='notifications__slider'
								/>
							</Grid>
							<Grid item xs={12} className='notifications__save-button'>
								<Button endIcon={<IoMdSave />}>Spremi</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default Notifications;