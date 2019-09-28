import { IForm } from './IForm';

export interface ILitterStorage extends IForm {
  id?: string;
  title?: string;
  latlng?: {
    latitude?: number;
    longitude?: number;
  };
  lastCollect?: string;
  place?: {
    city?: string;
    region?: string;
    address?: string;
  };
  containers?: number[];
}
