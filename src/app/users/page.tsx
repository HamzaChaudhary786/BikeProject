import React from 'react';
import UsersComp from '../../components/users/index';
import AuthWrapper from '../../commonComponents/authWrapper';
const page = () => {
  return (
    <>
      <AuthWrapper>
        <UsersComp />
      </AuthWrapper>
    </>
  );
};

export default page;
