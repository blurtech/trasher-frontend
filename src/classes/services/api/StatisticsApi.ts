import {IFetch} from "../../models/IFetch";
import axios from "axios";

const url = 'https://dev.api.trasher.blur.tech/statistics/';

export const fetchCities = async (): Promise<IFetch<string>> => {
    const result = await axios.get(`${url}cities`);
    return {
        items: result.data.data || [],
        total: result.data.data.length || 0,
    };
};
