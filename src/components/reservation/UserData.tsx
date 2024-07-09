'use client';
import React, { useEffect, useState } from 'react';
import { BikeData } from '../../Helpers/BikeDummyData';
import { Box, CircularProgress, Modal, Rating, TextField } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { set } from 'date-fns';
import { useEnhancedDispatch, useEnhancedSelector } from '../../Helpers/reduxHooks';
import * as Actions from '../../store/actions';
import { toast } from 'react-toastify';

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

const UserData = () => {

  const dispatch = useEnhancedDispatch();
  const currentDate = new Date();

  const getBikesData = useEnhancedSelector((state) => state.user.getBikesData)
  const userData = useEnhancedSelector((state) => state.user.userData)
  const access_token = useEnhancedSelector((state) => state.user.accessToken);




  const todayDate = currentDate.toISOString().slice(0, 16);

  const futureDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  const futureDateString = futureDate.toISOString().slice(0, 16);

  const [startDate, setStartDate] = useState(todayDate);
  const [endDate, setEndDate] = useState(futureDateString);
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('');
  const [openBox, setOpenBox] = useState(false);
  const [Id, setId] = useState('');
  const [UserData, setUserData] = useState<string | undefined>()
  // const [reserveStartDate, setReserveStartDate] = useState(currentDate);
  // const [reserveEndDate, setReserveEndDate] = useState('');
  // Filtered bike data
  const [filteredData, setFilteredData] = useState(getBikesData);
  const [IsLoading, setIsLoading] = useState(false);


  const [Error, setError] = useState('');


  useEffect(() => {
    getUserBikeDataValue();
  }, []);

  async function getUserBikeDataValue(load = true) {
    if (load) {
      setIsLoading(true);
    }
    await dispatch(Actions.GetUserBikesData(startDate, endDate, model, color, location, rating));
    setIsLoading(false);
  }

  useEffect(() => {
    console.log(getBikesData);
    if (getBikesData || userData) {
      setFilteredData(getBikesData)
      setUserData(userData?.id)
    } else {
      setFilteredData([]);
    }
  }, [setFilteredData, getBikesData]);


  const handleFilter = async (e: React.FormEvent) => {
    e.preventDefault();


    try {
      setIsLoading(true)
      await dispatch(Actions.GetUserBikesData(startDate, endDate, model, color, location, rating));
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error, "error")
    }

    // // Filter logic
    // const filtered = filteredData.filter((item: any) => {

    //   const startDateValue = startDate ? new Date(startDate) : null;
    //   console.log('startDateValue', startDateValue);
    //   const endDateValue = endDate ? new Date(endDate) : null;

    //   // Check each criteria
    //   const matchesModel = model ? item.bikeModel.includes(model) : true;
    //   const matchesColor = color ? item.bikeColor.includes(color) : true;
    //   const matchesLocation = location ? item.location.includes(location) : true;
    //   const matchesRating = rating ? item.averageRating === parseInt(rating) : true;

    //   const matchesDate = item.reservationSchedule.every((schedule) => {
    //     const reservedFromDate = new Date(schedule.reservedFromDate);
    //     const reservedToDate = new Date(schedule.reservedToDate);

    //     // Check if the date range in the form does NOT intersect with the available schedule
    //     const isStartOutside = startDateValue
    //       ? startDateValue < reservedFromDate || startDateValue > reservedToDate
    //       : true;

    //     console.log(isStartOutside, 'isStartout data');
    //     const isEndOutside = endDateValue ? endDateValue < reservedFromDate || endDateValue > reservedToDate : true;

    //     const isStartValid = endDateValue ? endDateValue >= new Date() : true;
    //     const isEndValid = endDateValue ? endDateValue >= new Date() : true;

    //     // We want the provided range to be completely outside any reserved ranges
    //     return isStartOutside && isEndOutside && isStartValid && isEndValid;
    //   });

    //   return matchesModel && matchesColor && matchesLocation && matchesRating;
    // });

    // setFilteredData(filtered);
  };



  const handleReserved = async (e:React.FormEvent) => {

    e.preventDefault();

    if (startDate === '' || endDate === '') {
      return
    }
    setIsLoading(false);

    try {
      setIsLoading(true);

      let response: string | void;

      setIsLoading(true);
      response = await dispatch(Actions.ReservedBikeData(Id, startDate, endDate, access_token));


      if (response) throw response;

      setIsLoading(false);
      toast.success('Reserved Bike Successfully');
      setError('');
      setModel('');
      setColor('');
      setLocation('');
      setId('');

      //call get user function inside this
    } catch (error) {
      setIsLoading(false);
      if (typeof error === 'string') {
        setError(error);
      } else {
        setError('Something went wrong, please try again later');
      }
    }

  }

  return (
    <>
      <div className="flex justify-between p-10 ">
        <div className="filer grid justify-items-center  sticky top-10 scroll-smooth duration-700 h-full">
          <form onSubmit={handleFilter} className='w-80 h-fit p-6 bg-[white] border-["2px border-solid red"]'>
            <h2>Filter</h2>
            <div className="  space-y-3 p-4">
              <label htmlFor="StartDate">Start Date</label>
              <br />
              <TextField
                type="datetime-local"
                id="StartDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                variant="standard"
              />
              <br />
              <label htmlFor="EndDate">End Date</label>
              <br />
              <TextField
                type="datetime-local"
                id="EndDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                variant="standard"
              />
              <br />
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
              <TextField
                type="number"
                id="Rating"
                label="Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                variant="outlined"
              />

              {
                IsLoading ? (<CircularProgress />) : (
                  <button type="submit" className="p-3 w-full bg-[#a1a2] text-[#ffff]">
                    Filter
                  </button>
                )
              }
            </div>
          </form>
        </div>

        <div className="apidata">
          <div>
            {openBox && (
              <Modal
                open={openBox}
                onClose={() => {
                  setOpenBox(false);
                }}
              >
                <Box sx={style}>
                  <div>
                    <form action="" onSubmit={handleReserved} className="space-y-6 p-6">
                      <h1>{model}</h1>
                      <br />
                      <label htmlFor="StartDate">Reserve Start Date</label>
                      <br />
                      <TextField
                        type="datetime-local"
                        id="StartDate"
                        value={startDate}

                        variant="standard"
                        InputProps={{ readOnly: true }}
                      />
                      <br />
                      <br />
                      <label htmlFor="EndDate">Reserve End Date</label>
                      <br />
                      <br />
                      <TextField
                        type="datetime-local"
                        id="EndDate"
                        value={endDate}

                        variant="standard"
                        InputProps={{ readOnly: true }}
                      />
                      <br />

                      {
                        IsLoading ? (
                          <CircularProgress />
                        ) : (
                          <button type='submit' className="bg-[blue] px-4 py-2 text-[white]">Reserved</button>

                        )
                      }

                      <p>{Error}</p>

                    </form>
                  </div>
                </Box>
              </Modal>
            )}
          </div>

          {
            IsLoading ? (<div className='w-96 h-full grid justify-items-start  '>
              <CircularProgress />
            </div>) : (<div className="grid grid-cols-3 gap-6">
              {filteredData?.length === 0 ? (
                <p className="text-2xl text-[red] text-center">No bikes available matching the filter criteria.</p>
              ) : (
                filteredData?.map((item: any) => (
                  <section key={item.id} className="space-y-2 p-4" style={{ border: '2px solid red' }}>
                    <h1>{item.bikeModel}</h1>
                    <p>{item.location}</p>
                    <p>{item.bikeColor}</p>

                    <Rating
                      name="read-only"
                      value={item.averageRating}
                      readOnly
                      precision={1}
                      emptyIcon={<StarBorderIcon style={{ color: '#d3d3d3' }} />}
                      icon={<StarIcon style={{ color: '#ffd700' }} />}
                    />

                    <div>
                      <button
                        className="px-4 py-3 bg-[blue] text-[white]"
                        onClick={() => {
                          setOpenBox(true);
                          setId(item.id);
                        }}
                      >
                        Reserved
                      </button>
                    </div>
                  </section>
                ))
              )}
            </div>)
          }
        </div>
      </div>
    </>
  );
};

export default UserData;
