export const setUserLocal = (token: string) => set(`trasher_user`, token);

export const clearUser = () => remove(`trasher_user`);

export const getUser = () => get(`trasher_user`);

const set = (key: string, value: string) => localStorage.setItem(key, value);

const get = (key: string) => localStorage.getItem(key) || '';

const remove = (key: string) => localStorage.removeItem(key);
