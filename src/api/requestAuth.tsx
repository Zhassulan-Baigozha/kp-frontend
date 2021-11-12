import axios from 'axios';
import Cookies from 'js-cookie';

export default axios.create({
  baseURL: 'https://api.kp.itmd.kz/',
  timeout: 1000 ,
  headers: {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `${Cookies.get('auth_user_token')}`,
  },
});