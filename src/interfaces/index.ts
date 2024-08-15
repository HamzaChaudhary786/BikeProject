import { SetStateAction } from 'react';

export interface GenericData<T> {
  data: T;
}

export interface UserStore {
  email: null | string;
  otpCode: any;
  otp?: null | string;
  isAuth: boolean;
  userData: null | UserData;
  accessToken: null | string;
  refreshToken: null | string;
  bikeData: any;
  allUserData: any;
  getBikesData: any;
  previousReservations: PreviousReservation[];
}

export interface PreviousReservation {
  id: string;
  bikeId: string;
  userId: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  bikeModel: string;
  bikeColor: string;
  location: string;
}

export interface Reservation {
  name: string;
  email: string;
  type: string;
  startDate: string;
  endDate: string;
}

export interface BikeData {
  id: string;
  bikeModel: string;
  bikeColor: string;
  location: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  averageRating: number;
  reservation: Reservation[];
}

export interface Reservation {
  model: string;
  location: string;
  color: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
}

// Define the structure for the user data
export interface UserDataTypes {
  userName: string;
  id: number;
  name: string;
  email: string;
  type: any; // You can restrict this to specific types if needed
  reservation: Reservation[]; // An array of reservations
}

export interface Bike {
  id?: string;
  model?: string;
  color?: string;
  location?: string;
  rating?: string;
  status?: boolean;
  type?: string;
}
export interface FormValues {
  email?: string;
  password?: string;
  rePassword?: string;
  error?: string;
  userName?: string;
  otp?: string;
}

export interface UserData {
  userName: any;
  map: any;
  type: SetStateAction<{}>;
  id: string;
  previousReservations: any;
}

export interface AuthSuccessResponse {
  accessToken: string;
  refreshToken: string;
}

export interface GetUserDataResponse {
  data: UserData;
}
