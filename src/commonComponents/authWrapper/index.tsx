'use client';
import React, { useEffect, useState } from 'react';
import { useEnhancedDispatch, useEnhancedSelector } from '../../Helpers/reduxHooks';
// Assuming you're using react-router-dom for navigation
import FullPageLoader from '../fullPageLoader';
import Navbar from '../navbar';
import LoginPage from '../../components/login';
import * as Actions from '../../store/actions';
import * as ReducerActions from '../../store/reducers/';
import { usePathname, useRouter } from 'next/navigation';

const AuthWrapper: React.FC<{ children: React.ReactNode; hideNav?: boolean; allowedRoles?: string[] }> = (props) => {
  const dispatch = useEnhancedDispatch();
  const location = usePathname();
  const router = useRouter();
  const isAuth = useEnhancedSelector((state) => state.user.isAuth);
  const userData = useEnhancedSelector((state) => state.user.userData);
  // const userRole = useEnhancedSelector((state) => state.user.role); // assuming `role` is part of user data in the Redux store
  // const userRole = 'user';

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
      getUserData();
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);
  const [isLoading, setIsLoading] = useState(!isAuth);
  useEffect(() => {
    if (!isLoading && isAuth && userData?.type && location) {
      setIsLoading(true);

      const userType = userData.type.toLowerCase();

      if (userType === 'manager') {
        if (location === '/reservation') {
          setIsLoading(true);
          router.push('/manager');
        } else if (location === '/my-reservation') {
          setIsLoading(true);
          router.push('/manager');
        } else {
          setIsLoading(false);
        }
      } else if (userType === 'user') {
        if (location === '/manager') {
          router.push('/reservation');
        } else if (location === '/users') {
          router.push('/manager');
        } else {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }
  }, [isLoading, isAuth, userData, location, router]);

  async function getUserData() {
    if (userData) return;
    // Fetch user data and update the loading state
    await dispatch(Actions.getUserDataAction(true));
    setIsLoading(false);
  }

  if (isLoading) return <FullPageLoader />;

  if (!isAuth) {
    return <LoginPage />;
  }

  // Check if the user's role is allowed to access the current page
  // if (isAuth && userRole) {
  //   const restrictedPath = location.startsWith('/manager') && userRole === 'user';
  //   const userRestrictedPath = location.startsWith('/user') && userRole === 'manager';

  //   if (restrictedPath || userRestrictedPath) {
  //     // Redirect based on role
  //     return <Link href={userRole === 'user' ? '/users' : '/manager'} replace />;
  //   }
  // }

  return (
    <>
      {!props.hideNav && <Navbar />}
      <div style={{ paddingLeft: '5%', paddingRight: '5%' }}>{props.children}</div>
    </>
  );
};

export default AuthWrapper;
