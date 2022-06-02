import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Dialog, FormControl, Grid, Input, InputAdornment, InputLabel, MenuItem, Select, Slider, TextField } from '@material-ui/core';
import { MdClose } from 'react-icons/md';

import './_filter-modal.scss';
import { BsCurrencyEuro, BsFillHouseFill } from 'react-icons/bs';
import { FaBath, FaBed } from 'react-icons/fa';
import { BiSearchAlt } from 'react-icons/bi'
import { partsOfTown } from 'models/ApartmentVM';
import { FilterOptions } from '../index';
import { RiDeleteBin5Fill } from 'react-icons/ri';

interface Props {
	open: boolean;
	onClose: () => void;
	setFilter: Dispatch<SetStateAction<FilterOptions | null>>;
	clearFilter: () => void;
}

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

const FilterModal = (props: Props) => {
	const { open, onClose, setFilter, clearFilter } = props;
	const [titleFilter, setTitleFilter] = useState<string>();
	const [priceMin, setPriceMin] = useState(100);
	const [priceMax, setpriceMax] = useState(1500);
	const [areaMin, setareaMin] = useState(10);
	const [areaMax, setareaMax] = useState(200);
	const [filterPartOfTown, setFilterPartOfTown] = useState<string>();

	const handleTitleFilterChange = (title: any) => setTitleFilter(title.target.value)

	function handlePriceRange(event: any, newValue: any) {
		setPriceMin(newValue[0]);
		setpriceMax(newValue[1]);
	};

	function handleAreaRange(event: any, newValue: any) {
		setareaMin(newValue[0]);
		setareaMax(newValue[1]);
	};

	function handleFilterPartOfTownChange(event: any) {
		setFilterPartOfTown(event.target.value);
	}

	function onFilter() {
		setFilter({ areaMax, areaMin, partOfTown: filterPartOfTown, priceMin, priceMax, title: titleFilter });
		onClose();
	}

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth='md'
		>
			<div className='filter-modal'>
				<Grid container className='filter-modal__title'>
					<Grid item xs={11}>
						Filteri
					</Grid>
					<Grid item xs={1}>
						<MdClose className='filter-modal__title__close' onClick={onClose}/>
					</Grid>
				</Grid>
				<Grid container className='filter-modal__row'>
					<Grid item xs={12}>
						<TextField
							label='Po naslovu'
							value={titleFilter}
							fullWidth
							onChange={handleTitleFilterChange}
						/>
					</Grid>
				</Grid>
				<Grid container className='filter-modal__row'>
					<Grid item xs={12}>
						<div className='filter-modal__slider-label'>
							{`Cijena ${priceMin}(€) - ${priceMax}(€)`}
						</div>
						<Slider
							getAriaLabel={renderPriceAiaLabel}
							valueLabelFormat={renderPriceLabel}
							value={[priceMin, priceMax]}
							min={100}
							max={1500}
							step={10}
							onChange={handlePriceRange}
							valueLabelDisplay="auto"
							getAriaValueText={renderPriceAiaLabel}
							className='notifications__slider'
						/>
					</Grid>
				</Grid>
				<Grid container className='filter-modal__row'>
					<Grid item xs={12}>
						<div className='filter-modal__slider-label'>
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
						/>
					</Grid>
				</Grid>
				<Grid container className='filter-modal__row'>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<InputLabel id="part-of-town-dropdown">Kvart</InputLabel>
							<Select
								labelId="part-of-town-dropdown"
								id="part-of-town-dropdown-id"
								label="Kvart"
								onChange={handleFilterPartOfTownChange}
								value={filterPartOfTown}
								className='notifications__part-of-town__dropdown'
							>
								{partsOfTown.map((pot) => <MenuItem value={pot} key={pot}>{pot}</MenuItem>)}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
				<Grid container className='filter-modal__footer'>
					<Grid item xs={6} className='filter-modal__delete-button'>
						<Button endIcon={<RiDeleteBin5Fill />} onClick={clearFilter}>Resetiraj</Button>
					</Grid>
					<Grid item xs={4} className='filter-modal__filter-button'>
						<Button endIcon={<BiSearchAlt />} onClick={onFilter}>Filtriraj</Button>
					</Grid>
				</Grid>
			</div>
		</Dialog>
	);
};

export default FilterModal;