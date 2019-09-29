import { IForm } from './IForm';

export interface IUser extends IForm {
  id?: string
  username?: string
  password?: string
  experience?: {
    currentexp?: number
    level?: number
  };
  address?: {
    city?: string
    region?: string
    street?: string
    latitude?: number
    longitude?: number
  };
  role?: string
  token?: string
  bags?: number
  points?: number
}
