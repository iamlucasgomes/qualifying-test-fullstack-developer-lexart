import { Router } from 'express';
import WebScrapController from '../controller/WebScrap.controller';

const router = Router();

router.post('/',
(req, res, next) => new WebScrapController(req, res, next).getWebScrap());

router.get('/',
(req, res, next) => new WebScrapController(req, res, next).getAllWebScrap());

export default router;