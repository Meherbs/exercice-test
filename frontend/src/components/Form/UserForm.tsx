import { Drawer } from 'antd';
import { User, emptyUser } from '../Table/config';
import { useEffect, useState } from 'react';
import { createUser, editUser } from '../../services/user.service';

interface  UserFormProps {
	isCreate: boolean, 
	onClose: () => void, 
	value: User,
	onSubmit: () => void,
	open: boolean
};

const UserForm = ({ isCreate, onClose, open, value, onSubmit }: UserFormProps) => {
	const [formData, setFormData] = useState(value ?? emptyUser);
	
	useEffect(() => {
		setFormData(value);
	}, [value]);

	const saveUser = async () => {
		if (isCreate) {
			await createUser(formData);
		} else {
			await editUser(formData);
		}
		onSubmit();
		onClose();
	}

	return (
		<Drawer
			title={isCreate ? 'Create new user' : 'Edit user'}
			placement="left"
			onClose={onClose}
			open={open}
		>
			<form className="mb-6">
				<div className="mb-6">
					<label className="form-label">Email</label>
					<input type="email" className="form-input" placeholder="email" value={formData.email} onChange={({target}) => setFormData({...formData, email: target.value})} />
				</div>
				<div className="mb-6">
					<label className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white">Username</label>
					<input type="text" className="form-input" placeholder="username" value={formData.username} onChange={({target}) => setFormData({...formData, username: target.value})} />				
				</div>
				<div className="mb-6">
					<label className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white">First name</label>
					<input type="text" className="form-input" placeholder="first name" value={formData.first_name} onChange={({target}) => setFormData({...formData, first_name: target.value})} />
				</div>
				<div className="mb-6">
					<label className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white">Last name</label>
					<input type="text" className="form-input" placeholder="Last name" value={formData.last_name} onChange={({target}) => setFormData({...formData, last_name: target.value})} />
				</div>
				<div className="mb-6">
					<label className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white">age</label>
					<input type="number" className="form-input" placeholder="age" value={formData.profile.age} 
						onChange={({target}) => setFormData({...formData, profile: { ...formData.profile, age: parseInt(target.value)}})} />
				</div>
				<div className="mb-6">
					<label className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white">Hometown</label>
					<input type="text" className="form-input" placeholder="hometown" value={formData.profile.hometown}
						onChange={({target}) => setFormData({...formData, profile: { ...formData.profile, hometown: target.value}})} />
				</div>
				<div className="mb-6">
					<label className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white">gender</label>
					<select value={formData.profile?.gender}
						onChange={({target}) => setFormData({...formData, profile: { ...formData.profile, gender: target.value}})}>
						<option value="M">Male</option>
						<option value="F">Female</option>
					</select>
				</div>
				<button onClick={(event) => { event.preventDefault(); saveUser(); }}>SAVE</button>
			</form>
		</Drawer>
	);
}
 
export default UserForm;