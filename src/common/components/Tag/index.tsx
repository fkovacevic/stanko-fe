import { Chip, Grid } from '@material-ui/core';
import { MdOutlinePets } from 'react-icons/md';
import { FaBusAlt, FaSmoking, FaParking } from 'react-icons/fa';

import { Tag as TagEnum } from 'models/ApartmentVM';
import './_tag.scss'

interface Props {
	tag: string;
	onDelete? : () => void;
}

const Tag = (props: Props) => {
	const { tag, onDelete } = props;
	let tagIcon = undefined;
	let tagName = '';

	switch (tag) {
		case TagEnum.PET_FRIENDLY:
			tagIcon = <MdOutlinePets />
			tagName = tag;
			break;
		case TagEnum.NEAR_STATION:
			tagIcon = <FaBusAlt />
			tagName = tag;
			break;
		case TagEnum.SMOKING_ALLOWED:
			tagIcon = <FaSmoking />
			tagName = tag;
			break;
		case TagEnum.PARKING_SLOT:
			tagIcon = <FaParking />
			tagName = tag;
			break;
		default:
			break;
	}
	return (
		<div className='tag' >
			<Chip icon={tagIcon} label={tagName} onDelete={onDelete}/>
		</div>
	);
};

export default Tag;