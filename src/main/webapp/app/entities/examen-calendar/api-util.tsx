// apiUtils.js
import axios from 'axios';

const BASE_URL = '/api/examen/';

const makeRequest = async (method, endpoint, data?) => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      data,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export { makeRequest };
