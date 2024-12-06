import api from './api';

export const fetchShips = async () => {
  try {
    const response = await api.get('/ships');
    return response.data;
  } catch (error) {
    console.error("Error fetching ships", error);
    throw error;
  }
}

export const updateShip = async (shipId, shipData) => {
  try {
    const response = await api.put(`/ships/${shipId}`, shipData);
    return response;
  } catch (error) {
    console.error("Error updating ship", error)
  }
}

export const deleteShip = async (shipId) => {
  try {
    const response = await api.delete(`/ships/${shipId}`);
    return response;
  } catch (error) {
    console.error("Error deleting ship", error);
    throw error;
  }
}

export const createShip = async (shipData) => {
  try {
    const response = await api.post(`/ships`, shipData)
    return response.data;
  } catch (error) {
    console.error("Error creating ship", error);
    throw error;
  }
}