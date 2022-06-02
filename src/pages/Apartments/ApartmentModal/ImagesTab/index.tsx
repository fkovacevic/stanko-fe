import { ImageListItem } from "@material-ui/core";
import ImageList from '@mui/material/ImageList';
import useDeviceWidth from 'common/custom-hooks/useDeviceWidth';

import './_images-tab.scss';

interface Props {
	images: string[];
}

const ImagesTab = (props: Props) => {
	const { images } = props;
	const deviceType = useDeviceWidth();

	let colSpan;
	if (deviceType === 'PC_WIDTH') {
		colSpan = 3;
	} else if (deviceType === 'TABLET_WIDTH') {
		colSpan = 2;
	} else {
		colSpan = 1;
	}

	return (
		<div className='apartment-modal__images'>
			<ImageList variant='woven' cols={colSpan} gap={8}>
				{images.map(item =>
					<ImageListItem key={item} style={{ 'height': '30vh' }} className='images-tab'>
						<img src={`${item}`} srcSet={`${item}`} alt={item} loading="eager" />
					</ImageListItem>)
				}
			</ImageList>
		</div>
	);
}

export default ImagesTab;
