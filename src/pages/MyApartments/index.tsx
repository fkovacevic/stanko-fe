import { Grid } from '@material-ui/core';

import './_my-apartments.scss'

const MyAds = () => {
    return (
        <div className='my-apartments'>
            <Grid container className='my-apartments__title'>
                <Grid item xs={12}>
                    Moji oglasi
                </Grid>
            </Grid>
            <div className='my-apartments__list-container'>
                asd
            </div>
        </div>
    );
};

export default MyAds;