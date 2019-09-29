import {auth, register} from "./api/UserApi";
import {IUser} from "../models/IUser";
import {setUserLocal} from "../helpers/StorageHelper";
import {appUpdateState} from "../../store";

class UserStoreService {
    public registerUser = async (
        user: IUser
    ): Promise<IUser> => {
        user.role = 'admin';
        const result = await register(user);
        const userResult = {
            ...result.data.user,
            token: result.data.token,
        };
        setUserLocal(JSON.stringify(userResult));
        appUpdateState(s => {
            s.currentUser = userResult;
        });
        return userResult;
    };

    public authUser = async (user: IUser): Promise<IUser> => {
        const result = await auth(user);
        const userResult = {
            ...result.data.user,
            token: result.data.token,
        };
        setUserLocal(JSON.stringify(userResult));
        appUpdateState(s => {
            s.currentUser = userResult;
        });
        return userResult;
    };
}

export default new UserStoreService()
