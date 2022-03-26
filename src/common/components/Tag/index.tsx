import React from 'react';
import { Grid } from '@material-ui/core';
import { MdOutlinePets } from 'react-icons/md';
import { FaBusAlt } from 'react-icons/fa';

import { Tag as TagEnum } from 'models/ApartmentVM';
import './_tag.scss'

interface Props {
    tag: TagEnum;
}

const Tag = (props: Props) => {
    const { tag } = props;
    let tagIcon = null;
    let tagName = '';
    let width = '';
    switch (tag) {
        case TagEnum.PET_FRIENDLY:
            tagIcon = <MdOutlinePets />
            tagName = tag;
            width = '100px';
            break;
        case TagEnum.NEAR_STATION:
            tagIcon = <FaBusAlt />
            tagName = tag;
            width = '120px';
            break;
        default:
            break;
    }
    return (
        <Grid container className='tag' zeroMinWidth style={{width}}>
            <Grid item xs={2}>
                {tagIcon}
            </Grid>
            <Grid item xs={10}>
                {tagName}
            </Grid>
        </Grid>
    );
};

export default Tag;