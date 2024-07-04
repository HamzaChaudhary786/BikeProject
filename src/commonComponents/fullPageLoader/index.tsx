'use client';
import React from 'react';
import { ASSETS } from '../../constants';

const favIcon = ASSETS.logo;

const FullPageLoader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-DARK_BACKGROUND_COLOR_MAIN">
      <img
        style={{
          animation: 'spin 1s linear infinite',
        }}
        alt="fav"
        src={favIcon}
        className="h-10"
      />
    </div>
  );
};

export default FullPageLoader;
