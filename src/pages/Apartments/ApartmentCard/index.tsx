import React from 'react';
import { Grid } from '@material-ui/core';

import Carousel from 'react-material-ui-carousel'
import { FaBath, FaBed } from 'react-icons/fa'
import { BiCurrentLocation } from 'react-icons/bi'
import { BsFillHouseFill } from 'react-icons/bs'
import { RiMoneyEuroBoxFill } from 'react-icons/ri'

import ApartmentVM from 'models/ApartmentVM';
import './_apartmentCard.scss';
import Tag from '../../../common/components/Tag';
import useDeviceWidth from 'common/custom-hooks/useDeviceWidth';


interface Props {
	apartment: ApartmentVM;
	onClick: (apartment: ApartmentVM) => void;
}

const ApartmentCard = (props: Props) => {
	const { apartment, onClick } = props;
	const { images, area, bathroomCount, roomCount, price, partOfTown, tags } = apartment;
	const deviceType = useDeviceWidth();

	function onCardClick() {
		onClick(apartment);
	}

	const cardWidth = (deviceType === 'MOBILE_WIDTH' || deviceType === 'TABLET_WIDTH') ? 12 : 6;

	return (
		<Grid xs={cardWidth} item className='apartment-card-container' style={{'marginBottom': '12px'}}>
			<div className='apartment-card' onClick={onCardClick}>
				<div className='apartment-card__carousel-wrapper'>
					<Carousel autoPlay={false} IndicatorIcon={true} className='apartment-card__carousel' navButtonsAlwaysVisible>
						{images.map((image, index) => <img key={index} src={image} alt={`img${index}`} className='apartment-card__carousel__image' />)}
					</Carousel>
				</div>
				<Grid container>
					<Grid item xs={6}>
						<Grid container >
							<Grid item className='apartment-card__left' xs={6}>
								{bathroomCount}x
								<FaBath className='apartment-card__icon'/>
							</Grid>
							<Grid item className='apartment-card__left' xs={6}>
								{roomCount}x
								<FaBed className='apartment-card__icon'/>
							</Grid>
						</Grid>
						{tags?.map((tag, index) =>
								<Tag tag={tag as string} key={index}/>
						)}
					</Grid>
					<Grid item xs={6} >
						<Grid container className='apartment-card__right-row'>
							<Grid item xs={4}>
								<BiCurrentLocation className='apartment-card__icon'/>
							</Grid>
							<Grid item xs={8}>
								{partOfTown}
							</Grid>
						</Grid>
						<Grid className='apartment-card__right-row'>
							<Grid item xs={4}>
								<BsFillHouseFill className='apartment-card__icon'/>
							</Grid>
							<Grid item xs={8}>
								{`${area} m^2`}
							</Grid>
						</Grid>
						<Grid className='apartment-card__right-row'>
							<Grid item xs={4}>
								<RiMoneyEuroBoxFill className='apartment-card__icon'/>
							</Grid>
							<Grid item xs={8}>
								{price}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</Grid>
	);
};

export default ApartmentCard;