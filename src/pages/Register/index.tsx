import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Grid, Input, InputAdornment } from '@material-ui/core';
import { IoMdPerson } from 'react-icons/io';
import { RiLockPasswordFill } from 'react-icons/ri';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { firebaseAuth } from '../../firebase';
import './_register.scss'
import handleLogin from '../../common/functions/handleLogin';
import axios from 'axios';

const Register = () => {
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [repeatedPassword, setRepeatedPassword] = useState<string>();

	useEffect(() => {
		const url = 'http://10.129.141.77:5005/home-net-599d5/europe-west1/stankoapi/apartments';
		axios.get(url).then((value) => console.log('vakue',value));
	}, [])
	let navigate = useNavigate();
	let location = useLocation() as any;

	function handleEmailChange (email: any) {
		setEmail(email.target.value);
	}

	function handlePasswordChange (password: any) {
		setPassword(password.target.value);
	}

	function handleRepeatedPasswordChange (repeatedPassword: any) {
		setRepeatedPassword(repeatedPassword.target.value);
	}

	function handleRegisterClick () {
		async function handleRegister () {
			let userCredentials;
			if (email && password) {
				userCredentials = await createUserWithEmailAndPassword(firebaseAuth, email, password);
				if (userCredentials) {
					const to = '/stanovi';
					navigate(to, { replace: true });
					handleLogin(userCredentials.user.uid);
				}
			}
		}
		handleRegister();
	}

	const differentPasswordsError = password !== repeatedPassword;
	const isRegisterButtonEnabled = email && password && repeatedPassword && !differentPasswordsError;

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
				<div className='register__title'>Registracija</div>
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
						value={email}
						error={!email}
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
						value={password}
						error={!password || differentPasswordsError}
						onChange={handlePasswordChange}
					/>
					<Input
						startAdornment={
							<InputAdornment position='start'>
								<RiLockPasswordFill className='login__form__input-icon' />
							</InputAdornment>
						}
						placeholder='Ponovite lozinku'
						className='login__form__input'
						type='password'
						value={repeatedPassword}
						error={!repeatedPassword || differentPasswordsError}
						onChange={handleRepeatedPasswordChange}
					/>
					<div className='login__form__button-wrapper'>
						<Button
							className='login__form__button'
							onClick={handleRegisterClick}
							disabled={!isRegisterButtonEnabled}
						>
							Registriraj me!
						</Button>
					</div>
				</div>
			</div>
		</div>
    );
};

export default Register;