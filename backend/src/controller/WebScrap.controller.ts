import { Request, Response, NextFunction } from 'express';
import searchProducts from '../utils/webScrap'
import RequestScrapService from '../service/RequestScrap.service';
import IProduct from '../interface/IProduct';
import RequestScrap from '../database/models/RequestScraps';

export default class WebScrapController {
  private Service: RequestScrapService;

  constructor(private req: Request, private res: Response, private next: NextFunction) {
    this.Service = new RequestScrapService();
  }

  private sendResponse(data: any) {
    const response = Array.isArray(data) && data.length > 0 ? data.at(0) : [];
    this.res.status(200).json(response);
  }

  public getWebScrap = async () => {
    try {
      const { searchTerm, category, platform } = this.req.body;
      const existingScrap = await this.Service.getAllScraps({ searchTerm, category, platform });
    
      if (existingScrap.length === 0) {
        const scrap: IProduct[] = await searchProducts(searchTerm, category, platform);
        const newScrap: RequestScrap[] = await this.Service.insertWebScrap(this.req.body, scrap);
        this.sendResponse(newScrap);
      } else {
        this.sendResponse(existingScrap);
      }
    }
    catch (error) {
      this.next(error);
    }
  };

  public getAllWebScrap = async () => {
    try {
      const { searchTerm, category } = this.req.body;
      const scraps: RequestScrap[] = await this.Service.getAllScraps({ searchTerm, category });
      this.sendResponse(scraps);
    }
    catch (error) {
      this.next(error);
    }
  };
}