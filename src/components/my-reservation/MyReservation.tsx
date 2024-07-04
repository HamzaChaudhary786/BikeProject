'use client';

import React, { useState } from 'react';
import { getUserData } from '../../Helpers/GetUserData';
import { Delete } from '@mui/icons-material';
import { IconButton, Rating } from '@mui/material';

const MyReservation = () => {
  return (
    <>
      <div>
        <h1>MyReservation</h1>

        <div>
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                  Bike Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                  Bike Color
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                  Bike Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                  End Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                  Action
                </th>
              </tr>
            </thead>

            {getUserData &&
              getUserData.map((item: any) => {
                return (
                  <>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {item.previousReservations.map((reserve: any) => {
                        const startDate = new Date(reserve.startDate);
                        const endDate = new Date(reserve.endDate);
                        const currentDate = new Date();
                        console.log('startDate endDate currentDate', startDate, endDate, currentDate);
                        const InRange =
                          (startDate <= currentDate && endDate >= currentDate) ||
                          startDate > currentDate ||
                          endDate > currentDate;

                        return (
                          <tr key={reserve.id}>
                            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{reserve.bikeModel}</td>
                            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{reserve.bikeColor}</td>
                            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{reserve.location}</td>
                            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{reserve.startDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{reserve.endDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                              {InRange ? (
                                <IconButton>
                                  <Delete className="text-[red]" />
                                </IconButton>
                              ) : reserve.rating ? (
                                <div>{reserve.rating}</div>
                              ) : (
                                <span>
                                  <Rating />
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </>
                );
              })}
          </table>
        </div>
      </div>
    </>
  );
};

export default MyReservation;
