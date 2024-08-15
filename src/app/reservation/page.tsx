import React from 'react';
import UserComponent from '../../components/reservation/index';
import AuthWrapper from '../../commonComponents/authWrapper';
import Footer from '../../commonComponents/footer/index';
const page = () => {
  return (
    <>
      <div>
        <AuthWrapper>
          <UserComponent />
          <Footer />
        </AuthWrapper>
      </div>
    </>
  );
};

export default page;
