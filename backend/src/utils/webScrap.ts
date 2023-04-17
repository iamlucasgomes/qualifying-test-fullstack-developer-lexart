import axios from 'axios';
import IProduct from '../interface/IProduct'
import parseBuscape from './parseBuscape';
import parseMercadoLivre from './parseMercadoLivre';
import { endpointBuscape, endpointMercadoLivre, mercadoLivre } from './constants/consSearchProducts';

export default async function searchProducts(searchTerm: string, category: string, web: string): Promise<IProduct[]> {
  const mercadoLivreUrl: string = `${endpointMercadoLivre}${category}-${searchTerm}`;
  const buscapeUrl: string = `${endpointBuscape}${category}/${searchTerm}`;

  let buscapeProducts: IProduct[] = [];
  let mercadoLivreProducts: IProduct[] = [];

  await Promise.all([
    axios.get(mercadoLivreUrl).then(response => {
      mercadoLivreProducts = parseMercadoLivre(response.data, category);
    })
      .catch(error => {
        console.log('Error: ' + error.message);
      }),

    axios.get(buscapeUrl).then(response => {
      buscapeProducts = parseBuscape(response.data, category);
    })
      .catch(error => {
        console.log('Error: ' + error.message);
      }),
  ]);

  return (web === mercadoLivre) ? [...mercadoLivreProducts] : [...buscapeProducts]
}