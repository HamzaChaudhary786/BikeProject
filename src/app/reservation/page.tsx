import React from 'react';
import UserComponent from '../../components/reservation/index';
import AuthWrapper from '../../commonComponents/authWrapper';
const page = () => {
  return (
    <>
      <div>
        <AuthWrapper>
          <UserComponent />
        </AuthWrapper>
      </div>
    </>
  );
};

export default page;
