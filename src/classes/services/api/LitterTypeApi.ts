import axios from 'axios';
import { ILitterStorage } from '../../models/ILitterStorage';
import { IFetch } from '../../models/IFetch';
import { getState } from '../../../store';
import { ILitterType } from '../../models/ILitterType';

const url = 'https://dev.api.trasher.blur.tech/littertype/';

const getHeader = () => {
  const token = getState().currentUser.token;
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const fetchLitterTypes = async (): Promise<IFetch<ILitterType>> => {
  const result = await axios.get(url, getHeader());
  return {
    items: result.data.data || [],
    total: result.data.data.length || 0,
  };
};
