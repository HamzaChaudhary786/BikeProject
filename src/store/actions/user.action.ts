import * as ReducerActions from '../reducers/';
import * as Actions from './';
import { AppThunkPromise } from '../store';
import { apiRequest } from '../../Helpers/apiRequestHandler';
import { AuthSuccessResponse, UserData, GenericData } from '../../interfaces';
import axios from 'axios';
import { API_ENDPOINT } from '../../constants';

export const loginAction = (email: string, password: string): AppThunkPromise<string | void> => {
  return async (dispatch) => {
    try {
      const body = {
        email: email,
        password: password,
      };
      const response = await apiRequest<GenericData<AuthSuccessResponse>>({
        url: '/auth/login',
        method: 'POST',
        data: body,
      });
      dispatch(
        ReducerActions.setTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        }),
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log('error', error);
        return error.message;
      }
    }
  };
};

export const registerAction = (userName: string, email: string, password: string): AppThunkPromise<string | void> => {
  return async (dispatch) => {
    try {
      const body = {
        userName: userName,
        email: email,
        password: password,
      };

      const response = await apiRequest<GenericData<AuthSuccessResponse>>({
        url: '/auth/register',
        method: 'POST',
        data: body,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log('error', error);
        return error.message;
      }
    }
  };
};

export const forgetPasswordAction = (email: string | null): AppThunkPromise<string | void> => {
  return async (dispatch) => {
    try {
      const body = {
        email: email,
      };
      const response = await apiRequest<GenericData<AuthSuccessResponse>>({
        url: '/auth/generate-otp',
        method: 'POST',
        data: body,
      });
      dispatch(
        ReducerActions.setEmail({
          email: email,
        }),
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log('error', error);
        return error.message;
      }
    }
  };
};

export const VerifyOtpAction = (email: string | null, otp: string): AppThunkPromise<string | void> => {
  return async (dispatch) => {
    try {
      const body = {
        email: email,
        otp: otp,
      };
      const response = await apiRequest<GenericData<AuthSuccessResponse>>({
        url: '/auth/verify-otp',
        method: 'POST',
        data: body,
      });
      dispatch(
        ReducerActions.setOtpValue({
          otp: otp,
        }),
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log('error', error);
        return error.message;
      }
    }
  };
};

export const updatePasswordAction = (
  email: null | string,
  otp: null | string,
  password: string,
): AppThunkPromise<string | void> => {
  return async (dispatch) => {
    try {
      const body = {
        email: email,
        otp: otp,
        password: password,
      };
      const response = await apiRequest<GenericData<AuthSuccessResponse>>({
        url: '/auth/reset-password',
        method: 'POST',
        data: body,
      });
      dispatch(
        ReducerActions.setEmail({
          email: email,
        }),
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log('error', error);
        return error.message;
      }
    }
  };
};

export const AddBikeData = (
  model: string,
  color: string,
  location: string,
  access_token: null | string,
): AppThunkPromise<string | void> => {
  return async (dispatch) => {
    try {
      const body = {
        bikeModel: model,
        bikeColor: color,
        location: location,
      };

      const response = await apiRequest<GenericData<AuthSuccessResponse>>({
        url: '/manager/bike',
        method: 'POST',
        data: body,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log('error', error);
        return error.message;
      }
    }
  };
};

export const UpdateBikeData = (
  model: string,
  color: string,
  location: string,
  access_token: null | string,
  Id: string,
): AppThunkPromise<string | void> => {
  return async (dispatch) => {
    try {
      const body = {
        bikeModel: model,
        bikeColor: color,
        location: location,
      };

      const response = await apiRequest<GenericData<AuthSuccessResponse>>({
        url: `/manager/bike/${Id}`,
        method: 'PUT',
        data: body,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log('error', error);
        return error.message;
      }
    }
  };
};

export const DeleteBikeData = (id: string, access_token: null | string): AppThunkPromise<string | void> => {
  return async (dispatch) => {
    try {
      console.log('function id is', id);

      const response = await apiRequest<GenericData<AuthSuccessResponse>>({
        url: `/manager/bike/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log('error', error);
        return error.message;
      }
    }
  };
};

export const GetBikesData = (): AppThunkPromise<string | void> => {
  return async (dispatch) => {
    try {
      const response = await apiRequest<GenericData<AuthSuccessResponse>>({
        url: '/manager/bikes',
        method: 'GET',
      });

      dispatch(ReducerActions.setBikesData(response.data || []));
    } catch (error) {
      if (error instanceof Error) {
        console.log('error', error);
        return error.message;
      }
    }
  };
};
