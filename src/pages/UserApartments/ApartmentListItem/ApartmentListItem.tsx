import { Grid } from '@material-ui/core';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';

import useDeviceWidth from 'common/custom-hooks/useDeviceWidth';
import ApartmentVM from 'models/ApartmentVM';
import './_apartment-list-item.scss';

interface Props {
	apartment: ApartmentVM;
	onEditClick: (apartment: ApartmentVM) => () => void;
	onDeleteClick: (apartment: ApartmentVM) => () => void;
}

const ApartmentListItem = (props: Props) => {
	const { apartment, onEditClick, onDeleteClick } = props;
	const { title, createdAt } = apartment;
	const deviceType = useDeviceWidth();

	const isPC = (deviceType === 'PC_WIDTH');
	const largeGridWidth = isPC ? 8 : 6;
	const smallGridWidth = isPC ? 2 : 3;

	return (
		<Grid item xs={12} className='apartment-list-item'>
			<Grid container>
				<Grid item xs={largeGridWidth}>
					{title}
				</Grid>
				<Grid item xs={smallGridWidth}>
					{createdAt}
				</Grid>
				<Grid item xs={smallGridWidth}>
					<MdEdit className='apartment-list-item__edit' onClick={onEditClick(apartment)}/>
					<RiDeleteBinLine className='apartment-list-item__delete' onClick={onDeleteClick(apartment)}/>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default ApartmentListItem;