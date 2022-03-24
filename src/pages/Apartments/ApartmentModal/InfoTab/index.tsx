import React from 'react';
import { Grid } from '@material-ui/core';
import { FaBath, FaBed } from 'react-icons/fa'
import { BiCurrentLocation } from 'react-icons/bi'
import { BsFillHouseFill } from 'react-icons/bs'
import { RiMoneyEuroBoxFill } from 'react-icons/ri'

import ApartmentVM from 'models/ApartmentVM';
import './_info-tab.scss';

interface Props {
    info: Omit<ApartmentVM, 'images'>;
}

const InfoTab = (props: Props) => {

    const {
        info: {
            area, availableFrom, bathroomCount, contactNumber, coordinates,
            createdAt, partOfTown, price, roomCount, street, streetNumber, tags, description,
        }
    } = props;
    return (
        <Grid container className='info-tab'>
            <Grid item xs={12} className='info-tab__highlights'>
                Generalno
            </Grid>
            <Grid item xs={6} className='info-tab__highlight-item'>
                <BsFillHouseFill />
                <span>{area}m2</span>
            </Grid>
            <Grid item xs={6} className='info-tab__highlight-item'>
                <RiMoneyEuroBoxFill />
                <span>
                    {price}
                </span>
            </Grid>
        </Grid>
    );
};

export default InfoTab;