import { createSlice } from '@reduxjs/toolkit';
import { UserStore } from '../../interfaces';

const initialState: UserStore = {
  isAuth: false,
  userData: null,
  accessToken: null,
  refreshToken: null,
  email: null,
  otpCode: null,
  bikeData: null,
};

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setTokens(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuth = true;

      localStorage.setItem('@access-token', action.payload.accessToken);
      localStorage.setItem('@refresh-token', action.payload.refreshToken);
    },
    setUserData(state, action) {
      state.userData = action.payload.userData;
    },
    setLogOut(state) {
      state.userData = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuth = false;

      localStorage.removeItem('@access-token');
      localStorage.removeItem('@refresh-token');
    },
    setEmail(state, action) {
      state.email = action.payload.email;

      console.log('email is', state.email);
    },
    setOtpValue(state, action) {
      state.otp = action.payload.otp;
    },
    setBikesData(state, action) {
      state.bikeData = action.payload;
    },
  },
});

export const { setUserData, setTokens, setEmail, setBikesData, setOtpValue, setLogOut } = UserSlice.actions;

export const UserReducer = UserSlice.reducer;
