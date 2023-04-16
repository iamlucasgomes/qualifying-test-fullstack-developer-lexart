import { ModelStatic } from 'sequelize';
import RequestScrap from '../database/models/RequestScraps';
import Adverts from '../database/models/Adverts';
import IWebScrap from '../interface/IWebScrap';
import IAdvert from '../interface/IAdvert';

export default class RequestScrapService {
  protected requestScrapModel: ModelStatic<RequestScrap> = RequestScrap;
  protected advertModel: ModelStatic<Adverts> = Adverts;

  private async getScraps(request: IWebScrap): Promise<RequestScrap | null> {
    const { searchTerm, category, platform } = request;
    const result = await this.requestScrapModel.findOne({ where: { searchTerm, platform, category } });
    return result;
  }

  private insertAdvert(advert: IAdvert): Promise<Adverts> {
    const { title, requestId, description, price, image, link, platform } = advert;
    return this.advertModel.create({
      title,
      requestId,
      description,
      price,
      image,
      link,
      platform
    });
  }

  private insertScrap(request: IWebScrap): Promise<RequestScrap> {
    const { searchTerm, category, platform } = request;
    return this.requestScrapModel.create({
      searchTerm,
      category,
      platform
    });
  }

  public async insertWebScrap(request: IWebScrap, adverts: IAdvert[]): Promise<(IWebScrap | IAdvert | RequestScrap)[]> {
    const { searchTerm, category, platform } = request;
    try {
      await this.requestScrapModel.findOrCreate({ where: { searchTerm, platform, category } })
      const checkIfItHasAlreadyBeenRequested = await this.getScraps({ searchTerm, category, platform });
      const promises: Promise<any>[] = [];
      for (const advert of adverts) {
        promises.push(this.insertAdvert({
          title: advert.title,
          requestId: checkIfItHasAlreadyBeenRequested?.dataValues.id,
          description: advert.description,
          price: advert.price,
          image: advert.image,
          link: advert.link,
          platform: advert.platform
        }));
      }
      await Promise.all(promises);
      const result = await this.requestScrapModel.findAll({
        where: { searchTerm, platform, category },
        include: [
          { model: Adverts, attributes: { exclude: ['id', 'requestId'] } },
        ],
      });
      return result.map((item) => item.dataValues.adverts);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
