import axios from 'axios';
import ennv from '../../environment'

const BACKEND: string  = ennv.BACKEND;

const webScrap = axios.create({
  baseURL: BACKEND,
});

export const requestWebScrap = async (searchTerm: string, category: string, platform: string) => {
  const dataset = { searchTerm, category, platform};
  const { data } = await webScrap.post('/webscrap', dataset)
  return data;
};

export const requestAllPlatforms = async (searchTerm: string, category: string) => {
  const dataset = { searchTerm, category};
  const { data } = await webScrap.post('/webscrap/all', dataset)
  return data;
};