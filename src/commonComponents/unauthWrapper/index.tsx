'use client';
import React, { useEffect, useState } from 'react';
import { useEnhancedDispatch, useEnhancedSelector } from '../../Helpers/reduxHooks';
import FullPageLoader from '../fullPageLoader';
import * as Actions from '../../store/actions';
import Navbar from '../navbar';
import LoginPage from '../../components/login';
import { useRouter } from 'next/navigation';
import * as ReducerActions from '../../store/reducers/';

const UnauthWrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  const dispatch = useEnhancedDispatch();
  const router = useRouter();

  const isAuth = useEnhancedSelector((state) => state.user.isAuth);
  const userRole = 'manager';
  const [IsLoading, setIsLoading] = useState(!isAuth);

  useEffect(() => {
    const accessToken = localStorage.getItem('@access-token');
    const refreshToken = localStorage.getItem('@refresh-token');

    if (accessToken && refreshToken) {
      // Dispatch the tokens to the store
      dispatch(
        ReducerActions.setTokens({
          accessToken: accessToken,
          refreshToken: refreshToken,
        }),
      );
      if (isAuth) {
        router.push('/reservation');
      } else {
        router.push('/');
      }

      getuserData();
    } else {
      setIsLoading(false);
    }
  }, [dispatch, router]);

  useEffect(() => {
    const accessToken = localStorage.getItem('@access-token');
    const refreshToken = localStorage.getItem('@refresh-token');
    if (!IsLoading) {
      if (accessToken && refreshToken) {
        if (isAuth && userRole) {
          if (userRole === 'manager') {
            router.push('/manager');
          } else {
            router.push('/reservation');
          }
        }
      }
    }
  }, [IsLoading]);

  useEffect(() => {
    if (!!localStorage.getItem('@access-token')) {
      getuserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  async function getuserData() {
    // await dispatch(Actions.getUserDataAction(true));
    setIsLoading(false);
  }

  if (IsLoading) return <FullPageLoader />;

  if (!isAuth) {
    return <div>{props.children}</div>;
  }

  if (isAuth) return <FullPageLoader />;

  return <></>;
};

export default UnauthWrapper;
