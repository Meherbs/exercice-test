import { Checkbox, Drawer } from 'antd';
import { UserFilter, emptyFilter } from '../Table/config';
import { useEffect, useState } from 'react';

interface  UserFilterProps {
	onClose: () => void, 
	value: UserFilter,
	onSubmit: (filters: UserFilter) => void,
	open: boolean
};

const UserFilterForm = ({ onClose, open, value, onSubmit }: UserFilterProps) => {
	const [formData, setFormData] = useState(value ?? emptyFilter);
	
	useEffect(() => {
		setFormData(value);
	}, [value]);

	const submit = async () => {
		console.log(formData);
		onSubmit(formData);
		onClose();
	}

	return (
		<Drawer
			title="Filters"
			placement="left"
			onClose={onClose}
			open={open}
		>
			<form className="mb-6">
				<div className="mb-6">
					<label className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white">First name</label>
					<input type="text" className="form-input" placeholder="first name" value={formData.first_name} onChange={({target}) => setFormData({...formData, first_name: target.value})} />
				</div>
				<div className="mb-6">
					<label className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white">Last name</label>
					<input type="text" className="form-input" placeholder="Last name" value={formData.last_name} onChange={({target}) => setFormData({...formData, last_name: target.value})} />
				</div>
				<div className="mb-6">
					<label className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white">Hometown</label>
					<input type="text" className="form-input" placeholder="hometown" value={formData.hometown}
						onChange={({target}) => setFormData({...formData, hometown: target.value})} />
				</div>
				<div className="mb-6">
					<label className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white">gender</label>
					<Checkbox.Group value={formData.gender} options={[{value: 'M', label: 'Male'}, {value: 'F', label: 'Female'}]} onChange={(selected: string[]) => setFormData({ ...formData, gender: selected })} /> 
				</div>
				<button onClick={(event) => { event.preventDefault(); submit(); }}>Apply filter</button>
			</form>
		</Drawer>
	);
}
 
export default UserFilterForm;