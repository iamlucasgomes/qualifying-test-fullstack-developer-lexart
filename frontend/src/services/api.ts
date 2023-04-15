import axios from 'axios';

const webScrap = axios.create({
  baseURL: 'http://localhost:3001/',
});

export const requestWebScrap = async (searchTerm: string, category: string, web: string) => {
  const dataset = { searchTerm, category, web};
  const { data } = await webScrap.post('/webscrap', dataset)
  return data;
};