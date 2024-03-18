import UserForm from './components/Form/UserForm';
import { useEffect, useState } from 'react';
import { UsersTable } from './components/Table/UsersTable';
import { TableParams, User, UserFilter, emptyFilter, emptyUser } from './components/Table/config';
import { deleteUser, fetchUsers, filterUsers } from './services/user.service';
import { TableProps } from 'antd';
import UserFilterForm from './components/Table/UserFilter';

function App() {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(emptyUser);
  const [openForm, setOpenForm] = useState(false);
  const [filters, setFilters] = useState(emptyFilter);
  const [openFilter, setOpenFilter] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
      showSizeChanger: false,
    },
  });

  useEffect(() => {
    fetchUsersList();
  }, []);

  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    fetchUsersList(pagination.current);
  };

  const openCreateForm = () => {
    setIsCreate(true);
    setSelectedUser(emptyUser);
    setOpenForm(true);
  }

  const fetchUsersList = async (page: number = 1, filtersData: UserFilter = filters) => {
    setLoading(true);
    if (filtersData == emptyFilter) {
      await fetchUsers(5, (5*(page-1))).then(({ results, count }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            current: page,
            total: count,
          },
        });
      });
    } else {
      await filterUsers(5, (5*(page-1)), filtersData).then(({ results, count }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            current: page,
            total: count,
          },
        });
      });
    }
  }

  const openEditForm = (user: User) => {
    setIsCreate(false);
    setSelectedUser(user);
    setOpenForm(true);
  }

  const removeUser = async (user: User) => {
    await deleteUser(user);
    fetchUsersList(1);
  }

  const onApplyFilters = (filtersParam: UserFilter) => {
    setFilters(filtersParam);
    fetchUsersList(1, filtersParam);
  }

  return (
    <div className="relative sm:rounded-lg min-h-screen w-full container m-auto pt-10">
      <h1 className='text-3xl left'> Users management </h1>
      <div className="flex mt-20 p-4 items-center justify-between flex-column space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
        <div className='flex flex-column'>
          <button type="button" className="max-w-[200px] text-gray-900 bg-white border border-gray-300  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={() => openCreateForm()}>
            Create
          </button>
          <button type="button" className="max-w-[200px] text-gray-900 bg-white border border-gray-300  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={() => setOpenFilter(true)}>
            Filter
          </button>
        </div>
      </div>
      <UsersTable onDropUser={removeUser} handleTableChange={handleTableChange} data={data} loading={loading} tableParams={tableParams} onEditView={(user) => openEditForm(user)} />
      <UserForm value={selectedUser} onSubmit={() => fetchUsersList()} isCreate={isCreate}  open={openForm} onClose={() => setOpenForm(false)} />
      <UserFilterForm value={filters} onSubmit={onApplyFilters} open={openFilter} onClose={() => setOpenFilter(false)} />
    </div>    
  );
};

export default App
