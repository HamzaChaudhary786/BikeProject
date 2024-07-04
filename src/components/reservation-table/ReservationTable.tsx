'use client';

import { useParams } from 'next/navigation';
import React from 'react';
import { reservationUserTable } from '../../Helpers/ReservationUserDummyData';

const ReservationTable = () => {
  const { id } = useParams<{ id: string }>();

  const singleReserveData = reservationUserTable.filter((item: any) => item.id === parseInt(id));

  return (
    <>
      <div>
        <div>
          {singleReserveData &&
            singleReserveData.map((item) => {
              return (
                <>
                  <div>
                    <section className="flex gap-x-8">
                      <h1>
                        Bike Color : <span className="text-[red] text-2xl">{item.bikeColor}</span>
                      </h1>
                      <h1>
                        Model: <span className="text-[red] text-2xl">{item.bikeModal}</span>
                      </h1>
                    </section>
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                            Types
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                            Start Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                            End Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {item.reservation.map((reserve: any) => (
                          <tr key={reserve.id}>
                            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{reserve.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{reserve.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{reserve.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{reserve.startDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{reserve.endDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              );
            })}
        </div>

        <div></div>
      </div>
    </>
  );
};

export default ReservationTable;
