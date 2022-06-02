import { useState } from 'react';
import firebase from 'firebase/compat/app';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Grid, Input, InputAdornment } from '@material-ui/core';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoFacebook, IoMdPerson } from 'react-icons/io'
import { RiLockPasswordFill } from 'react-icons/ri';

import './_login.scss';
import { firebaseAuth } from '../../firebase';
import handleLogin from '../../common/functions/handleLogin';

const Login = () => {
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	let navigate = useNavigate();
	let location = useLocation() as any;

	function handleEmailChange (email: any) {
		setEmail(email.target.value);
	}

	function handlePasswordChange (password: any) {
		setPassword(password.target.value);
	}

	async function signInWithEmailAndPassword () {
		if (email && password) {
			const user = await firebaseAuth.signInWithEmailAndPassword(email, password);
			if (user) {
				let to = '/stanovi';
				navigate(to, { replace: true });
				if (user.user) {
					handleLogin(user.user.uid);
				}
			}
		}
	}

	async function signInWithGoogle () {
		const provider = new firebase.auth.GoogleAuthProvider();
		const user = await firebaseAuth.signInWithPopup(provider);
		if (user) {
			let from = location.state?.from?.pathname || '/stanovi';
			navigate(from, { replace: true });
			if (user.user) {
				handleLogin(user.user.uid);
			}
		}
	}

	const isLoginButtonEnabled = email && password;

	return (
		<div className='login'>
			<Grid container>
				<Grid item className='login__stanko-logo' xs={12}>
					<span >
						<img src='stanko.svg' alt='' />
					</span>
				</Grid>
			</Grid>
			<div className='login__form-container'>
				<img src='stanko-image-512.png' alt='stanko-slika' className='login__stanko-image' />
				<div className='login__form'>
					<Input
						startAdornment={
							<InputAdornment position="start">
								<IoMdPerson className='login__form__input-icon' />
							</InputAdornment>
						}
						placeholder='Email'
						className='login__form__input'
						onChange={handleEmailChange}
					/>
					<Input
						startAdornment={
							<InputAdornment position='start'>
								<RiLockPasswordFill className='login__form__input-icon' />
							</InputAdornment>
						}
						placeholder='Lozinka'
						className='login__form__input'
						type='password'
						onChange={handlePasswordChange}
					/>
					<div className='login__form__login-button-wrapper'>
						<Button
							className='login__form__button'
							onClick={signInWithEmailAndPassword}
							disabled={!isLoginButtonEnabled}
						>
							Prijava
						</Button>
					</div>
					<div className='login__form__registration'>
						Nemate račun?
						<Link to='/registracija'>
							<span className='login__form__registration__link'>
								Registrirajte se!
							</span>
						</Link>
					</div>
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
					{/* <div className='login__form__button-wrapper'>
						<Button className='login__form__button' endIcon={<IoLogoFacebook className='login__form__facebook-icon' />}>
							Prijava Facebook
						</Button>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default Login;