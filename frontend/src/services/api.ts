import axios from 'axios';
const env = require('../../environment');

const API_URL: string | undefined = env.HOST || 'localhost';

const webScrap = axios.create({
  baseURL: API_URL,
});

export const requestWebScrap = async (searchTerm: string, category: string, platform: string) => {
  const dataset = { searchTerm, category, platform };
  const { data } = await webScrap.post('/webscrap', dataset)
  return data;
};

export const requestAllPlatforms = async (searchTerm: string, category: string) => {
  const dataset = { searchTerm, category };
  const { data } = await webScrap.post('/webscrap/all', dataset)
  return data;
};