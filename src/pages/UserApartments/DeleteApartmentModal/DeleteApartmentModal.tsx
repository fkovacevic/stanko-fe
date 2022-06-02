import { Button, Dialog, Grid } from '@material-ui/core';
import { MdClose } from 'react-icons/md';

import ApartmentVM from 'models/ApartmentVM';
import './delete-apartment-modal.scss'

interface Props {
	open: boolean;
	apartment: ApartmentVM | null;
	onClose: () => void;
	deleteApartment: (apartment: ApartmentVM) => () => void;
}

const DeleteApartmentModal = (props: Props) => {
	const { open, onClose, apartment, deleteApartment } = props;

	return (
		<Dialog
			open={open}
			onClose={onClose}
		>
			<div className='delete-apartment-modal'>
				<Grid container className='delete-apartment-modal__title'>
					<Grid item xs={11}>
						Brisanje oglasa
					</Grid>
					<Grid item xs={1}>
						<MdClose onClick={onClose} style={{'cursor': 'pointer'}}/>
					</Grid>
				</Grid>
				<Grid container className='delete-apartment-modal__body'>
					<Grid item xs={12}>
						Jeste li sigurni da želite izbrisati oglas
						<span className='delete-apartment-modal__body__title'>
							{`${apartment?.title} (${apartment?.createdAt})`}
						</span>?
					</Grid>
					<Grid item xs={12} className='delete-apartment-modal__body__disclaimer'>
						Korisnici čije preference zadovoljava Vaš oglas će dobiti obavijest o brisanju.
					</Grid>
				</Grid>
				<Grid container className='delete-apartment-modal__footer'>
					<Button variant='contained' style={{'backgroundColor': '#C84B31', 'color': 'white'}} onClick={deleteApartment(apartment!)}>
						Izbriši
					</Button>
				</Grid>
			</div>
		</Dialog>
	);
};

export default DeleteApartmentModal;