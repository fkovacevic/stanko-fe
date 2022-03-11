import React from 'react';
import { Grid } from '@material-ui/core';

import './_apartments.scss';

const Apartments = () => {
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