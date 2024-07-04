'use client';
import React from 'react';
import UnauthWrapper from '../../commonComponents/unauthWrapper';
import EmailVerificationComponent from '../../components/verification/index';

const page = () => {
  return (
    <UnauthWrapper>
      <EmailVerificationComponent />
    </UnauthWrapper>
  );
};

export default page;
