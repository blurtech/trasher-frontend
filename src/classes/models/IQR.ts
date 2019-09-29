import { IForm } from './IForm';

export interface IQR extends IForm {
  id?: string
  count?: number
  tag?: string
  expired?: boolean
}
