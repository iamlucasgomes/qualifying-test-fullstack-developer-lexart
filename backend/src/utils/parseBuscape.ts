import * as cheerio from 'cheerio';
import IProduct from "../interface/IProduct";
import { mainClass, descriptionClass, imageClass, linkClass, meta, priceClass, titleClass } from './constants/consBuscape'

export default function parseBuscape(html: string, category: string): IProduct[] {

  const $ = cheerio.load(html);
  const products: IProduct[] = [];
  const web: string = 'https://www.buscape.com.br';

  $(mainClass).each((_, element) => {

    const el = $(element);

    const titleEl = el.find(titleClass);
    const priceTextEl = el.find(priceClass);
    const descriptionEl = el.find(descriptionClass);
    const imageElem = el.find(imageClass);
    const linkElem = el.find(linkClass);
    const metaSiteName = $(meta);

    try {
      const title: string = titleEl.text();
      const price: number = parseFloat(priceTextEl.text().replace(/^R\$\s*/, '').replace('.', ''));
      const description: string = descriptionEl.text();
      const platform: string = metaSiteName.attr('content') || '';
      const image: string | undefined = imageElem.find('img').attr('src')?.includes('data:')
        ? $(element).find(imageElem).find('noscript')
          .html()
          ?.split(" ")
          .find((e) => e.startsWith("src"))?.split("\"").at(1) : imageElem.find('img').attr('src');

      !linkElem.attr('href')?.includes(web)
        ? products.push({ title, price, description, image, category, link: `${web}${linkElem.attr('href')}`, platform }) :
        products.push({ title, price, description, image, category, link: `${linkElem.attr('href')}`, platform });


    } catch (error) {
      console.error('Error parsing product:', error);
    }
  });

  return products;
}
