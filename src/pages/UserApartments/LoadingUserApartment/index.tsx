import { Grid } from '@material-ui/core';
import { Skeleton } from '@mui/material';

const LoadingUserApartment = () => {
    return (
        <Grid item xs={12} className='loading-user-apartment'>
            <Skeleton variant='rectangular' style={{ 'height': '8vh', marginBottom: '8px'}} />
        </Grid>
    );
};

export default LoadingUserApartment;