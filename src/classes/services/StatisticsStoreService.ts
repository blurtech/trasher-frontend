import {IFetch} from "../models/IFetch";
import {appUpdateState, getState} from "../../store";
import {fetchCities} from "./api/StatisticsApi";

class StatisticsStoreService {
    public getCities = async (): Promise<IFetch<string>> => {
        const state = getState().cities;
        let result: any;
        if (state.length > 0) {
            result = {
                items: state,
                total: state.length,
            };
        } else result = await fetchCities();
        appUpdateState(s => {
            s.cities = result.items;
        });
        return result;
    };

}

export default new StatisticsStoreService()
