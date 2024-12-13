import api from './api';
import { saveAs } from 'file-saver';


// Fetch all manuals with their associated details and files.
export const fetchManuals = async () => {
  try {
    const response = await api.get('/manuals');
    return response.data;
  } catch (error) {
    console.error("Error fetching manuals:", error.message);
    throw new Error("Failed to fetch manuals. Please try again later.");
  }
};

// Update a manual, including updating its PDF file if provided.
export const updateManual = async (manualId, formData) => {
  try {
    //const formData = createFormData(manualData);

    const response = await api.put(`/manuals/${manualId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating manual:", error.message);
    throw new Error("Failed to update manual. Please check the data and try again.");
  }
};

// Delete a manual and its associated PDF file.
export const deleteManual = async (manualId) => {
  try {
    const response = await api.delete(`/manuals/${manualId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting manual:", error.message);
    throw new Error("Failed to delete manual. Please try again later.");
  }
};

//Create a new manual with an associated PDF file.
export const createManual = async (formData) => {
  try {
    
    console.log("Service createManual")
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    
    const response = await api.post(`/manuals`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating manual:", error.message);
    throw new Error("Failed to create manual. Please ensure all fields are correct and try again.");
  }
  
};


export const downloadManual = async (manualId) => {
  try {
    console.log("Attempting to download manual with ID:", manualId);
    const response = await api.get(`/manuals/${manualId}/file`, {
      responseType: 'blob', // Ensures the response is treated as a binary file
    });

    console.log("Response received:", response);

    // Debug content disposition header
    const contentDisposition = response.headers['content-disposition'];
    console.log("Content-Disposition header:", contentDisposition);

    // Debug the Blob content
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    console.log("Created blob:", blob);

    return blob;
  } catch (error) {
    console.error("Error downloading manual:", error.message);
    throw new Error("Failed to download manual. Please try again later.");
  }
};

export const saveManualToFile = (blob, fileName) => {
  try {
    console.log("Saving file with filename:", fileName);
    saveAs(blob, fileName);
  } catch (error) {
    console.error("Error saving the file:", error.message);
  }
};