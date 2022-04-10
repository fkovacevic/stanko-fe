import React from 'react';
import { Button, Grid, Input, InputAdornment, InputLabel, TextField } from '@material-ui/core';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoFacebook, IoMdPerson } from 'react-icons/io'
import { RiLockPasswordFill } from 'react-icons/ri';

import './_login.scss';
import { firebaseAuth } from '../../firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';



const Login = () => {
	let navigate = useNavigate();
	let location = useLocation() as any;

	function signInWithGoogle () {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebaseAuth.signInWithPopup(provider).then((user) => {
			let from = location.state?.from?.pathname || "/stanovi";
			navigate(from, { replace: true });
		});
	}
	return (
		<div className='login'>
			<Grid container>
				<Grid item className='login__stanko-logo' xs={12}>
					<span >
						<img src="stanko.svg" alt="" />
					</span>
				</Grid>
			</Grid>
			<div className='login__form-container'>
				<img src='stanko-image.png' alt='stanko-slika' className='login__stanko-image' />
				<div className='login__form'>
					<Input
						startAdornment={
							<InputAdornment position="start">
								<IoMdPerson className='login__form__input-icon' />
							</InputAdornment>
						}
						placeholder='Korisničko ime'
						className='login__form__input'
					/>
					<Input
						startAdornment={
							<InputAdornment position="start">
								<RiLockPasswordFill className='login__form__input-icon' />
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
						<Button
							className='login__form__button'
							endIcon={<FcGoogle />}
							onClick={signInWithGoogle}
						>
							Prijava Google
						</Button>
					</div>
					<div className='login__form__button-wrapper'>
						<Button className='login__form__button' endIcon={<IoLogoFacebook className='login__form__facebook-icon' />}>
							Prijava Facebook
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;