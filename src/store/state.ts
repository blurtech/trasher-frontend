import { IUser } from '../classes/models/IUser';
import { ILitterStorage } from '../classes/models/ILitterStorage';
import { ILitterType } from '../classes/models/ILitterType';

export const initialState = {
  currentUser: {},
  litterStorages: [],
  litterTypes: [],
  cities: [],
};

export interface IState {
  currentUser: IUser;
  litterStorages: ILitterStorage[];
  litterTypes: ILitterType[];
  cities: string[];
}

export interface IAppState {
  app: IState;
}
