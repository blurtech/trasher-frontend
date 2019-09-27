import axios from 'axios';
import { IUser } from '../../models/IUser';
import { IFetch } from '../../models/IFetch';

const url = 'https://dev.api.trasher.blur.tech/user/';

export const register = async (user: IUser): Promise<IFetch<IUser>> => {
  const result = await axios.post(url + `register`, user);
  return {
    items: result.data || [],
    total: result.data.length || 0,
  };
};

export const auth = async (user: IUser): Promise<IFetch<IUser>> => {
    const result = await axios.post(url, user);
    return {
        items: result.data || [],
        total: result.data.length || 0,
    };
};
