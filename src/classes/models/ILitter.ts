import { IForm } from './IForm';
import { ILitterStorage } from './ILitterStorage';
import { IUser } from './IUser';

export interface ILitter extends IForm {
  id?: string
  client?: IUser;
  storage?: ILitterStorage;
  throwDate?: string;
  types?: {
    1?: {
      bag?: number;
      mass?: number;
    };
    2?: {
      bag?: number;
      mass?: number;
    };
    3?: {
      bag?: number;
      mass?: number;
    };
    4?: {
      bag?: number;
      mass?: number;
    };
    5?: {
      bag?: number;
      mass?: number;
    };
    6?: {
      bag?: number;
      mass?: number;
    };
    7?: {
      bag?: number;
      mass?: number;
    };
    8?: {
      bag?: number;
      mass?: number;
    };
    9?: {
      bag?: number;
      mass?: number;
    };
    10?: {
      bag?: number;
      mass?: number;
    };
    11?: {
      bag?: number;
      mass?: number;
    };
  };
  bags?: {
    paper?: number;
    glass?: number;
    bio?: number;
    plastic?: number;
    nonrecycl?: number;
    carton?: number;
    danger?: number;
  };
}
