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
  const userData = useEnhancedSelector((state) => state.user.userData);
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

  console.log('rating Value', ratings);

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
  };

  return (
    <>
      <div>
        <h1 className=" text-2xl font-bold my-12">MyReservation</h1>

        <div>
          <table className="reservation-table">
            <thead>
              <tr>
                <th>Bike Model</th>
                <th>Bike Color</th>
                <th>Bike Location</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData?.previousReservations?.map((reservation: any, index: any) => {
                const startDate = new Date(reservation.startDate);
                const endDate = new Date(reservation.endDate);
                const isInRange =
                  (startDate <= currentDate && endDate >= currentDate) ||
                  startDate > currentDate ||
                  endDate > currentDate;

                return (
                  <tr key={reservation.id}>
                    <td>{reservation.bikeModel}</td>
                    <td>{reservation.bikeColor}</td>
                    <td>{reservation.location}</td>
                    <td>{startDate.toLocaleDateString()}</td>
                    <td>{endDate.toLocaleDateString()}</td>
                    <td>
                      {isInRange ? (
                        <IconButton onClick={() => handleDeleteReservedBike(reservation.id)}>
                          <Delete className="delete-icon" />
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
        </div>
      </div>
    </>
  );
};

export default MyReservation;
