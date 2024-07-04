import React from 'react';
import MyReservationComp from '../../components/my-reservation/index';
import AuthWrapper from '../../commonComponents/authWrapper';

const page = () => {
  return (
    <>
      <AuthWrapper>
        <MyReservationComp />
      </AuthWrapper>
    </>
  );
};

export default page;
