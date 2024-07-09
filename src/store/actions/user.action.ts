import * as ReducerActions from '../reducers/';
import * as Actions from './';
import { AppThunkPromise } from '../store';
import { apiRequest } from '../../Helpers/apiRequestHandler';
import { AuthSuccessResponse, UserData, GenericData, GetUserDataResponse } from '../../interfaces';
import axios from 'axios';
import { API_ENDPOINT } from '../../constants';
import { id } from 'date-fns/locale';

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
  model: string, color: string, location: string, access_token: null | string,
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
  model: string, color: string, location: string, access_token: null | string, Id: string,
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


export const AddUserData = (
  userName: string, userEmail: string, userType: string, password: string, access_token: string | null
): AppThunkPromise<string | void> => {
  return async (dispatch) => {
    try {
      const body = {
        userName: userName,
        email: userEmail,
        type: userType,
        password: password
      };

      const response = await apiRequest<GenericData<AuthSuccessResponse>>({
        url: '/manager/user',
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


export const UpdateUserData = (
  userName: string, userEmail: string, userType: string, access_token: string | null, id: string): AppThunkPromise<string | void> => {
  return async (dispatch) => {
    try {
      const body = {
        userName: userName,
        email: userEmail,
        type: userType,
      };

      const response = await apiRequest<GenericData<AuthSuccessResponse>>({
        url: `/manager/user/${id}`,
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


export const GetUserData = (): AppThunkPromise<string | void> => {
  return async (dispatch) => {
    try {

      const response = await apiRequest<GenericData<AuthSuccessResponse>>({
        url: '/manager/users',
        method: 'GET',
      });

      dispatch(ReducerActions.setAllUserData(response.data || []));
    } catch (error) {
      if (error instanceof Error) {
        console.log('error', error);
        return error.message;
      }
    }
  };
};




export const DeleteUserData = (id: string, access_token: null | string): AppThunkPromise<string | void> => {
  return async (dispatch) => {
    try {
      console.log('function id is', id);

      const response = await apiRequest<GenericData<AuthSuccessResponse>>({
        url: `/manager/user/${id}`,
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




export const GetUserBikesData = (): AppThunkPromise<string | void> => {
  return async (dispatch) => {
    try {

      const response = await apiRequest<GenericData<AuthSuccessResponse>>({
        url: '/user/bikes',
        method: 'GET',
      });

      dispatch(ReducerActions.setUserBikesData(response.data || []));
    } catch (error) {
      if (error instanceof Error) {
        console.log('error', error);
        return error.message;
      }
    }
  };
};



export const getUserDataAction = (setTokens = false): AppThunkPromise<string | void> => {
  return async (dispatch, getState) => {
    try {
      const response = await apiRequest<GetUserDataResponse>({
        url: '/user',
        method: 'GET',
      });
      if (setTokens) {
        dispatch(
          ReducerActions.setTokens({
            accessToken: localStorage.getItem('@access-token'),
            refreshToken: localStorage.getItem('@refresh-token'),
          }),
        );
      }
      dispatch(
        ReducerActions.setUserData({
          userData: response.data,
        }),
      );
    } catch (error) {
      dispatch(ReducerActions.setLogOut());
      if (error instanceof Error) {
        console.log('error', error);
        return error.message;
      }
    }
  };
};






export const ReservedBikeData = (
  Id: string, startDate: string, endDate: string, access_token: string | null,
): AppThunkPromise<string | void> => {
  return async (dispatch) => {
    try {
      const body = {
        bikeId: Id,
        startDate: startDate,
        endDate: endDate,
      };

      const response = await apiRequest<GenericData<AuthSuccessResponse>>({
        url: '/user/reserved-bikes',
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





export const DeleteReservedBike = (id: string, access_token: null | string): AppThunkPromise<string | void> => {
  return async (dispatch) => {
    try {


      const response = await apiRequest<GenericData<AuthSuccessResponse>>({
        url: `/user/cancel-reservation/${id}`,
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





export const AddRatingValue = (
  id: string, newRating: any, access_token: string | null,
): AppThunkPromise<string | void> => {
  return async (dispatch) => {
    try {
      const body = {
        reservationId: id,
        rating: newRating,
      };

      const response = await apiRequest<GenericData<AuthSuccessResponse>>({
        url: '/user/rating',
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


export const UpdateBikeStatusData = (
  bikeModel: string, bikeColor: string, location: string, newType: string, access_token: null | string, id: string,
): AppThunkPromise<string | void> => {
  return async (dispatch) => {
    try {
      const body = {
        bikeModel,
        bikeColor,
        location,
        status:newType
      };

      const response = await apiRequest<GenericData<AuthSuccessResponse>>({
        url: `/manager/bike/${id}`,
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