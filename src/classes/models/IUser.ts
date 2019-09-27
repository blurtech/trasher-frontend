import {IForm} from "./IForm";

export interface IUser extends IForm {
    _id?: string
    username?: string
    password?: string
    experience?: {
        currentexp: number
        level: number
    }
    role?: string
    token?: string
}
