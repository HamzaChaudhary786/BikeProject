'use client';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useEnhancedDispatch, useEnhancedSelector } from '../../Helpers/reduxHooks';
import { useDevice } from '../../Helpers/useDevice';
import Link from 'next/link';
import { setLogOut } from '../../store/reducers';

const Navbar = () => {
  const { IsWeb } = useDevice();
  const dispatch = useEnhancedDispatch();
  const router = useRouter();
  const location = usePathname();
  // const isAuth = useEnhancedSelector((state) => state.user.isAuth);

  const userData = useEnhancedSelector((state) => state.user.userData);


  let isAuth = true;
  if (!isAuth) return <></>;



  return (
    <nav className="py-12 bg-[white] text-[black]">
      <div className="flex justify-around items-center">
        <div> {userData ? userData.userName : 'User data not available'}</div>
        <div>
          {userData?.type === 'User' ? (
            location === "/reservation" ? (
              <Link href={`/my-reservation`}>
                <button className="mr-3 py-3 px-3 bg-[blue]">My Reservation</button>
              </Link>
            ) : (
              <Link href={`/reservation`}>
                <button className="mr-3 py-3 px-3 bg-[blue]">Reservation</button>
              </Link>
            )
          ) : (
            <>
              {location === "/manager" ? (
                <Link href="/users">
                  <button className="mr-3 py-3 px-3 bg-[blue]">User</button>
                </Link>
              ) : (
                <Link href="/manager">
                  <button className="mr-3 py-3 px-3 bg-[blue]">Bike</button>
                </Link>
              )}
            </>
          )}

          <button
            className="mr-3 py-3 px-3 bg-[blue]"
            onClick={() => {
              dispatch(setLogOut());
              router.push('/');
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
