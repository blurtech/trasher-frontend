import { IFetch } from '../models/IFetch';
import { ILitterStorage } from '../models/ILitterStorage';
import { fetchLitterStoragesByCity } from './api/LitterStorageApi';
import { appUpdateState, getState } from '../../store';

class LitterStorageStoreService {
  public getLitterStoragesByCity = async (
    city: string
  ): Promise<IFetch<ILitterStorage>> => {
    const state = getState().litterStorages;
    let result: any;
    if (state.length > 0) {
      result = {
        items: state,
        total: state.length,
      };
    } else result = await fetchLitterStoragesByCity(city);
    appUpdateState(s => {
      s.litterStorages = result.items;
    });
    return result;
  };
}

export default new LitterStorageStoreService();
