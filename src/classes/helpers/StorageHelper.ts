export const setUserLocal = (user: string) => set(`trasher_user`, user);

export const clearUser = () => remove(`trasher_user`);

export const getUser = () => get(`trasher_user`);

const set = (key: string, value: string) => localStorage.setItem(key, value);

const get = (key: string) => localStorage.getItem(key) || '';

const remove = (key: string) => localStorage.removeItem(key);
