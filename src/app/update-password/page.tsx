'use client';

import React from 'react';
import UnauthWrapper from '../../commonComponents/unauthWrapper';
import UpdatePasswordComponent from '../../components/updatepassword/index';
const page = () => {
  return (
    <>
      <UnauthWrapper>
        <UpdatePasswordComponent />
      </UnauthWrapper>
    </>
  );
};

export default page;
