import { useCallback, useContext, useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io'
import { Grid } from '@material-ui/core';
import { Fab } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';

import AuthorizationContext from 'context';
import { deleteApartment, getApartmentsForUser } from '../../services/ApartmentsService';
import ApartmentVM from 'models/ApartmentVM';
import ApartmentListItem from './ApartmentListItem/ApartmentListItem';
import LoadingUserApartment from './LoadingUserApartment';
import AddApartmentModal from './AddApartmentModal';
import './_user-apartments.scss'
import useDeviceWidth from 'common/custom-hooks/useDeviceWidth';
import DeleteApartmentModal from './DeleteApartmentModal/DeleteApartmentModal';

const loadingSkeletons = Array.apply(null, Array(2)).map((_,i) => i);

const UserApartments = () => {
	const { user } = useContext(AuthorizationContext);

	const [apartments, setApartments] = useState<ApartmentVM[] | null>(null);
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);
	const [currentEditingApartment, setCurrentEditingApartment] = useState<ApartmentVM | null>(null);
	const [currentDeletingApartment, setCurrentDeletingApartment] = useState<ApartmentVM | null>(null);
	const deviceType = useDeviceWidth();
	const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

	const handleFabClick = useCallback(() => {
		setIsOpenAddModal(true);
	}, [])

	const handleAddModalCloseFromAdd = () => {
		setIsOpenAddModal(false);
	};

	const handleAddModalCloseFromEdit = () => {
		setCurrentEditingApartment(null);
	}

	const handleEditModalOpen = (apartment: ApartmentVM) => {
		return () => setCurrentEditingApartment(apartment);
	}

	const handleDeleteApartment = (apartment: ApartmentVM) => {
		return () => setCurrentDeletingApartment(apartment);
	}

	const deleteSelectedApartment = (apartment: ApartmentVM) => {
		return async () => {
			await deleteApartment(apartment);
			setCurrentDeletingApartment(null);
			if (user?.uid) {
				const { docs } = await getApartmentsForUser(user?.uid);
				const apartments = docs.map((apartment) => apartment.data());
				setApartments(apartments);
			}
			handleOpenSuccessAlert();
		}
	}

	const handleUserApartmentsChange = (apartments: ApartmentVM[]) => setApartments(apartments);

	const closeUpsertApartmentModal = () => {
		setIsOpenAddModal(false);
		setCurrentEditingApartment(null);
	}


	const handleCloseDeleteModal = () => setCurrentDeletingApartment(null);

	const handleOpenSuccessAlert = () => {
		setOpenSuccessAlert(true);
		setTimeout(() => {
			setOpenSuccessAlert(false);
		}, 10000);
	}

	const handleCloseSuccessAlert = () => setOpenSuccessAlert(false);

	let fabPositionRight;
	if (deviceType === 'PC_WIDTH') {
		fabPositionRight = 192;
	} else if (deviceType === 'TABLET_WIDTH') {
		fabPositionRight = 64;
	} else {
		fabPositionRight = 32;
	}

	useEffect(() => {
		async function fetchUserApartments() {
			if (user?.uid) {
				const { docs } = await getApartmentsForUser(user?.uid);
				const apartments = docs.map((apartment) => apartment.data());
				setApartments(apartments);
			}
		}
		fetchUserApartments();
	}, [user?.uid]);

	return (
		<div className='user-apartments'>
			<Grid container>
				<Grid item xs={12} className='user-apartments__title'>
					Moji oglasi
				</Grid>
			</Grid>
			<div className='user-apartments__list-container'>
				<Grid container>
					{apartments?
						apartments?.map((apartment) =>
							<ApartmentListItem
								key={apartment.id}
								apartment={apartment}
								onEditClick={handleEditModalOpen}
								onDeleteClick={handleDeleteApartment}
							/>) :
						loadingSkeletons.map((_, index) => <LoadingUserApartment key={index}/>)
					}
				</Grid>
			</div>
			<Fab
				style={{
					margin: 0,
					top: 'auto',
					right: fabPositionRight,
					bottom: 128,
					left: 'auto',
					position: 'fixed',
					backgroundColor: '#54BAB9'
				}}
				size='large'
				onClick={handleFabClick}
			>
				<IoMdAdd className='user-apartments__fab-icon'/>
			</Fab>
			<AddApartmentModal
				onClose={
					(isOpenAddModal && !currentEditingApartment)
					? handleAddModalCloseFromAdd
					: handleAddModalCloseFromEdit
				}
				open={isOpenAddModal || !!currentEditingApartment}
				apartment={currentEditingApartment}
				setApartments={handleUserApartmentsChange}
				closeModal={closeUpsertApartmentModal}
				openSuccessAlert={handleOpenSuccessAlert}
			/>
			<DeleteApartmentModal
				open={!!currentDeletingApartment}
				apartment={currentDeletingApartment}
				onClose={handleCloseDeleteModal}
				deleteApartment={deleteSelectedApartment}
			/>
			<Snackbar
				anchorOrigin={{vertical: 'top', horizontal: 'right' }}
				onClose={handleCloseSuccessAlert}
				open={openSuccessAlert}
			>
				<Alert severity='success'>
					<div>
						<b>
							Promjene uspješno zabilježene.
						</b>
					</div>
				</Alert>
			</Snackbar>
		</div>
	);
};

export default UserApartments;