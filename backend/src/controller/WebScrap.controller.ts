import { Request, Response } from 'express';
import searchProducts from '../utils/webScrap'
import RequestScrapService from '../service/RequestScrap.service';
import { json } from 'sequelize';

export default class WebScrapController {
  private Service: RequestScrapService;

  constructor(ScrapService: RequestScrapService = new RequestScrapService()) {
    this.Service = ScrapService;
  }

  public getWebScrap = async (req: Request, res: Response) => {
    const { searchTerm, category, platform } = req.body;
    const scrap = await searchProducts(searchTerm, category, platform);

    const response = await this.Service.insertWebScrap(req.body, scrap)
    Array.isArray(response) && response.length > 0 
    ? res.status(200).json(response[0]) : res.status(200).json([])
  };

}