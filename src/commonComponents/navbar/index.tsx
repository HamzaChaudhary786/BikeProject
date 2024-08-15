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
    <nav className="py-4 bg-DARK_BACKGROUND_COLOR_MAIN text-[white] text-lg hover:shadow-md hover:shadow-[cyan] duration-300">
      <div className="flex justify-around items-center">
        <div> {userData ? userData.userName : 'User data not available'}</div>
        <div>
          {userData?.type === 'User' ? (
            location === '/reservation' ? (
              <Link href={`/my-reservation`}>
                <button
                  className="mr-3 py-3 px-3 bg-[blue]  cursor-pointer rounded-2xl  text-[white]"
                  style={{ border: '2px solid white' }}
                >
                  My Reservation
                </button>
              </Link>
            ) : (
              <Link href={`/reservation`}>
                <button
                  className="mr-3 py-3 px-3 bg-[blue] cursor-pointer rounded-2xl text-[white]"
                  style={{ border: '2px solid white' }}
                >
                  Reservation
                </button>
              </Link>
            )
          ) : (
            <>
              {location === '/manager' ? (
                <Link href="/users">
                  <button
                    className="mr-3 py-3 px-3 bg-[blue] cursor-pointer rounded-2xl text-[white]"
                    style={{ border: '2px solid white' }}
                  >
                    User
                  </button>
                </Link>
              ) : (
                <Link href="/manager">
                  <button
                    className="mr-3 py-3 px-3 bg-[blue] cursor-pointer rounded-2xl text-[white]"
                    style={{ border: '2px solid white' }}
                  >
                    Bike
                  </button>
                </Link>
              )}
            </>
          )}

          <button
            className="mr-3 py-3 px-3 bg-[blue]  cursor-pointer rounded-2xl text-[white]"
            onClick={() => {
              dispatch(setLogOut());
              router.push('/');
            }}
            style={{ border: '2px solid white' }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
