import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { TableParams, User } from './config';

type ColumnsType<T> = TableProps<T>['columns'];

interface  UserTableProps {
	onEditView: (user: User) => void, 
  onDropUser: (user: User) => void, 
  tableParams: TableParams,
  handleTableChange: TableProps['onChange'],
  loading: boolean,
  data: User[],
};

export const UsersTable: React.FC<UserTableProps> = ({ onEditView, tableParams, handleTableChange, loading, data, onDropUser }: UserTableProps) => {
  return (
    <Table
      columns={[
        {
          title: 'First name',
          dataIndex: 'first_name',
        },
        {
          title: 'Last name',
          dataIndex: 'last_name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          render: (gender, record) => `${record.profile.gender == 'M' ? 'Male' : 'Female'}`,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          render: (age, record) => record.profile.age,
        },
        {
          title: 'HomeTown',
          dataIndex: 'hometown',
          render: (hometown, record) => `${record.profile.hometown}`,
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: (action: string, record: User) => <div className="flex gap-3"> 
            <span className='cursor-pointer' onClick={() => onEditView(record)}><EditOutlined /></span>
            <span className='cursor-pointer' onClick={() => onDropUser(record)}><CloseOutlined /></span>
          </div>,
        },
      ]}
      rowKey={(record) => record.id}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};