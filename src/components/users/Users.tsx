'use client';

import { Box, CircularProgress, IconButton, Modal, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TableComp } from '../../commonComponents/table/index';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CheckBox, Delete, Password, VisibilityOff } from '@mui/icons-material';
import { Bike, UserDataTypes } from '../../interfaces';
import { UserData } from '../../Helpers/UserDummyData';
import OptionValue from '../../Helpers/OptionValue';

import * as Actions from '../../store/actions';
import { useEnhancedDispatch, useEnhancedSelector } from '../../Helpers/reduxHooks';
import { toast } from 'react-toastify';
import { UserTypes } from '../../Helpers/entities';
import { UserTypeData } from '../../constants';

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

  const dispatch = useEnhancedDispatch();
  const access_token = useEnhancedSelector((state) => state.user.accessToken);
  const allUserData = useEnhancedSelector((state) => state.user.allUserData);
  const [IsLoadingData, setIsLoadingData] = useState(false);
  const [Id, setId] = useState('');

  const [userData, setUserData] = useState(UserData);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [singleUserData, setSingleUserData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [editId, setEditId] = useState<string | undefined>('');
  //Filter User Data

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [types, setTypes] = useState('');

  //ADD User Data

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userType, setUserType] = useState<UserTypes>(UserTypes.Manager);
  const [password, setPassword] = useState('');


  ////////////////////

  const [IsLoading, setIsLoading] = useState(false);

  const [Error, setError] = useState('');





  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    setIsLoading(true);
    await dispatch(Actions.GetUserData(name, email, types));
    setIsLoading(false);
  }

  useEffect(() => {
    if (allUserData) {
      setFilter(allUserData);
    } else {
      setFilter([]);
    }
  }, [allUserData])



  const filterUser = async (e: React.FormEvent) => {

    e.preventDefault();

    // if (name === '' || email === '' || types === '') {
    //   setFilter(allUserData);
    // }


    try {
      setIsLoading(true)
      let response = await dispatch(Actions.GetUserData(name, email, types));
      getUserData();
      setIsLoading(false)
      if (response) throw response;

      setIsLoadingData(false);
    } catch (error) {

      if (typeof error === 'string') {
        setError(error);
      } else {
        setError('Something went wrong, please try again later');
      }

    }


  };

  const handleViewDialog = (id: string | undefined) => {
    setViewDialogOpen(true);

    const viewData = Filter?.filter((view: any) => view.id === id);

    console.log(viewData, "view data is")


    if (viewData.length > 0) {
      setFilter(viewData);
    }

  };

  const [showPopupIndex, setShowPopupIndex] = useState<number | null>(null);





  const handleMouseEnter = (index: number) => {
    setShowPopupIndex(index);
  };

  const handleMouseLeave = (index: number) => {
    setShowPopupIndex(null);
  };

  const handleConfirmation = (id: string | undefined) => {
    setShowPopupIndex(null);
    if (id) {
      handleStatus(parseInt(id));
    }
  };


  const handleStatus = async (id: number) => {
    const singleTypeData = Filter?.find((data: UserDataTypes) => data.id === id);

    if (singleTypeData) {
      setUserName(singleTypeData.userName || '');
      setUserEmail(singleTypeData.email || '');
      const newType = singleTypeData.type === 'User' ? UserTypes.Manager : UserTypes.User;

      try {
        if (id) {
          setIsLoading(true);

          // Ensure correct syntax for dispatch
          let response = await dispatch(Actions.UpdateUserData(
            singleTypeData.userName,
            singleTypeData.email,
            newType,
            access_token,
            id.toString()
          ));

          getUserDataValue();

          if (response) throw response;

          setIsLoading(false);
          toast.success('User Updated Successfully');
          setError('');
          setUserName('');
          setUserEmail('');
          setUserType(UserTypes.Empty);
          setPassword('');
          setId('');
        }
      } catch (error) {
        setIsLoading(false);
        if (typeof error === 'string') {
          setError(error);
          console.log(error);
        } else {
          setError('Something went wrong, please try again later');
        }
      }
    } else {
      console.warn(`No data found for id: ${id}`);
    }
  };




  const [Filter, setFilter] = useState<UserDataTypes[]>([]);

  useEffect(() => {
    getUserDataValue();
  }, []);

  async function getUserDataValue(load = true) {
    if (load) {
      setIsLoading(true);
    }
    await dispatch(Actions.GetUserData(name, email, types));
    setIsLoading(false);
  }

  useEffect(() => {
    console.log(allUserData, "userdatas is");
    if (allUserData) {
      setFilter(allUserData);
    } else {
      setFilter([]);
    }
  }, [allUserData]);




  useEffect(() => {
    const singleData = Filter.find((itm: any) => itm.id === editId);

    if (singleData) {
      setUserName(singleData.userName);
      setUserEmail(singleData.email);
      setUserType(singleData.type);

    }
  }, [editId, Filter]);



  const handleAddUpdateUser = async (e: any) => {

    e.preventDefault();
    setIsLoading(false);

    if (userName === '' || userEmail === '' || userType === '') {
      setError('Please Fill Out Fields');
      return;
    }

    try {
      setIsLoading(true);

      let response: string | void;
      if (editId) {
        setIsLoading(true);
        response = await dispatch(Actions.UpdateUserData(userName, userEmail, userType, access_token, editId));
        getUserDataValue();
      } else {
        setIsLoading(true);
        response = await dispatch(Actions.AddUserData(userName, userEmail, userType, password, access_token));
        getUserDataValue();
      }

      if (response) throw response;
      setDialogOpen(false)
      setIsLoading(false);
      toast.success('Bike Create Successfully');
      setError('');
      setUserName('');
      setUserEmail('');
      setUserType(UserTypes.Empty);
      setPassword('');
      setId('');

      //call get user function inside this
    } catch (error: any) {
      setIsLoading(false);
      if (typeof error === 'string') {
        setError(error);
      } else {
        setError('Something went wrong, please try again later');
      }
    }

  }


  const handleDeleteUser = async (id: any) => {

    setIsLoading(false);
    try {
      setIsLoading(true);
      const response = await dispatch(Actions.DeleteUserData(id, access_token));
      getUserDataValue();
      if (response) throw response;

      setIsLoading(false);
      toast.success('Bike Delete Successfully');

      //call get user function inside this
    } catch (error: any) {
      setIsLoading(false);
      if (typeof error === 'string') {
      } else {
        setError('Something went wrong, please try again later');
      }
    }
  }




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

            data={Filter}
            isLoading={IsLoading}
            columns={[

              {
                Heading: 'Name',
                accessor: 'userName',
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
                      <IconButton className="mt-4 mr-5"
                        onClick={() => {
                          handleDeleteUser(row.id);
                        }}>
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
                <form action="" onSubmit={handleAddUpdateUser} className="space-y-4">
                  {editId ? <h1>Edit User</h1> : <h1>Add User</h1>}
                  <br />

                  <div className="space-y-8">
                    <TextField
                      type="text"
                      label="Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      variant="outlined"
                    />

                    <br />
                    <TextField
                      type="email"

                      label="Email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      variant="outlined"
                    />
                    <br />


                    <OptionValue
                      label="Type*"
                      value={userType}
                      onChange={setUserType}
                      menuItems={UserTypeData}
                    />
                    <br />

                    {
                      !editId && (
                        <TextField
                          type="password"
                          id="EndDate"
                          label="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          variant="outlined"
                        />
                      )
                    }
                  </div>

                  <div>


                    {IsLoading ? (
                      <CircularProgress />
                    ) : editId ? (
                      <button type="submit" className="py-2 px-3 bg-[blue] text-[white]"
                      >
                        Edit User
                      </button>
                    ) : (
                      <button type="submit" className="py-2 px-3 bg-[blue] text-[white]"
                      >
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
          <Modal open={viewDialogOpen} onClose={() => {
            setFilter(allUserData)
            setViewDialogOpen(false)

          }}>
            <Box sx={style}>
              {Filter.map((itm: any) => (
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

                        {
                          itm.reservations?.length === 0 ? (
                            <div>
                              No Reservation
                            </div>
                          ) : (
                            itm.reservations?.map((item: any, index: any) => (
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
                            )) || <tr><td colSpan={5} style={{ textAlign: 'center', border: '1px solid #ddd', padding: '8px' }}>No Reservation</td></tr>
                          )
                        }

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
