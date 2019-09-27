import { IUser } from '../classes/models/IUser';

export const initialState = {
  currentUser: {},
};

export interface IState {
  currentUser: IUser;
}

export interface IAppState {
  app: IState;
}
