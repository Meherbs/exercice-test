import { User, backendUrl } from "../components/Table/config";

const sendRequest = async (method: string, url: string, body?: object|null) => {
	await fetch(url, {
		method: method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: body ? JSON.stringify(body) : null
	})
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	})
}

export const fetchUsers = async (pageSize: number, page: number|undefined) => {
	if (!page) page = 0;
	return fetch(`${backendUrl}?limit=${pageSize}&offset=${page}`)
      .then((res) => res.json())
}

export const filterUsers = async (pageSize: number, page: number|undefined, body: object) => {
	if (!page) page = 0;
	return fetch(`${backendUrl}filter/?limit=${pageSize}&offset=${page}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: body ? JSON.stringify(body) : null
	})
      .then((res) => res.json())
}

export const createUser = async (user: User) => {
	await sendRequest('POST', backendUrl, user).then(data => {})
			.catch(error => {
				console.error('Error:', error);
			});
}

export const editUser = async (user: User) => {
	await sendRequest('PUT', `${backendUrl}${user.id}/`, user).then(data => {})
			.catch(error => {
				console.error('Error:', error);
			});
}

export const deleteUser = async (user: User) => {
	await sendRequest('DELETE', `${backendUrl}${user.id}/`).then(data => {})
			.catch(error => {
				console.error('Error:', error);
			});

}