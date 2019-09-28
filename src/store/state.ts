import { IUser } from '../classes/models/IUser';
import { ILitterStorage } from '../classes/models/ILitterStorage';

export const initialState = {
  currentUser: {},
  litterStorages: [],
};

export interface IState {
  currentUser: IUser;
  litterStorages: ILitterStorage[];
}

export interface IAppState {
  app: IState;
}
