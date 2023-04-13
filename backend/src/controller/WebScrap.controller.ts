import { Request, Response } from 'express';
import searchProducts from '../utils/webScrap'

export default class WebScrapController {

  public getWebScrap = async (req: Request, res: Response) => {
    const { searchTerm, category, web } = req.body;
    const response = await searchProducts(searchTerm, category, web);
    res.status(200).json(response);
  };

}