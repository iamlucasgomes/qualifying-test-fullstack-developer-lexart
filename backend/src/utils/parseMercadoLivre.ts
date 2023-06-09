import * as cheerio from 'cheerio';
import IProduct from "../interface/IProduct";
import { descriptionClass, imageClass, linkClass, mainClass, meta, priceClass, titleClass } from './constants/consMercadoLivre'

export default function parseMercadoLivre(html: string, category: string): IProduct[] {

  const $ = cheerio.load(html);
  const products: IProduct[] = [];
  $(mainClass).each((_, element) => {

    const el = $(element);
    const titleElem = el.find(titleClass);
    const priceTextElem = el.find(priceClass).first();
    const descriptionElem = el.find(descriptionClass);
    const imageElem = el.find(imageClass);
    const linkElem = el.find(linkClass);

    try {
      const title: string = titleElem.text();
      const price: number = parseFloat(priceTextElem.text().replace(/\.|,/g, match => match === '.' ? '' : '.'));
      const description: string = descriptionElem.text() || '';
      const image: string = imageElem.attr('data-src') || '';
      const link: string = linkElem.attr('href') || '';
      const platform: string = meta;

      products.push({ title, price, description, image, category, link, platform });
    } catch (error) {
      console.error('Error parsing product:', error);
    }
  });

  return products;
}