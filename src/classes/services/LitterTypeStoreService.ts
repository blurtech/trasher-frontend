import { IFetch } from '../models/IFetch';
import { ILitterType } from '../models/ILitterType';
import { fetchLitterTypes } from './api/LitterTypeApi';
import { appUpdateState, getState } from '../../store';

class LitterTypeStoreService {
  public getLitterTypes = async (): Promise<IFetch<ILitterType>> => {
    const state = getState().litterTypes;
    let result: any;
    if (state.length > 0) {
      result = {
        items: state,
        total: state.length,
      };
    } else result = await fetchLitterTypes();
    appUpdateState(s => {
      s.litterTypes = result.items;
    });
    return result;
  };
}

export default new LitterTypeStoreService();
