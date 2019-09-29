import { IForm } from './IForm';
import { ILitterStorage } from './ILitterStorage';
import { IUser } from './IUser';

interface ILitterType {
  bagtype?: number
  bags?: number
  mass?: number
}

export interface ILitter extends IForm {
  id?: string
  client?: IUser;
  storage?: ILitterStorage;
  throwDate?: string;
  types: ILitterType[]
}
