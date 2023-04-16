import { Request, Response, NextFunction } from 'express';
import searchProducts from '../utils/webScrap'
import RequestScrapService from '../service/RequestScrap.service';
import IProduct from '../interface/IProduct';
import RequestScrap from '../database/models/RequestScraps';

export default class WebScrapController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private Service: RequestScrapService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.Service = new RequestScrapService();
  }

  public getWebScrap = async () => {
    const { searchTerm, category, platform } = this.req.body;
    const scrap: IProduct[] = await searchProducts(searchTerm, category, platform);

    const response: RequestScrap[] = await this.Service.insertWebScrap(this.req.body, scrap)
    Array.isArray(response) && response.length > 0
      ? this.res.status(200).json(response[0]) : this.res.status(200).json([])
  };

  public getAllWebScrap = async () => {
    const { searchTerm, category } = this.req.body;
    const response: RequestScrap[] = await this.Service.getAllScraps({ searchTerm, category })
    Array.isArray(response) && response.length > 0
      ? this.res.status(200).json(response[0]) : this.res.status(200).json([])
  }
}