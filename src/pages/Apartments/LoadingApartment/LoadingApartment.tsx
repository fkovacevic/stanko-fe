import React from "react";
import { Grid } from "@material-ui/core";
import { Skeleton } from '@mui/material';

import './_loading-apartment.scss'

const LoadingApartment = () => {
	return (
		<Grid xs={6} item className='loading-apartment-container'>
			<Skeleton variant="rectangular" height={'30vh'}/>
			<Skeleton variant="text" height={'5vh'}/>
			<Skeleton variant="text" height={'5vh'} />
		</Grid>
	);
}

export default LoadingApartment;
