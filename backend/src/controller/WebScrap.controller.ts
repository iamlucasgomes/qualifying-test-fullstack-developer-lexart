import { Request, Response } from 'express';
import searchProducts from '../utils/webScrap'
import RequestScrapService from '../service/RequestScrap.service';

export default class WebScrapController {
  private Service: RequestScrapService;

  constructor(ScrapService: RequestScrapService = new RequestScrapService()) {
    this.Service = ScrapService;
  }

  public getWebScrap = async (req: Request, res: Response) => {
    const { searchTerm, category, platform } = req.body;
    const response = await searchProducts(searchTerm, category, platform);
    
    await this.Service.insertWebScrap(req.body, response)

    res.status(200).json(response);
  };

}