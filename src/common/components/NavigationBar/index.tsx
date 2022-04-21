import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Button, ButtonGroup, Popover, Paper, MenuItem, MenuList } from '@material-ui/core';
import {  GiHamburgerMenu } from 'react-icons/gi';
import { FiLogOut } from 'react-icons/fi'

import { firebaseAuth } from '../../../firebase'
import './_navigation-bar.scss';

const MOBILE_WIDTH_THRESHOLD = 1000;// px

const NavigationBar = () => {
    let navigate = useNavigate();

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
    function handleLogOut() {
        firebaseAuth.signOut().then(() => navigate('/'));
    }

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
    }, []);

    return (
        <Grid container className='navigation-bar'>
            <Grid item xs={8} className='navigation-bar__logo-wrapper'>
                <span className="navigation-bar__stanko">
                    <img src="stanko.svg" alt="stanko" />
                </span>
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
                                    <MenuItem component={Link} to='stanovi'>stanovi</MenuItem>
                                    <MenuItem component={Link} to='/obavijesti'>obavijesti</MenuItem>
                                    <MenuItem component={Link} to='/oglasi'>oglasi</MenuItem>
                                    <MenuItem onClick={handleLogOut}>
                                        <FiLogOut />
                                    </MenuItem>
                                </MenuList>
                            </Paper>
                        </Popover>
                    </div>
                    :
                    <ButtonGroup variant="outlined" aria-label="text button group">
                        <Link to='/stanovi' style={{ 'textDecoration': 'none' }}>
                            <Button className='navigation-bar__button navigation-bar__hover-animation' >Stanovi</Button>
                        </Link>
                        <Link to='/obavijesti' style={{ 'textDecoration': 'none' }}>
                            <Button className='navigation-bar__button navigation-bar__hover-animation'>Obavijesti</Button>
                        </Link>
                        <Link to='/oglasi' style={{ 'textDecoration': 'none' }}>
                            <Button className='navigation-bar__button navigation-bar__hover-animation'>Oglasi</Button>
                        </Link>
                        <div style={{ 'textDecoration': 'none', 'display': 'flex' }}>
                            <Button className='navigation-bar__button navigation-bar__hover-animation' onClick={handleLogOut}>
                                <FiLogOut className='navigation-bar__log-out-button'/>
                            </Button>
                        </div>
                    </ButtonGroup>
                }
            </Grid>
        </Grid>
    );
};

export default NavigationBar;