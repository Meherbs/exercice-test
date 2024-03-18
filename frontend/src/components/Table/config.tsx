import type { GetProp, TableProps } from 'antd';

export type ColumnsType<T> = TableProps<T>['columns'];
export type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

export const backendUrl: string = "http://localhost:8000/users/";

export interface User {
	id: number;
  	first_name: string;
	last_name: string;
	username: string;
  	email: string;
	profile: {
		id: number,
		hometown: string,
		age: number,
		gender: string
	}
};

export const emptyUser: User = {
	id: 0,
  	first_name: '',
	last_name: '',
	username: '',
  	email: '',
	profile: {
		id: 0,
		hometown: '',
		age: 0,
		gender: 'M'
	}
}

export const emptyFilter: UserFilter = {
  	first_name: '',
	last_name: '',
	hometown: '',
	gender: ['M']
}

export interface UserFilter {
  	first_name: string;
	last_name: string;
	hometown: string,
	gender: string[]
};

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}
