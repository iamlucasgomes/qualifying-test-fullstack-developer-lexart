import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.mercadolibre.com/sites/MLB/',
});

export const requestCategories = async () => {
  const { data } = await api.get('/categories');
  const response = data.map(({name}: {name: string}) => name);
  return response;
};

