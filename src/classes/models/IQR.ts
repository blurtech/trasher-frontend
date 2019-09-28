import { IForm } from './IForm';

export interface IQR extends IForm {
  id?: string;
  version?: number;
  count?: number;
  tag?: string;
  expired?: boolean;
}
