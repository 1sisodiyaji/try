import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

export const summarizeText = async (text) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/summarize`, { text });
    return response.data;
  } catch (error) {
    console.error('Error fetching summary:', error);
    throw error;
  }
};
