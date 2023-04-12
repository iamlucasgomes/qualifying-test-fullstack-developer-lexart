import axios from 'axios';
import cheerio from 'cheerio';

interface Product {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

function parseMercadoLivre(html: string, category: string): Product[] {
  const $ = cheerio.load(html);
  const products: Product[] = [];

  $('li.search-results__item > div > div > div.ui-search-result__content-wrapper').each((_, element) => {
    try {
      const title = $(element).find('h2 > a').text();
      const priceText = $(element).find('span.price-tag-fraction').text();
      const price = parseFloat(priceText.replace('.', '').replace(',', '.'));
      const description = $(element).find('div.ui-search-item__group__element.ui-search-item__description > p').text() || '';
      const image = $(element).find('img.ui-search-layout__image').attr('src') || '';

      products.push({ title, price, description, image, category });
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

      products.push({ title, price, description, image, category });
    } catch (error) {
      console.error('Error parsing product:', error);
    }
  });

  return products;
}

async function searchProducts(searchTerm: string, category: string, web: string): Promise<Product[]> {
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