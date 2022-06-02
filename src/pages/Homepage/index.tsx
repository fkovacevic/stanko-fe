import { IconButton } from '@material-ui/core';
import React from 'react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './_homepage.scss';

const index = () => {
	return (
		<div className='homepage'>
			<div className='homepage__section-one'>
				<div className='homepage__section-one__text'>
					<div className='homepage__section-one__text__first'>
						Pronađite stan.
					</div>
					<div className='homepage__section-one__text__second'>
						Nikad jednostavnije!
					</div>
					<Link to='/stanovi'>
						<IconButton component='span' style={{'fontSize': '15vh'}}>
							<BsFillArrowRightCircleFill color='white'/>
						</IconButton>
					</Link>
				</div>
				<div className='homepage__section-one__image-container'>
					<img src='apartments-to-rent.svg' alt='' />
				</div>
			</div>
			<div className='homepage__section-two'>
				<div className='homepage__section-two__image-container'>
					<img src='push-notifications-image.svg' alt=''/>
				</div>
				<div className='homepage__section-two__text'>
					<div className='homepage__section-two__text__first'>
						Iskoristite notifikacije.
					</div>
					<div className='homepage__section-two__text__second'>
						Dopustite aplikaciji notifikacije i budite prvi do stana!
					</div>
					<Link to='/obavijesti'>
						<IconButton component='span' style={{'fontSize': '15vh'}}>
							<BsFillArrowRightCircleFill color='#064663'/>
						</IconButton>
					</Link>
				</div>
			</div>
			<div className='homepage__section-three'>
				<div className='homepage__section-three__text'>
					<div className='homepage__section-three__text__first'>
						Dodajte oglas!
					</div>
					<div className='homepage__section-three__text__second'>
						Korisnici će biti obavješteni o Vašem oglasu odmah.
					</div>
					<Link to='/oglasi'>
						<IconButton component='span' style={{'fontSize': '15vh'}}>
							<BsFillArrowRightCircleFill color='#E9DAC1'/>
						</IconButton>
					</Link>
				</div>
				<div className='homepage__section-three__image-container'>
					<img src='add-ad-image.svg' alt='' />
				</div>
			</div>
		</div>
	);
};

export default index;