import Cookies from 'js-cookie';

export const cookieSetToken = async (key: string, value: string) => {
  await Cookies.set(key, value);
};