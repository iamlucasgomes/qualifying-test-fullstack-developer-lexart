import { ModelStatic } from 'sequelize';
import RequestScrap from '../database/models/RequestScraps';
import Adverts from '../database/models/Adverts';
import IWebScrap from '../interface/IWebScrap';
import IAdvert from '../interface/IAdvert';
import IResponse from '../interface/IResponse';

export default class RequestScrapService {
  protected requestScrapModel: ModelStatic<RequestScrap> = RequestScrap;
  protected advertModel: ModelStatic<Adverts> = Adverts;

   private async getScraps(request: IWebScrap): Promise<RequestScrap | null> {
    const { searchTerm, category, platform } = request;
    const result = await this.requestScrapModel.findOne({ where: { searchTerm, platform, category } });
    return result;
  }

  private insertAdvert(advert: IAdvert): Promise<Adverts> {
    const { title, requestId, description, price, image, link } = advert;

    return this.advertModel
      .create({
        title,
        requestId,
        description,
        price,
        image,
        link
      });
  }

  private insertScrap(request: IWebScrap): Promise<RequestScrap> {
    const { searchTerm, category, platform } = request;

    return this.requestScrapModel
      .create({
        searchTerm,
        category,
        platform
      });
  }

  public async insertWebScrap(request: IWebScrap, advert: IAdvert[]): Promise<IWebScrap | IAdvert | IResponse> {
    const { searchTerm, category, platform } = request;
    const [{ title, description, price, image, link }] = advert;
    console.log('vou validar')
    const checkIfItHasAlreadyBeenRequested = await this.getScraps({ searchTerm, category, platform })
    console.log('validei')
    if (!checkIfItHasAlreadyBeenRequested) {
      console.log('entrei no if')
      await this.insertScrap({ searchTerm, category, platform })
      const find = await this.getScraps({ searchTerm, category, platform })
      advert.map(async ({ title, description, price, image, link }) => {
        await this.insertAdvert({
          title,
          requestId: find?.dataValues.id,
          description,
          price,
          image,
          link })
      })

      console.log('terminei de inserir no banco');
    }

    return { status: 'ok', message: 'ok' }
  }

}