
//Axois instance that include the JWT token in the Authorization header.

import axios from "axios";
//local
const API_URL = 'http://localhost:5000/api';

//azure
//const API_URL = `https://electricparts-h8a0e7cec9d8fjb3.northeurope-01.azurewebsites.net/api`;



const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if(token) {
      config.headers['Authorization'] = `Bearer ${token}`; //Token headers
    }
    return config;
  }, 
  (error) => Promise.reject(error)
  );
  
  export default api;

