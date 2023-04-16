import axios from 'axios';

const webScrap = axios.create({
  baseURL: 'http://localhost:3001/',
});

export const requestWebScrap = async (searchTerm: string, category: string, platform: string) => {
  const dataset = { searchTerm, category, platform};
  const { data } = await webScrap.post('/webscrap', dataset)
  return data;
};