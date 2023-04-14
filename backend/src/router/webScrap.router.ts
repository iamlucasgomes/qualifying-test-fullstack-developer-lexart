import { Router } from 'express';
import WebScrapController from '../controller/WebScrap.controller';

const Controller = new WebScrapController();
const router = Router();

router.post('/', Controller.getWebScrap);

export default router;