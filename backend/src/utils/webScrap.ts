import axios from 'axios';
import * as cheerio from 'cheerio';

interface Product {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  link: string;
}

function parseMercadoLivre(html: string, category: string): Product[] {
  const $ = cheerio.load(html);
  const products: Product[] = [];

  $('#root-app > div > div.ui-search-main.ui-search-main--only-products.ui-search-main--with-topkeywords.shops__search-main > section > ol >').each((_, element) => {
    const titleElem = $(element).find('h2.ui-search-item__title');
    const priceTextElem = $(element).find('span.price-tag-fraction').first();
    const descriptionElem = $(element).find('span.ui-search-item__variations-text');
    const imageElem = $(element).find('img.ui-search-result-image__element');
    const linkElem = $(element).find('a.ui-search-link');

    try {
      const title = titleElem.text();
      const price = parseFloat(priceTextElem.text().replace(/\.|,/g, match => match === '.' ? '' : '.'));
      const description = descriptionElem.text() || '';
      const image = imageElem.attr('data-src') || '';
      const link = linkElem.attr('href') || '';
      
      products.push({ title, price, description, image, category, link });
    } catch (error) {
      console.error('Error parsing product:', error);
    }
  });

  return products;
}

function parseBuscape(html: string, category: string): Product[] {
  const $ = cheerio.load(html);
  const products: Product[] = [];

  $('article.card-product').each((_, element) => {
    try {
      const title = $(element).find('div.product-info > a.product-title').text();
      const priceText = $(element).find('span.mainValue').text();
      const price = parseFloat(priceText.replace('.', '').replace(',', '.'));
      const description = $(element).find('div.product-description').text() || '';
      const image = $(element).find('img.product-image').attr('src') || '';

      products.push({
        title, price, description, image, category,
        link: ''
      });
    } catch (error) {
      console.error('Error parsing product:', error);
    }
  });

  return products;
}

export default async function searchProducts(searchTerm: string, category: string, web: string): Promise<Product[]> {

  let mercadoLivreUrl = `https://lista.mercadolivre.com.br/${searchTerm}`;
  let buscapeUrl = `https://www.buscape.com.br/search?q=${searchTerm}`;

  if(category){
    mercadoLivreUrl = `https://lista.mercadolivre.com.br/${category}/${searchTerm}`;
    buscapeUrl = `https://www.buscape.com.br/${category}/${searchTerm}`;
  }


  const [mercadoLivreResponse, buscapeResponse] = await Promise.all([
    axios.get(mercadoLivreUrl),
    axios.get(buscapeUrl),
  ]);

  const mercadoLivreProducts = parseMercadoLivre(mercadoLivreResponse.data, category);
  const buscapeProducts = parseBuscape(buscapeResponse.data, category);
  
  if(web === 'Mercado Livre') {
    return [...mercadoLivreProducts]
  }
  
  if(web === 'Buscapé'){
    return [...buscapeProducts]
  }

  return [...mercadoLivreProducts, ...buscapeProducts];
}