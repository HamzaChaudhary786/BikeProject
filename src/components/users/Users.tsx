'use client';

import { Box, IconButton, Modal, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TableComp } from '../../commonComponents/table/index';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CheckBox, Delete, Password, VisibilityOff } from '@mui/icons-material';
import { Bike } from '../../interfaces';
import { UserData } from '../../Helpers/UserDummyData';
import OptionValue from '../../Helpers/OptionValue';
import { UserTypes } from '../../constants';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '704px',
  maxHeight: '90vh', // Set the maximum height of the Box
  bgcolor: '#FFF',
  boxShadow: 24,
  p: '24px',
  overflow: 'auto',
  borderRadius: '12px',
};

const Users = () => {
  const [IsLoadingData, setIsLoadingData] = useState(false);

  const [userData, setUserData] = useState(UserData);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [singleUserData, setSingleUserData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [editId, setEditId] = useState<String | undefined>('');
  //Filter User Data

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [types, setTypes] = useState('');

  //ADD User Data

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userType, setUserType] = useState('');

  const filterUser = (e: any) => {
    e.preventDefault();

    if (name === '' || email === '' || types === '') {
      setUserData(UserData);
    }

    const filteredData = UserData.filter((data: any) => {
      const matchName = name ? data.name.toLowerCase().includes(name.toLowerCase()) : true;
      const matchEmail = email ? data.email.toLowerCase().includes(email.toLowerCase()) : true;
      const matchType = types ? data.type.toLowerCase().includes(types.toLowerCase()) : true;

      return matchName && matchEmail && matchType;
    });

    setUserData(filteredData);
  };

  const handleViewDialog = (id: string | undefined) => {
    setViewDialogOpen(true);

    const viewData = UserData?.filter((view: any) => view.id === id);

    console.log('view data is ', viewData);

    if (viewData.length > 0) {
      setSingleUserData(viewData);
    }
  };

  const [showPopupIndex, setShowPopupIndex] = useState<number | null>(null);

  const handleStatus = (id: string | undefined) => {
    const singleTypeData = userData?.find((data: any) => data.id === id);

    if (singleTypeData) {
      const newType = singleTypeData.type === 'user' ? 'manager' : 'user';
      const updatedUserData = userData.map((data: any) => (data.id === id ? { ...data, type: newType } : data));
      console.log(updatedUserData, 'updatedUserData');
      setUserData(updatedUserData);
    }
  };

  const handleMouseEnter = (index: number) => {
    setShowPopupIndex(index);
  };

  const handleMouseLeave = (index: number) => {
    setShowPopupIndex(null);
  };

  const handleConfirmation = (id: string | undefined) => {
    setShowPopupIndex(null);
    handleStatus(id);
  };

  return (
    <>
      <div className="space-y-10 p-10">
        <div>Heloo Users</div>

        <button
          className="bg-[blue] text-[white] rounded-2xl py-3 px-4"
          onClick={() => {
            setDialogOpen(true);
            setEditId('');
          }}
        >
          Add User
        </button>

        <div className="filter">
          <div>
            <form action="" onSubmit={filterUser} className="space-y-4">
              <h1>Filter User</h1>
              <br />

              <div className="flex gap-5">
                <TextField
                  type="text"
                  label="Name"
                  id="StartDate"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                />

                <br />
                <TextField
                  type="email"
                  id="EndDate"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                />
                <br />
                <TextField
                  type="text"
                  id="Model"
                  label="Type"
                  value={types}
                  onChange={(e) => setTypes(e.target.value)}
                  variant="outlined"
                />
                <br />
              </div>

              <button type="submit" className="py-2 px-3 bg-[blue] text-[white]">
                Filter
              </button>
            </form>
          </div>
        </div>
        <div>
          <TableComp
            data={userData}
            isLoading={IsLoadingData}
            columns={[
              {
                Heading: 'Id',
                accessor: 'id',
              },
              {
                Heading: 'Name',
                accessor: 'name',
              },
              {
                Heading: 'Email',
                accessor: 'email',
              },
              {
                Heading: 'Type',

                Cell: (row: Bike, index) => {
                  return (
                    <>
                      <div
                        className="cursor-pointer text-xl hover:text-[blue] relative"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                      >
                        {row.type}
                        {showPopupIndex === index && (
                          <div className="absolute top-full left-0 bg-white border border-gray-300 p-2 shadow-md z-10 w-full bg-[black] text-[white]">
                            <p className="text-xs">Are you sure to change type?</p>
                            <button
                              onClick={() => handleConfirmation(row.id)}
                              className="bg-blue-500 text-white px-2 py-1 mt-2"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => handleMouseLeave(index)}
                              className="bg-gray-300 text-black px-2 py-1 mt-2 ml-2"
                            >
                              No
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  );
                },
              },

              {
                Heading: 'Actions',
                Cell: (row: Bike, index) => {
                  //   if (EventBeingDeletedId === row.id)
                  //     return <CircularProgress />;

                  return (
                    <>
                      <IconButton
                        className="mt-4 mr-5 "
                        onClick={() => {
                          setDialogOpen(true);
                          setEditId(row.id);
                        }}
                      >
                        <EditIcon color="secondary" />
                      </IconButton>
                      <IconButton className="mt-4 mr-5">
                        <Delete color="primary" />
                      </IconButton>

                      <IconButton
                        className="mt-4 mr-5"
                        onClick={() => {
                          handleViewDialog(row.id);
                        }}
                      >
                        <VisibilityIcon color="primary" />
                      </IconButton>
                    </>
                  );
                },
              },
            ]}
          />
        </div>

        <div>
          <Modal
            open={dialogOpen}
            onClose={() => {
              setDialogOpen(false);
            }}
          >
            <Box sx={style}>
              <div>
                <form action="" onSubmit={filterUser} className="space-y-4">
                  {editId ? <h1>Edit User</h1> : <h1>Add User</h1>}
                  <br />

                  <div className="space-y-8">
                    <TextField
                      type="text"
                      label="Name"
                      id="StartDate"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      variant="outlined"
                    />

                    <br />
                    <TextField
                      type="email"
                      id="EndDate"
                      label="Email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      variant="outlined"
                    />
                    <br />
                    {/* <TextField
                      type="text"
                      id="Type"
                      label="Type"
                      value={types}
                      onChange={(e) => setTypes(e.target.value)}
                      variant="outlined"
                    /> */}

                    <OptionValue
                      label="Type*"
                      value={userType}
                      onChange={setUserType}
                      menuItems={UserTypes}
                    ></OptionValue>
                    <br />
                  </div>

                  <div>
                    {editId ? (
                      <button type="submit" className="py-2 px-3 bg-[blue] text-[white]">
                        Edit User
                      </button>
                    ) : (
                      <button type="submit" className="py-2 px-3 bg-[blue] text-[white]">
                        Add User
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </Box>
          </Modal>
        </div>

        <div>
          <Modal open={viewDialogOpen} onClose={() => setViewDialogOpen(false)}>
            <Box sx={style}>
              {singleUserData.map((itm: any) => (
                <div key={itm.id} className="space-y-4">
                  <h2>{itm.name}</h2>
                  <p>Email: {itm.email}</p>
                  <p>Type: {itm.type}</p>
                  <h3>Reservations:</h3>
                  <ul>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                      <thead>
                        <tr>
                          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Model</th>
                          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Location</th>
                          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Color</th>
                          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Start Date</th>
                          <th style={{ border: '1px solid #ddd', padding: '8px' }}>End Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {itm.reservation.map((item: any, index: any) => (
                          <tr key={index}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.model}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.location}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.color}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                              {new Date(item.startDate).toLocaleString()}
                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                              {new Date(item.endDate).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ul>
                </div>
              ))}
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Users;
