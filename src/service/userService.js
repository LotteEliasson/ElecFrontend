
import api from './api';



export const fetchUsers = async () => {
  try {
    const response = await api.get(`/users`);
    return response.data 
  } catch (error) {
    console.error("Error fetching users", error);
    throw error;
  }
}

export const loginUser = async (email, password) => {
  try {
    const response = await api.post(`/login`, {email, password});
    return response.data;

  } catch (error) {
    console.error("Error login", error);
    throw error;
  }
}

export const userDetails = async () => {
  try {
    const response = await api.get(`/users/me`);
    return response.data;
    
  } catch (error) {
    console.error("Error getting user details ", error);
    throw error;
  }
}

