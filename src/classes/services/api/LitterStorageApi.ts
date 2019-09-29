import axios from 'axios';
import { ILitterStorage } from '../../models/ILitterStorage';
import { IFetch } from '../../models/IFetch';
import { getState } from '../../../store';

const url = 'https://dev.api.trasher.blur.tech/litterstorage/';

const getHeader = () => {
  const token = getState().currentUser.token;
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const fetchLitterStoragesByCity = async (
  city: string
): Promise<IFetch<ILitterStorage>> => {
  const result = await axios.get(`${url}?city=${city}`, getHeader());
  return {
    items: result.data.data || [],
    total: result.data.data.length || 0,
  };
};
