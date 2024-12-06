import api from './api';

export const fetchOwners = async () => {
  try {
    const response = await api.get('/owners');
    return response.data;
  } catch (error) {
    console.error("Error fetching owners", error);
    throw error;
  }
}

export const updateOwner = async (ownerId, ownerData) => {
  try {
    const response = await api.put(`/owners/${ownerId}`, ownerData);
    return response;
  } catch (error) {
    console.error("Error updating owner", error);
  }
}

export const deleteOwner = async (ownerId) => {
  try {
    const response = await api.delete(`/owners/${ownerId}`);
    return response;
  } catch (error) {
    console.error("Error deleting owner", error);
    throw error;
  }
}

export const createOwner = async (ownerData) => {
  try {
    const response = await api.post(`/owners`, ownerData);
    return response.data;
  } catch (error) {
    console.error("Error creating owner", error);
    throw error;
  }
}
