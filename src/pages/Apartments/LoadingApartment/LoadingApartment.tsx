import React from "react";
import { Grid } from "@material-ui/core";
import { Skeleton } from '@mui/material';

import './_loading-apartment.scss'
import useDeviceWidth from 'common/custom-hooks/useDeviceWidth';

const LoadingApartment = () => {
	const deviceType = useDeviceWidth();

	const isPC = deviceType === 'PC_WIDTH';
	const gridWidth = isPC ? 6 : 12;

	return (
		<Grid xs={gridWidth} item className='loading-apartment-container'>
			<Skeleton variant="rectangular" height={'30vh'}/>
			<Skeleton variant="text" height={'5vh'}/>
			<Skeleton variant="text" height={'5vh'} />
		</Grid>
	);
}

export default LoadingApartment;
