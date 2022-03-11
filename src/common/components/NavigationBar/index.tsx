import React, { useEffect, useState, useRef } from 'react';
import { Grid, Button, ButtonGroup, Popover, Paper, MenuItem, MenuList } from '@material-ui/core';
import { HiOfficeBuilding } from 'react-icons/hi';
import {  GiHamburgerMenu } from 'react-icons/gi';


import './_navigation-bar.scss';

const MOBILE_WIDTH_THRESHOLD = 1000; // px

const NavigationBar = () => {
    const [mobileMode, setMobileMode] = useState<boolean>(window.innerWidth < MOBILE_WIDTH_THRESHOLD);
    const [anchorEl, setAnchorEl] = useState(null);

    const menuButtonRef =  useRef(null);

    function handleMenuClick (event: any) {
        setAnchorEl(menuButtonRef.current);
    }
    function handleMenuClose (event: any) {
        setAnchorEl(null);
    }
    function resizeHandler() {
        if (window.innerWidth < MOBILE_WIDTH_THRESHOLD) {
            setMobileMode(true);
        } else {
            setMobileMode(false);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
    }, []);

    return (
        <Grid container spacing={2} className='navigation-bar'>
            <Grid item xs={8} className='navigation-bar__logo-wrapper'>
                <HiOfficeBuilding className='navigation-bar__icon' />
                <span className="navigation-bar__stanko">stanko</span>
            </Grid>
            <Grid item xs={4}>
                {mobileMode ?
                    <div className="navigation-bar__menu">
                        <Button
                            ref={menuButtonRef}
                            onClick={handleMenuClick}
                        >
                            <GiHamburgerMenu className='navigation-bar__menu__icon'/>
                        </Button>
                        <Popover
                            open={!!anchorEl}
                            anchorEl={anchorEl}
                            onClose={handleMenuClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center"
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center"
                            }}
                        >
                             <Paper >
                                <MenuList className="navigation-bar__menu__popover">
                                    <MenuItem >stanovi</MenuItem>
                                    <MenuItem>obavijesti</MenuItem>
                                    <MenuItem>oglasi</MenuItem>
                                </MenuList>
                            </Paper>
                        </Popover>
                    </div>
                    :
                    <ButtonGroup variant="outlined" aria-label="text button group" className="navigation-bar__options">
                        <Button className='navigation-bar__hover-animation'>Stanovi</Button>
                        <Button className='navigation-bar__hover-animation'>Obavijesti</Button>
                        <Button className='navigation-bar__hover-animation'>Oglasi</Button>
                    </ButtonGroup>
                }
            </Grid>
        </Grid>
    );
};

export default NavigationBar;