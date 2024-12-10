import api from './api';

export const fetchComponents = async () => {
  try {
    const response = await api.get('/components');
    return response.data;
  } catch (error) {
    console.error("Error fetching components", error);
    throw error;
  }
};

export const updateComponent = async (componentId, componentData) => {
  try {
    const response = await api.put(`/components/${componentId}`, componentData);
    return response;
  } catch (error) {
    console.error("Error updating component", error);
    throw error;
  }
};

export const deleteComponent = async (componentId) => {
  try {
    const response = await api.delete(`/components/${componentId}`);
    return response;
  } catch (error) {
    console.error("Error deleting component", error);
    throw error;
  }
};

export const createComponent = async (componentData) => {
  try {
    const response = await api.post(`/components`, componentData);
    return response.data;
  } catch (error) {
    console.error("Error creating component", error);
    throw error;
  }
};
