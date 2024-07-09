'use client';

import React, { useEffect, useState } from 'react';
import { getUserData } from '../../Helpers/GetUserData';
import { Delete } from '@mui/icons-material';
import { Box, IconButton, Rating } from '@mui/material';
import { useEnhancedDispatch, useEnhancedSelector } from '../../Helpers/reduxHooks';
import * as Actions from '../../store/actions';
import { toast } from 'react-toastify';

const MyReservation = () => {


  const dispatch = useEnhancedDispatch();
  const access_token = useEnhancedSelector((state) => state.user.accessToken);
  const userData = useEnhancedSelector((state) => state.user.userData)
  const currentDate = new Date();
  // const UserData [] =userData

  const [Error, setError] = useState('');

  useEffect(() => {
    getUserBikeDataValue();
    getUserReservedeData();
  }, []);




  async function getUserReservedeData(load = true) {
    if (load) {
      setIsLoading(true);
    }

    await dispatch(Actions.getUserDataAction());
    setIsLoading(false);
  }

  async function getUserBikeDataValue(load = true) {
    if (load) {
      setIsLoading(true);
    }
    await dispatch(Actions.GetUserBikesData());
    setIsLoading(false);
  }




  const [IsLoading, setIsLoading] = useState(false);


  const [ratings, setRatings] = useState<{ [key: string]: number }>({});



  console.log("rating Value", ratings)

  const handleDeleteReservedBike = async (id: any) => {
    setIsLoading(false);
    try {
      setIsLoading(true);
      const response = await dispatch(Actions.DeleteReservedBike(id, access_token));
      getUserReservedeData();
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



  const handleRating = async (id: any, newRating: number | null) => {

    setIsLoading(false);
    try {
      setIsLoading(true);
      const response = await dispatch(Actions.AddRatingValue(id, newRating, access_token));

      getUserReservedeData();

      if (response) throw response;

      setIsLoading(false);
      toast.success('Rating Add Successfully');

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
      <div>
        <h1>MyReservation</h1>

        <div>
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Bike Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Bike Color</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Bike Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">End Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userData?.previousReservations?.map((reservation: any, index: any) => {
                const startDate = new Date(reservation.startDate);
                const endDate = new Date(reservation.endDate);
                const isInRange =
                  (startDate <= currentDate && endDate >= currentDate) ||
                  startDate > currentDate ||
                  endDate > currentDate;

                return (
                  <tr key={reservation.id}>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{reservation.bikeModel}</td>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{reservation.bikeColor}</td>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{reservation.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{startDate.toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{endDate.toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                      {isInRange ? (
                        <IconButton onClick={() => handleDeleteReservedBike(reservation.id)}>
                          <Delete className="text-[red]" />
                        </IconButton>
                      ) : reservation.rating ? (
                        <div>{reservation.rating}</div>
                      ) : (


                        <Rating
                          name={`user-rating-${reservation.id}`}
                          value={ratings[reservation.id] || 0}
                          onChange={(event, newValue) => {

                            setRatings((prevRatings) => ({
                              ...prevRatings,
                            }));
                            handleRating(reservation.id, newValue);
                          }}
                        />



                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div>

          </div>
        </div>
      </div>
    </>
  );
};

export default MyReservation;
