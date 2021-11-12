// import axios from 'axios';
// import Cookies from 'js-cookie';

// const ApiRequest = () => {
//   const CancelToken = axios.CancelToken;
//   const source = CancelToken.source();
//   const axiosInstance = axios.create({
//     baseURL: 'https://api.kp.itmd.kz/',
//     timeout: 1000 ,
//     headers: {
//       'Content-Type':'application/json',
//       'Access-Control-Allow-Origin': '*',
//       Authorization: `${Cookies.get('auth_user_token')}`,
//     },
//     cancelToken: source.token,
//   });

//   return axiosInstance;
// };

// export default ApiRequest;
import axios from 'axios';
import Cookies from 'js-cookie';

export default axios.create({
  baseURL: 'https://api.kp.itmd.kz/',
  // baseURL: 'http://localhost:8080/',
  timeout: 1000 ,
  headers: {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `${Cookies.get('auth_user_token')}`,
  },
});