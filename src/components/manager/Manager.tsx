'use client';
import { CircularProgress, IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TableComp } from '../../commonComponents/table/index';
// import { BikeData } from '../../Helpers/BikeDummyData';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CheckBox, Delete, VisibilityOff } from '@mui/icons-material';
import { Bike, BikeData } from '../../interfaces';
import UserData from '../reservation/UserData';
import Link from 'next/link';
import { reservationUserTable } from '../../Helpers/ReservationUserDummyData';
import OptionValue from '../../Helpers/OptionValue';
import { AvailibleValue } from '../../constants';
import { useEnhancedDispatch, useEnhancedSelector } from '../../Helpers/reduxHooks';
import * as Actions from '../../store/actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
const Manager = () => {
  const access_token = useEnhancedSelector((state) => state.user.accessToken);

  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [location, setLocation] = useState('');

  const [IsLoadingData, setIsLoadingData] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [Id, setId] = useState('');
  const [Status, setStatus] = useState<Boolean>();

  const [filterModel, setFilterModel] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterRating, setFilterRating] = useState('');
  const [Availible, setAvailible] = useState('Availible');

  const [Error, setError] = useState('');

  // const [BikeData, setBikeData] = useState<BikeData[] | null>(null)

  const bikeData = useEnhancedSelector((state) => state.user.bikeData);
  const [Filter, setFilter] = useState<BikeData[]>([]);

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
    setIsLoading(false);

    if (model === '' || color === '' || location === '') {
      setError('Please Fill Out Fields');
      return;
    }

    try {
      setIsLoading(true);

      let response: string | void;
      if (Id) {
        setIsLoading(true);
        response = await dispatch(Actions.UpdateBikeData(model, color, location, access_token, Id));
        getBikeDataValue();
      } else {
        setIsLoading(true);
        response = await dispatch(Actions.AddBikeData(model, color, location, access_token));
        getBikeDataValue();
      }

      if (response) throw response;

      setIsLoading(false);
      toast.success('Bike Create Successfully');
      setError('');
      setModel('');
      setColor('');
      setLocation('');
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
      <div className="space-y-8">
        <div className="addbike ">
          <div className="grid w-full h-28 items-center justify-items-center">
            <h2>Manager Dashboard</h2>
          </div>
          <div className="flex gap-x-8">
            <form action="" className=" grid h-96 w-fit bg-[gray] text-[white] justify-items-center items-center p-6">
              {Id ? <h1 className="text-3xl">Edit Bike</h1> : <h1 className="text-3xl">Add Bike</h1>}

              <TextField
                type="text"
                id="Model"
                label="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                variant="outlined"
              />
              <br />
              <TextField
                type="text"
                id="Color"
                label="Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                variant="outlined"
              />
              <br />
              <TextField
                type="text"
                id="Location"
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                variant="outlined"
              />
              <br />
              {IsLoading ? (
                <CircularProgress />
              ) : Id ? (
                <button className="bg-[blue] text-[white] py-3 px-8 text-xl" onClick={handleAddUpdateBike}>
                  Update
                </button>
              ) : (
                <button className="bg-[blue] text-[white] py-3 px-8 text-xl" onClick={handleAddUpdateBike}>
                  Add
                </button>
              )}

              <div>{Error}</div>
            </form>

            <form
              action=""
              className=" grid w-fit bg-[gray] text-[white] justify-items-center items-center p-6"
              onSubmit={handleBikeFilter}
            >
              <h1 className="text-3xl">Filter Bike</h1>
              <div className="flex gap-x-6">
                <TextField
                  type="text"
                  id="Model"
                  label="Model"
                  value={filterModel}
                  onChange={(e) => setFilterModel(e.target.value)}
                  variant="outlined"
                />
                <br />
                <TextField
                  type="text"
                  id="Color"
                  label="Color"
                  value={filterColor}
                  onChange={(e) => setFilterColor(e.target.value)}
                  variant="outlined"
                />
                <br />
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
              <br />

              <button className="bg-[blue] text-[white] py-3 px-8 text-xl ">Filter</button>
            </form>
          </div>
        </div>

        <div>
          <TableComp
            data={Filter}
            rowsToShow={8}
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
                      <OptionValue value={Availible} onChange={setAvailible} menuItems={AvailibleValue}></OptionValue>
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
