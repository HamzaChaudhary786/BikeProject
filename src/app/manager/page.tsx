import React from 'react';
import ManagerComponent from '../../components/manager/index';
import AuthWrapper from '../../commonComponents/authWrapper';
const page = () => {
  return (
    <>
      <AuthWrapper>
        <ManagerComponent />
      </AuthWrapper>
    </>
  );
};

export default page;
