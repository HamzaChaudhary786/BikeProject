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
  id: string;
}

export interface AuthSuccessResponse {
  accessToken: string;
  refreshToken: string;
}
