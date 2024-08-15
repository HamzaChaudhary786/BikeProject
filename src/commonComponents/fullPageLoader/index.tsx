'use client';
import React from 'react';
import { ASSETS } from '../../constants';
import { CircularProgress } from '@mui/material';

const favIcon = ASSETS.logo;

const FullPageLoader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-DARK_BACKGROUND_COLOR_MAIN">
      <div
        style={{
          animation: 'spin 1s linear infinite',
        }}
      >
        <CircularProgress />
      </div>
    </div>
  );
};

export default FullPageLoader;
