'use client';

import { useParams } from 'next/navigation';
import React from 'react';
import { reservationUserTable } from '../../Helpers/ReservationUserDummyData';
import { useEnhancedSelector } from '../../Helpers/reduxHooks';

const ReservationTable = () => {
  const { id } = useParams<{ id: string }>();
  const bikeData = useEnhancedSelector((state) => state.user.bikeData);

  const singleReserveData = bikeData?.filter((item: any) => item.id === id);

  console.log(singleReserveData, 'sindle data');

  return (
    <>
      <div>
        <div className="my-16 px-10">
          {singleReserveData &&
            singleReserveData.map((item: any) => {
              return (
                <>
                  <div className=" grid gap-y-8">
                    <section className="flex gap-x-8">
                      <h1>
                        Bike Color : <span className="text-red-500 text-2xl">{item.bikeColor}</span>
                      </h1>
                      <h1>
                        Model: <span className="text-red-500 text-2xl">{item.bikeModel}</span>
                      </h1>
                    </section>
                    <table className="reservation-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Types</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.reservations.map((reserve: any) => (
                          <tr key={reserve.id}>
                            <td>{reserve.name}</td>
                            <td>{reserve.email}</td>
                            <td>{reserve.type}</td>
                            <td>{reserve.startDate}</td>
                            <td>{reserve.endDate}</td>
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
function useSelector(arg0: (state: any) => any) {
  throw new Error('Function not implemented.');
}
