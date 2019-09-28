import axios from 'axios';
import { ILitterStorage } from '../../models/ILitterStorage';
import { IFetch } from '../../models/IFetch';
import { getState } from '../../../store';

const url = 'https://dev.api.trasher.blur.tech/litterstorage/';

export const fetchLitterStoragesByCity = async (
  city: string
): Promise<IFetch<ILitterStorage>> => {
  const token = getState().currentUser.token;
  const result = await axios.get(`${url}?city=${city}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return {
    items: result.data.data || [],
    total: result.data.data.length || 0,
  };
};
