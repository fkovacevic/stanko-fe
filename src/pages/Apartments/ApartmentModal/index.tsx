import React, { useEffect, useState } from 'react';
import { Grid, Dialog, Tabs, Tab } from '@material-ui/core';
import { MdClose, MdImage, MdInfo } from 'react-icons/md';

import ImagesTab from './ImagesTab/index';
import InfoTab from './InfoTab';
import ApartmentVM from 'models/ApartmentVM';
import './_apartment-modal.scss'

interface Props {
    open: boolean;
    onClose: () => void;
    apartment: ApartmentVM;
}

const ApartmentModal = (props: Props) => {
    const { open, onClose, apartment } = props;
    const { title, images } = apartment;

    const [tab, setTab] = useState<number>(0);
    function handleTabChange (e: any, newValue: number) {
        setTab(newValue);
    }
    function renderTab() {
        switch (tab) {
            case 0:
                return <InfoTab info={apartment}/>
            case 1:
                return <ImagesTab images={images} />;
            default:
                break;
        }
    }


    return (
        <Dialog
            open={open} onClose={onClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
            fullWidth
            maxWidth='lg'
        >
            <Grid container className='apartment-modal'>
                <Grid container className='apartment-modal__header'>
                    <Grid item xs={11} className='apartment-modal__header__title'>
                        {title}
                    </Grid>
                    <Grid xs={1}>
                        <MdClose className='apartment-modal__header__close' onClick={onClose} />
                    </Grid>
                </Grid>
                <Tabs TabIndicatorProps={{ style: { backgroundColor: '#54BAB9' }}} className='apartment-modal__tabs' value={tab} onChange={handleTabChange}>
                    <Tab style={{ 'minWidth': '50%' }} icon={<MdInfo className='apartment-modal__tabs__icon' />} />
                    <Tab style={{ 'minWidth': '50%' }} icon={<MdImage className='apartment-modal__tabs__icon'/>}/>
                </Tabs>
                {renderTab()}
            </Grid>
        </Dialog>
    );
};

export default ApartmentModal;