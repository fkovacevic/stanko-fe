import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';

import { getApartments } from 'services/ApartmentsService';
import './_apartments.scss';

const Apartments = () => {
    useEffect(() => {
        getApartments();
    }, [])
    return (
        <div>
            <Grid container>
                <Grid item xs={6} className='apartments__container'>
                    jebeni stanovi su tu
                </Grid>
                <Grid item xs={6} className='apartments__container'>
                    <img className='apartments__house-image' src='house-search.svg' alt='trazilica' />
                </Grid>
            </Grid>
        </div>
    );
};

export default Apartments;