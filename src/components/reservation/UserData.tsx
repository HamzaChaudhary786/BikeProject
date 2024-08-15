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

  const getBikesData = useEnhancedSelector((state) => state.user.getBikesData);
  const userData = useEnhancedSelector((state) => state.user.userData);
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
  const [UserData, setUserData] = useState({});
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
    await dispatch(Actions.GetUserBikesData());
    setIsLoading(false);
  }

  useEffect(() => {
    console.log(getBikesData);
    if (getBikesData || userData) {
      setFilteredData(getBikesData);
      setUserData({ id: userData?.id || '' });
    } else {
      setFilteredData([]);
    }
  }, [setFilteredData, getBikesData]);

  const handleFilter = (e: any) => {
    e.preventDefault();

    // Reset to show all data if all filters are cleared
    if (!model && !color && !location && !rating) {
      setFilteredData(getBikesData);
      return;
    }

    // Filter logic
    const filtered = getBikesData.filter((item: any) => {
      // Check each criteria
      const matchesModel = model ? item.bikeModel.toLowerCase().includes(model.toLowerCase()) : true;
      const matchesColor = color ? item.bikeColor.toLowerCase().includes(color.toLowerCase()) : true;
      const matchesLocation = location ? item.location.toLowerCase().includes(location.toLowerCase()) : true;
      const matchesRating = rating ? item.averageRating === parseInt(rating) : true;

      return matchesModel && matchesColor && matchesLocation && matchesRating;
    });

    // Update the filtered data
    setFilteredData(filtered);
  };

  const handleReserved = async (e: any) => {
    e.preventDefault();
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
    } catch (error: any) {
      setIsLoading(false);
      if (typeof error === 'string') {
        setError(error);
      } else {
        setError('Something went wrong, please try again later');
      }
    }
  };

  return (
    <>
      <div className="flex justify-around py-16 ">
        <div className="filer grid justify-items-center  sticky top-10 scroll-smooth duration-700 h-full">
          <form onSubmit={handleFilter} className='w-80 h-fit p-6 bg-[white] border-["2px border-solid red"]'>
            <h2>Filter</h2>
            <div className="  space-y-3 p-4">
              <div>
                <TextField
                  type="datetime-local"
                  id="StartDate"
                  label="Start Date"
                  fullWidth
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  variant="standard"
                />
              </div>
              <br />
              <div>
                <TextField
                  type="datetime-local"
                  id="EndDate"
                  label="End Date"
                  fullWidth
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  variant="standard"
                />
              </div>
              <br />
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
              <TextField
                type="number"
                id="Rating"
                fullWidth
                label="Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                variant="outlined"
              />

              {IsLoading ? (
                <CircularProgress />
              ) : (
                <button type="submit" className="p-3 w-full cursor-pointer">
                  Filter
                </button>
              )}
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
                      <h1 className=" text-2xl font-semibold ">Reserved Bike</h1>
                      <br />
                      <label htmlFor="StartDate">Reserve Start Date</label>
                      <br />
                      <TextField
                        type="datetime-local"
                        id="StartDate"
                        value={startDate}
                        // onChange={(e) => setReserveStartDate(e.target.value)}

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
                        // onChange={(e) => setReserveEndDate(e.target.value)}
                        variant="standard"
                        InputProps={{ readOnly: true }}
                      />
                      <br />

                      {IsLoading ? (
                        <CircularProgress />
                      ) : (
                        <button type="submit" className="bg-[blue] px-4 py-2 text-[white]">
                          Reserved
                        </button>
                      )}
                    </form>
                  </div>
                </Box>
              </Modal>
            )}
          </div>

          <div>
            {IsLoading ? (
              <div className="">
                <CircularProgress />
              </div>
            ) : (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                {filteredData?.length === 0 ? (
                  <p className="text-2xl text-[red] text-center w-fit">
                    No bikes available matching the filter criteria.
                  </p>
                ) : (
                  filteredData?.map((item: any) => (
                    <section
                      key={item.id}
                      className="space-y-2 p-6 bg-gray-800 text-white rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-500 ease-in-out"
                      style={{ border: '2px solid #1e40af', boxShadow: '0 4px 10px rgba(30, 64, 175, 0.5)' }}
                    >
                      <h1 className="text-xl font-bold">{item.bikeModel}</h1>
                      <p className="text-md">{item.location}</p>
                      <p className="text-md">{item.bikeColor}</p>

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
                          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
                          onClick={() => {
                            setOpenBox(true);
                            setId(item.id);
                          }}
                        >
                          Reserve
                        </button>
                      </div>
                    </section>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserData;
