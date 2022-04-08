import React from 'react';
import { Button, Grid, Input, InputAdornment, InputLabel, TextField } from '@material-ui/core';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoFacebook, IoMdPerson } from 'react-icons/io'
import { RiLockPasswordFill } from 'react-icons/ri';

import './_login.scss';

const Login = () => {
	return (
		<div className='login'>
			<img src='stanko.svg' alt='stanko'/>
			<img src='stanko-image.png' alt='stanko-slika' className='login__stanko-image'/>
			<div className='login__form'>
				<Input
					startAdornment={
						<InputAdornment position="start">
							<IoMdPerson className='login__form__input-icon'/>
						</InputAdornment>
					}
					placeholder='Korisničko ime'
					className='login__form__input'
        		/>
				<Input
					startAdornment={
						<InputAdornment position="start">
							<RiLockPasswordFill className='login__form__input-icon'/>
						</InputAdornment>
					}
					placeholder='Lozinka'
					className='login__form__input'
					type='password'
				/>
				<div className='login__form__or'>
					ili
				</div>
				<div className='login__form__button-wrapper'>
					<Button className='login__form__button' endIcon={<FcGoogle />}>
						Prijava Google
					</Button>
				</div>
				<div className='login__form__button-wrapper'>
					<Button className='login__form__button' endIcon={<IoLogoFacebook className='login__form__facebook-icon'/>}>
						Prijava Facebook
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Login;