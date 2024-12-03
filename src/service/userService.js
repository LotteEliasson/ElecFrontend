
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

export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user", error);
    throw error;
  }
}

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user", error);
    throw error;
  }
}

export const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user', error);
    throw error;
  }
};