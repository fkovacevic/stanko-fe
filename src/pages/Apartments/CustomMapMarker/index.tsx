import React from 'react';

import './_custom-map-marker.scss';

interface Props {
    price: number;
}

const CustomMapMarker = (props: Props) => {
    const { price } = props;
    return (
        <div className='custom-map-marker'>
            {`${price} €`}
        </div>
    );
};

export default CustomMapMarker;