import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.kp.itmd.kz/',
  // baseURL: 'http://localhost:8080/',
  timeout: 1000 ,
  headers: {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*'
  },
});
