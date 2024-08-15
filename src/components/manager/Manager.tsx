'use client';
import { Box, CircularProgress, IconButton, Modal, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TableComp } from '../../commonComponents/table/index';
// import { BikeData } from '../../Helpers/BikeDummyData';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CheckBox, Delete, VisibilityOff } from '@mui/icons-material';
import { Bike, BikeData, UserDataTypes } from '../../interfaces';
import UserData from '../reservation/UserData';
import Link from 'next/link';
import { reservationUserTable } from '../../Helpers/ReservationUserDummyData';
import OptionValue from '../../Helpers/OptionValue';
import { AvailibleValue } from '../../constants';
import { useEnhancedDispatch, useEnhancedSelector } from '../../Helpers/reduxHooks';
import * as Actions from '../../store/actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { BikeStatus } from '../../Helpers/entities';

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

const Manager = () => {
  const access_token = useEnhancedSelector((state) => state.user.accessToken);

  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState<number>();

  const [IsLoadingData, setIsLoadingData] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [Id, setId] = useState('');
  const [Status, setStatus] = useState<Boolean>();

  const [filterModel, setFilterModel] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterRating, setFilterRating] = useState('');
  const [Availible, setAvailible] = useState<BikeStatus>(BikeStatus.Availible);

  console.log(Availible, 'set Availible');

  const [Error, setError] = useState('');

  // const [BikeData, setBikeData] = useState<BikeData[] | null>(null)

  const bikeData = useEnhancedSelector((state) => state.user.bikeData);

  console.log(bikeData);
  const [Filter, setFilter] = useState<BikeData[]>([]);
  const [bikeAvailible, setBikeAvailible] = useState<BikeStatus>(BikeStatus.Empty);
  const [boxOpen, setBoxOpen] = useState(false);
  const [openBox, setOpenBox] = useState(false);

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
      handleStatus(id);
    }
  };

  const handleStatus = async (id: any) => {
    const singleTypeData = Filter?.find((data: any) => data.id === id);

    if (singleTypeData) {
      setModel(singleTypeData.bikeModel || '');
      setColor(singleTypeData.bikeColor || '');
      setLocation(singleTypeData.location || '');

      const newType = singleTypeData.status === true ? BikeStatus.Unavailible : BikeStatus.Availible;

      try {
        if (id) {
          setIsLoading(true);

          // Ensure correct syntax for dispatch
          let response = await dispatch(
            Actions.UpdateBikeStatusData(
              singleTypeData.bikeModel,
              singleTypeData.bikeColor,
              singleTypeData.location,
              newType,
              access_token,
              id,
            ),
          );

          getBikeDataValue();

          if (response) throw response;

          setIsLoading(false);
          toast.success('User Updated Successfully');
          setError('');
          setModel('');
          setColor('');
          setLocation('');
          // setUserType(BikeStatus.Empty);
          setId('');
        }
      } catch (error: any) {
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

  useEffect(() => {
    getBikeDataValue();
  }, []);

  async function getBikeDataValue(load = true) {
    if (load) {
      setIsLoading(true);
    }
    await dispatch(Actions.GetBikesData());
    setIsLoading(false);
  }

  useEffect(() => {
    console.log(bikeData);
    if (bikeData) {
      setFilter(bikeData);
    } else {
      setFilter([]); // Set to an empty array if bikeData is null
    }
  }, [bikeData]);

  const dispatch = useEnhancedDispatch();
  const router = useRouter();

  console.log('Bike Data', bikeData);

  const handleEdit = (id: any) => {
    setId(id);
  };

  useEffect(() => {
    const singleData = Filter.find((itm: any) => itm.id === Id);

    if (singleData) {
      setModel(singleData.bikeModel);
      setColor(singleData.bikeColor);
      setLocation(singleData.location);
    }
  }, [Id]);

  const handleBikeFilter = (e: React.FormEvent) => {
    e.preventDefault();
    if (filterModel === '' || filterColor === '' || filterLocation === '' || filterRating === '') {
      setFilter(bikeData);
    }

    const filteredBikeData = bikeData.filter((data: any) => {
      const matchModel = filterModel ? data.bikeModel.toLowerCase().includes(filterModel.toLowerCase()) : true;
      const matchColor = filterColor ? data.bikeColor.toLowerCase().includes(filterColor.toLowerCase()) : true;
      const matchLocation = filterLocation ? data.location.toLowerCase().includes(filterLocation.toLowerCase()) : true;
      const matchRating = filterRating ? data.averageRating === parseInt(filterRating) : true;
      return matchModel && matchColor && matchLocation && matchRating;
    });

    setFilter(filteredBikeData);
  };

  //ADD AND UPDATE API DATA

  const handleAddUpdateBike = async (e: any) => {
    e.preventDefault();
    setIsLoadingData(false);

    if (model === '' || color === '' || location === '') {
      setError('Please Fill Out Fields');
      return;
    }

    try {
      setIsLoadingData(true);

      let response: string | void;
      if (Id) {
        setIsLoadingData(true);
        response = await dispatch(Actions.UpdateBikeData(model, color, location, access_token, Id));
        getBikeDataValue();
      } else {
        setIsLoadingData(true);
        response = await dispatch(Actions.AddBikeData(model, color, location, access_token));
        getBikeDataValue();
      }

      if (response) throw response;

      setIsLoadingData(false);
      toast.success('Bike Create Successfully');
      setError('');
      setModel('');
      setColor('');
      setLocation('');
      setId('');

      //call get user function inside this
    } catch (error: any) {
      setIsLoadingData(false);
      if (typeof error === 'string') {
        setError(error);
      } else {
        setError('Something went wrong, please try again later');
      }
    }
  };

  const handleDeleteBike = async (id: any) => {
    setIsLoading(false);
    try {
      setIsLoading(true);
      const response = await dispatch(Actions.DeleteBikeData(id, access_token));
      getBikeDataValue();
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
  };

  return (
    <>
      <div className="space-y-16 ">
        <div className="grid w-full h-28 items-center justify-items-center">
          <h1 className="text-4xl font-bold my-16 ">Manager Dashboard</h1>
        </div>

        <button
          className="mr-3 py-4 px-4 bg-[blue] cursor-pointer rounded-2xl text-[white] mt-16"
          style={{ border: '2px solid white' }}
          onClick={() => {
            setOpenBox(true);
          }}
        >
          {' '}
          Add Bike
        </button>

        <div className="addbike ">
          <Modal
            open={openBox}
            onClose={() => {
              setOpenBox(false);
            }}
          >
            <Box sx={style}>
              <form action="" className=" grid w-96  justify-items-start items-center p-6">
                {Id ? <h1 className="text-3xl my-8">Edit Bike</h1> : <h1 className="text-3xl my-8">Add Bike</h1>}

                <TextField
                  type="text"
                  id="Model"
                  fullWidth
                  label="Model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  variant="outlined"
                />
                <br />
                <TextField
                  type="text"
                  id="Color"
                  fullWidth
                  label="Color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  variant="outlined"
                />
                <br />
                <TextField
                  type="text"
                  id="Location"
                  fullWidth
                  label="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  variant="outlined"
                />
                <br />
                {IsLoadingData ? (
                  <CircularProgress />
                ) : Id ? (
                  <button
                    className="bg-[blue]  py-3 px-8 text-xl cursor-pointer rounded-2xl text-[white]"
                    style={{ border: '2px solid white' }}
                    onClick={handleAddUpdateBike}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="bg-[blue] py-2 px-12 text-lg cursor-pointer rounded-2xl text-[white]"
                    style={{ border: '2px solid white' }}
                    onClick={handleAddUpdateBike}
                  >
                    Add
                  </button>
                )}

                <p className=" mt-3 text-[red]">{Error}</p>
              </form>
            </Box>
          </Modal>
          <div className=" w-full grid justify-items-start">
            <form
              action=""
              className=" grid w-fit gap-y-8  justify-items-start  p-6 rounded-3xl"
              onSubmit={handleBikeFilter}
              style={{ border: '2px solid cyan' }}
            >
              <h1 className="text-3xl text-DARK_BACKGROUND_COLOR_MAIN font-bold">Filter Bike</h1>
              <div className="flex gap-x-6">
                <TextField
                  type="text"
                  id="Model"
                  label="Model"
                  value={filterModel}
                  onChange={(e) => setFilterModel(e.target.value)}
                  variant="outlined"
                />

                <TextField
                  type="text"
                  id="Color"
                  label="Color"
                  value={filterColor}
                  onChange={(e) => setFilterColor(e.target.value)}
                  variant="outlined"
                />
                <TextField
                  type="text"
                  id="Location"
                  label="Location"
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  variant="outlined"
                />
                <TextField
                  type="text"
                  id="Location"
                  label="Rating"
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  variant="outlined"
                />
              </div>

              <button
                className="bg-[blue] py-4 px-12 cursor-pointer rounded-2xl font-semibold  text-[white]"
                style={{ border: '2px solid white' }}
              >
                Filter
              </button>
            </form>
          </div>
        </div>

        <div>
          <TableComp
            data={Filter}
            rowsToShow={5}
            isLoading={IsLoadingData}
            columns={[
              {
                Heading: 'Model',
                accessor: 'bikeModel',
              },
              {
                Heading: 'Color',
                accessor: 'bikeColor',
              },
              {
                Heading: 'Location',
                accessor: 'location',
              },
              {
                Heading: 'Rating',
                accessor: 'averageRating',
              },
              {
                Heading: 'Reservation',
                Cell: (row: Bike, index) => {
                  //   if (EventBeingDeletedId === row.id)
                  //     return <CircularProgress />;
                  return (
                    <>
                      <Link href={`/${row.id}`}>
                        <IconButton className="mt-4 mr-5">
                          <VisibilityIcon />
                        </IconButton>
                      </Link>
                    </>
                  );
                },
              },
              {
                Heading: 'Availible',
                Cell: (row: Bike, index) => {
                  //   if (EventBeingDeletedId === row.id)
                  //     return <CircularProgress />;
                  return (
                    <>
                      <div
                        className="cursor-pointer text-xl hover:text-[blue] relative"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                      >
                        {row.status ? <div>Available</div> : <div>Not Available</div>}
                        {showPopupIndex === index && (
                          <div className="absolute top-full left-0 bg-white border border-gray-300 p-2 shadow-md z-10 w-full bg-[black] text-[white]">
                            <p className="text-xs">Are you sure to change Status?</p>
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
                          setOpenBox(true);
                          handleEdit(row.id);
                        }}
                      >
                        <EditIcon color="secondary" />
                      </IconButton>
                      <IconButton
                        className="mt-4 mr-5"
                        onClick={() => {
                          console.log('delete id', row.id);
                          handleDeleteBike(row.id);
                        }}
                      >
                        <Delete color="primary" />
                      </IconButton>
                    </>
                  );
                },
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default Manager;
