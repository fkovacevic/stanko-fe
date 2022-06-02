import { useEffect, useState, useRef, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Grid, Button, ButtonGroup, Popover, Paper, MenuItem, MenuList } from '@material-ui/core';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiLogOut } from 'react-icons/fi'

import useDeviceWidth from 'common/custom-hooks/useDeviceWidth';
import { firebaseAuth } from '../../../firebase'
import './_navigation-bar.scss';
import { unsubscribeUserForPushSubscription } from 'services/UserService';
import { unsubscribeUser } from 'serviceWorkerSubscription';
import AuthorizationContext from 'context';



const NavigationBar = () => {
	let navigate = useNavigate();
	const location = useLocation();
	const { user } = useContext(AuthorizationContext);

	const [anchorEl, setAnchorEl] = useState(null);
	const deviceType = useDeviceWidth();

	const menuButtonRef = useRef(null);

	if (location.pathname === '/prijava' || location.pathname === '/registracija') {
		return null;
	}

	function handleMenuClick(event: any) {
		setAnchorEl(menuButtonRef.current);
	}
	function handleMenuClose(event: any) {
		setAnchorEl(null);
	}


	async function handleLogOut() {
		const pushSubscription = await unsubscribeUser();
		const userId = user?.uid;
		if (pushSubscription && userId) {
		    await unsubscribeUserForPushSubscription(userId, pushSubscription);
		}
		firebaseAuth.signOut().then(() => navigate('/prijava'));
	}

	const mobileOrTabletMode = deviceType === 'MOBILE_WIDTH' || deviceType === 'TABLET_WIDTH';
	const isOnHomepage = location.pathname === '/';
	const buttonClassName = `navigation-bar__button ${isOnHomepage ? 'navigation-bar--button-homepage' : ''} navigation-bar__hover-animation`;

	return (
		<Grid container className={`navigation-bar ${isOnHomepage ? 'navigation-bar--homepage' : ''}`}>
			<Grid item xs={8} className='navigation-bar__logo-wrapper'>
				<Link to='/'>
					<span className="navigation-bar__stanko">
						<img src="stanko.svg" alt="stanko" />
					</span>
				</Link>
			</Grid>
			<Grid item xs={4}>
				{mobileOrTabletMode ?
					<div className="navigation-bar__menu">
						<Button
							ref={menuButtonRef}
							onClick={handleMenuClick}
						>
							<GiHamburgerMenu className='navigation-bar__menu__icon' />
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
									{user &&
										<MenuItem onClick={handleLogOut}>
											<FiLogOut />
										</MenuItem>
									}
								</MenuList>
							</Paper>
						</Popover>
					</div>
					:
					<ButtonGroup variant="outlined" aria-label="text button group">
						<Link to='/stanovi' style={{ 'textDecoration': 'none' }}>
							<Button className={buttonClassName}>Stanovi</Button>
						</Link>
						<Link to='/obavijesti' style={{ 'textDecoration': 'none' }}>
							<Button className={buttonClassName}>Obavijesti</Button>
						</Link>
						<Link to='/oglasi' style={{ 'textDecoration': 'none' }}>
							<Button className={buttonClassName}>Oglasi</Button>
						</Link>
						<div style={{ 'textDecoration': 'none', 'display': 'flex' }}>
							{user &&
								<Button className={buttonClassName} onClick={handleLogOut}>
									<FiLogOut className='navigation-bar__log-out-button' />
								</Button>
							}
						</div>
					</ButtonGroup>
				}
			</Grid>
		</Grid>
	);
};

export default NavigationBar;