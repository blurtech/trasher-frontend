import { IForm } from './IForm';

export interface IUser extends IForm {
  id?: string;
  username?: string;
  password?: string;
  experience?: {
    currentexp: number;
    level: number;
  };
  address?: {
    city?: string;
    region?: string;
    street?: string;
  };
  role?: string;
  token?: string;
}
