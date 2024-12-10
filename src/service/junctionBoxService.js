import api from './api';

export const fetchJunctionBoxes = async () => {
  try {
    const response = await api.get('/junction-boxes');
    return response.data;
  } catch (error) {
    console.error("Error fetching junction boxes", error);
    throw error;
  }
};

export const updateJunctionBox = async (junctionBoxId, junctionBoxData) => {
  try {
    const response = await api.put(`/junction-boxes/${junctionBoxId}`, junctionBoxData);
    return response;
  } catch (error) {
    console.error("Error updating junction box", error);
    throw error;
  }
};

export const deleteJunctionBox = async (junctionBoxId) => {
  try {
    const response = await api.delete(`/junction-boxes/${junctionBoxId}`);
    return response;
  } catch (error) {
    console.error("Error deleting junction box", error);
    throw error;
  }
};

export const createJunctionBox = async (junctionBoxData) => {
  try {
    const response = await api.post(`/junction-boxes`, junctionBoxData);
    return response.data;
  } catch (error) {
    console.error("Error creating junction box", error);
    throw error;
  }
};
