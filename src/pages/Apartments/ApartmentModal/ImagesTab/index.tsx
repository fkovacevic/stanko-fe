import React from "react";
import { ImageListItem } from "@material-ui/core";
import ImageList from '@mui/material/ImageList';


interface Props {
	images: string[];
}

const ImagesTab = (props: Props) => {
	const { images } = props;

	return (
		<div className='apartment-modal__images'>
			<ImageList variant='woven' cols={2} gap={8}>
				{images.map(item =>
					<ImageListItem key={item} style={{ 'height': '30vh' }}>
						<img src={`${item}`} srcSet={`${item}`} alt={item} loading="eager" />
					</ImageListItem>)
				}
			</ImageList>
		</div>
	);
}

export default ImagesTab;
