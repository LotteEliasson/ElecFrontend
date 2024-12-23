import api from './api';

export const fetchEngines = async () => {
  try {
    const response = await api.get('/engines');
    return response.data;
  } catch (error) {
    console.error("Error fetching engines", error);
    throw error; 
  }
};

export const createEngine = async (engineData) => {
  try {
    const response = await api.post('/engines', engineData);
    return response.data;
  } catch (error) {
    console.error("Error creating engine", error);
    throw error; 
  }
};

export const updateEngine = async (engineId, engineData) => {
  try {
    const response = await api.put(`/engines/${engineId}`, engineData);
    return response.data;
  } catch (error) {
    console.error("Error updating engine", error);
    throw error; // Re-throw error for further handling
  }
};

export const deleteEngine = async (engineId) => {
  try {
    const response = await api.delete(`/engines/${engineId}`);
    return response;
  } catch (error) {
    console.error("Error deleting engine", error);
    throw error; // Re-throw error for further handling
  }
};
