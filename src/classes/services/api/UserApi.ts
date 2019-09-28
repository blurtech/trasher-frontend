import axios, { AxiosResponse } from 'axios';
import { IUser } from '../../models/IUser';

const url = 'https://dev.api.trasher.blur.tech/user/';

export interface IUserFetch {
  user: IUser;
  token: string;
}

export const register = async (
  user: IUser
): Promise<AxiosResponse<IUserFetch>> => {
  user.role = 'admin';
  const result = await axios.post(url + `register`, user);
  return result.data;
};

export const auth = async (user: IUser): Promise<AxiosResponse<IUserFetch>> => {
  const result = await axios.post(url, user);
  return result.data;
};
