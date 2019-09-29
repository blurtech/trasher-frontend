import { IUser } from '../classes/models/IUser';
import { ILitterStorage } from '../classes/models/ILitterStorage';
import { ILitterType } from '../classes/models/ILitterType';

export const initialState = {
  currentUser: {},
  litterStorages: [],
  litterTypes: [],
};

export interface IState {
  currentUser: IUser;
  litterStorages: ILitterStorage[];
  litterTypes: ILitterType[];
}

export interface IAppState {
  app: IState;
}
