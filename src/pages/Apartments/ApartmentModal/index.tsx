import React, { useState } from 'react';
import { Grid, Dialog, Tabs, Tab, Button } from '@material-ui/core';
import { MdClose, MdImage, MdInfo } from 'react-icons/md';
import { BsWhatsapp } from 'react-icons/bs'

import ImagesTab from './ImagesTab/index';
import InfoTab from './InfoTab';
import ApartmentVM from 'models/ApartmentVM';
import './_apartment-modal.scss'

interface Props {
    open: boolean;
    onClose: () => void;
    apartment: ApartmentVM;
}

const whatsappUrl = 'https://wa.me';

const ApartmentModal = (props: Props) => {
    const { open, onClose, apartment } = props;
    const { title, images, contactNumber, createdAt } = apartment;

    const [tab, setTab] = useState<number>(0);
    function handleTabChange (e: any, newValue: number) {
        setTab(newValue);
    }

    function onContactClick() {
        window.open(`${whatsappUrl}/${contactNumber}`, "_blank");
    }
    function renderTab() {
        switch (tab) {
            case 0:
                return <ImagesTab images={images} />;
            case 1:
                return <InfoTab info={apartment}/>;
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
                    <Tab style={{ 'minWidth': '50%' }} icon={<MdImage className='apartment-modal__tabs__icon'/>}/>
                    <Tab style={{ 'minWidth': '50%' }} icon={<MdInfo className='apartment-modal__tabs__icon' />} />
                </Tabs>
                {renderTab()}
                <Grid container xs={12} justifyContent={'flex-end'} alignItems='center'>
                    <span>
                        {`Oglas objavljen: ${createdAt}`}
                    </span>
                        <Button
                            style={{ 'backgroundColor': '#075e54', 'color': 'white', 'margin': '8px', 'marginRight': '32px' }}
                            className='apartment-modal__whatsapp-button'
                            endIcon={<BsWhatsapp />}
                            onClick={onContactClick}
                        >
                            Kontakt
                        </Button>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default ApartmentModal;