import axios from 'axios';

const BASE_URL = '/api/weather'; // Use Vercel proxy

const weatherApi = axios.create({
  baseURL: BASE_URL,
});

// Helper to handle API errors consistently
const handleApiError = (error, context) => {
  if (error.response) {
    // Axios error with response
    const apiError = error.response.data?.error;
    if (apiError) {
      throw new Error(`[${apiError.code}] ${apiError.info}`);
    }
    throw new Error(`HTTP Error: ${error.response.status}`);
  } else if (error.request) {
    // Request was made but no response received
    if (window.location.protocol === 'https:' && BASE_URL.startsWith('http:')) {
      throw new Error('Mixed Content Error: Weatherstack free tier requires HTTP, but site is running on HTTPS. Please check browser security settings or use a local dev server over HTTP.');
    }
    throw new Error('Network Error: No response from Weatherstack server.');
  }
  throw error;
};

export const weatherService = {
  getCurrent: async (query) => {
    try {
      const response = await weatherApi.get('', {
        params: { query, type: 'current' },
      });
      if (response.data.error) {
        const err = response.data.error;
        throw new Error(`[${err.code}] ${err.info}`);
      }
      return response.data;
    } catch (error) {
      console.error('Weatherstack API Error (Current):', error);
      if (error.message.startsWith('[')) throw error;
      handleApiError(error, 'Current');
    }
  },

  getForecast: async (query, days = 7) => {
    try {
      const response = await weatherApi.get('', {
        params: { query, type: 'forecast', forecast_days: days },
      });
      if (response.data.error) {
        const err = response.data.error;
        throw new Error(`[${err.code}] ${err.info}`);
      }
      return response.data;
    } catch (error) {
      console.error('Weatherstack API Error (Forecast):', error);
      if (error.message.startsWith('[')) throw error;
      handleApiError(error, 'Forecast');
    }
  },

  getHistorical: async (query, date) => {
    try {
      const response = await weatherApi.get('', {
        params: { query, type: 'historical', date },
      });
      if (response.data.error) {
        const err = response.data.error;
        throw new Error(`[${err.code}] ${err.info}`);
      }
      return response.data;
    } catch (error) {
      console.error('Weatherstack API Error (Historical):', error);
      if (error.message.startsWith('[')) throw error;
      handleApiError(error, 'Historical');
    }
  },

  getMarine: async (query) => {
    try {
      const response = await weatherApi.get('', {
        params: { query, type: 'marine' },
      });
      if (response.data.error) {
        const err = response.data.error;
        throw new Error(`[${err.code}] ${err.info}`);
      }
      return response.data;
    } catch (error) {
      console.error('Weatherstack API Error (Marine):', error);
      if (error.message.startsWith('[')) throw error;
      handleApiError(error, 'Marine');
    }
  }
};
