
import { useState } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { tags as allTags } from 'models/ApartmentVM';
import Tag from 'common/components/Tag';

interface Props {
	setTags: (tags: string[]) => () => void;
	tags: string[];
}

const TagsField = (props: Props) => {
	const { setTags } = props;
	const [chosenValues, setChosenValues] = useState<string[]>(props.tags);

	const onDelete = (tagToDelete: string) => {
		return () => {
			const newChosenValues = chosenValues.filter((tag: string) => tag !== tagToDelete);
			setChosenValues(newChosenValues);
		}
	};
	const options = allTags.filter((tag) => !chosenValues.includes(tag))

	console.log(chosenValues)
	return (
		<Box sx={{ width: '100%' }}>
			<Autocomplete
				multiple
				options={options}
				defaultValue={[allTags[0]]}
				getOptionLabel={(option) => option}
				value={chosenValues}
				onChange={(e, value) => {
					setChosenValues(value)
				}}
				renderTags={() => null}
				renderInput={(params) => (
					<TextField {...params} variant='standard' placeholder='Tagovi' size='small'/>
				)}
				onBlur={setTags(chosenValues)}
			/>
			<Box
				mt={3}
				sx={{
					"& > :not(:last-child)": { mr: 1 },
					"& > *": { mr: 1 }
				}}
			>
				{chosenValues?.map((tag: string) => (
					<Tag tag={tag} onDelete={onDelete(tag)}/>
				))}
			</Box>
		</Box>
	);
}

export default TagsField;

