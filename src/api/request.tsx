import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.kp.itmd.kz/',
  timeout: 1000 ,
  headers: {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*'
  },
});
