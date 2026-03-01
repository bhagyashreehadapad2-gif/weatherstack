import axios from 'axios';

const API_KEY = '9dce8151db29057351d1ec571dbf5e3c';
const BASE_URL = 'http://api.weatherstack.com'; // Using http as free/trial keys often don't support https

const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    access_key: API_KEY,
  },
});

export const weatherService = {
  getCurrent: async (query) => {
    try {
      const response = await weatherApi.get('/current', {
        params: { query },
      });
      if (response.data.error) throw new Error(response.data.error.info);
      return response.data;
    } catch (error) {
      console.error('Weatherstack API Error (Current):', error);
      throw error;
    }
  },

  getForecast: async (query, days = 7) => {
    try {
      const response = await weatherApi.get('/forecast', {
        params: { query, forecast_days: days },
      });
      if (response.data.error) throw new Error(response.data.error.info);
      return response.data;
    } catch (error) {
      console.error('Weatherstack API Error (Forecast):', error);
      throw error;
    }
  },

  getHistorical: async (query, date) => {
    try {
      const response = await weatherApi.get('/historical', {
        params: { query, historical_date: date },
      });
      if (response.data.error) throw new Error(response.data.error.info);
      return response.data;
    } catch (error) {
      console.error('Weatherstack API Error (Historical):', error);
      throw error;
    }
  },

  getMarine: async (query) => {
    try {
      // Note: Marine might require a specific plan, adding wrapper for consistency
      const response = await weatherApi.get('/marine', {
        params: { query },
      });
      if (response.data.error) throw new Error(response.data.error.info);
      return response.data;
    } catch (error) {
      console.error('Weatherstack API Error (Marine):', error);
      throw error;
    }
  }
};
