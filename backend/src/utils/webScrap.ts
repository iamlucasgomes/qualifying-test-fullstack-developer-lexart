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
  const web: string = 'https://www.buscape.com.br';

  $('#__next > div.Content_Container__heIrp.container-lg > div > div.col-lg-9 > div.Hits_Wrapper__3q_7P > div.Paper_Paper__HIHv0.Paper_Paper__bordered__iuU_5.Card_Card__LsorJ.Card_Card__clicable__5y__P.SearchCard_ProductCard__1D3ve').each((_, element) => {
    const titleElem = $(element).find('h2.SearchCard_ProductCard_Name__ZaO5o');
    const priceTextElem = $(element).find('p.Text_Text__h_AF6.Text_MobileHeadingS__Zxam2');
    const descriptionElem = $(element).find(' div > a > div.SearchCard_ProductCard_Body__2wM_H > div.Space_Space__43IaB.Space_Space__small__w35wB.Space_Space__vertical__4PBHk.SearchCard_ProductCard_Description__fGXI3 > div > p.Text_Text__h_AF6.Text_MobileLabelXs__ER_cD.Text_MobileLabelSAtLarge__YdYbv.SearchCard_ProductCard_Installment__tFssR');
    const imageElem = $(element).find('div.SearchCard_ProductCard_Image__ffKkn > span > img');
    const linkElem = $(element).find('a.SearchCard_ProductCard_Inner__7JhKb');

    try {
      const title = titleElem.text();
      const price = parseFloat(priceTextElem.text().replace(/^R\$\s*/, '').replace('.', ''));
      const description = descriptionElem.text() || '';
      const image = imageElem.attr('src') || '';
      let linkWeb = linkElem.attr('href') || '';
      let link: string;

      if (!linkWeb.includes(web)) {
        link = `${web}${linkWeb}`
        products.push({ title, price, description, image, category, link });
        return;
      } else {
        link = linkWeb
        products.push({ title, price, description, image, category, link });
        return;
      }

    } catch (error) {
      console.error('Error parsing product:', error);
    }
  });

  return products;
}

export default async function searchProducts(searchTerm: string, category: string, web: string): Promise<Product[]> {

  const mercadoLivreUrl = category ? `https://lista.mercadolivre.com.br/${category}/${searchTerm}`
    : `https://lista.mercadolivre.com.br/${searchTerm}`;
  const buscapeUrl = category ? `https://www.buscape.com.br/${category}/${searchTerm}`
    : `https://www.buscape.com.br/search?q=${searchTerm}`;

  const [mercadoLivreResponse, buscapeResponse] = await Promise.all([
    axios.get(mercadoLivreUrl),
    axios.get(buscapeUrl),
  ]);

  const mercadoLivreProducts = parseMercadoLivre(mercadoLivreResponse.data, category);
  const buscapeProducts = parseBuscape(buscapeResponse.data, category);

  if (web === 'Mercado Livre') {
    return [...mercadoLivreProducts]
  }

  if (web === 'Buscapé') {
    return [...buscapeProducts]
  }

  return [...mercadoLivreProducts, ...buscapeProducts];
}