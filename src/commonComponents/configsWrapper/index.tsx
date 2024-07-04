'use client';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeProvider } from '@mui/material';
import { darkThemeOptions, lightThemeOptions } from '../../theme';
import Head from 'next/head';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from 'react-toastify';
import '../../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';
import { ASSETS } from '../../constants';
import useIsDarkMode from '../../Helpers/useIsDarkMode';
import { useEffect, useState } from 'react';
import Navbar from '../../commonComponents/navbar';
import { useDevice } from '../../Helpers/useDevice';
import FullPageLoader from '../../commonComponents/fullPageLoader';

const favIcon = ASSETS.logo;
const favIconBlack = ASSETS.logo;

export default function ConfigWrapper({ children }: { children: React.ReactNode }) {
  const isDarkMode = useIsDarkMode();
  const devices = useDevice();

  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (devices.IsBigWeb || devices.IsWeb || devices.IsTab || devices.IsMob) {
      setIsLoading(false);
    }
  }, [devices]);

  useEffect(() => {
    if (localStorage) {
      localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    }

    const html = document.querySelector('html');
    if (html) {
      if (isDarkMode) {
        html.classList.add('dark');
        document.body.setAttribute('data-theme', 'dark');
      } else {
        html.classList.remove('dark');
        document.body.removeAttribute('data-theme');
      }
    }
  }, [isDarkMode]);

  return (
    <>
      <link rel="icon" type="image/x-icon" href={isDarkMode ? favIconBlack : favIcon} />
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <ThemeProvider theme={isDarkMode ? darkThemeOptions : lightThemeOptions}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {IsLoading ? <FullPageLoader /> : <>{children}</>}
            </LocalizationProvider>
          </ThemeProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </Provider>
      </I18nextProvider>
    </>
  );
}
