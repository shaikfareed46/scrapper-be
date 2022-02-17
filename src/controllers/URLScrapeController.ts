import { Response, Request, NextFunction } from 'express';
import { validateUrl } from '../utils/validators/validator';
import { URLScrapeService } from '../services/URLScrapeService';

export class URLScrapeController {
  constructor(protected urlScrapeService: URLScrapeService) {}

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.urlScrapeService.get(req.query);
      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  }

  async save(req: Request, res: Response, next: NextFunction) {
    try {
      // Validate the request body
      validateUrl(req.body);
      console.log('asdasdasd asdadasd asdas');
      await this.urlScrapeService.save(req.body);
      return res.status(201).json({ message: 'Url scrpaing is done' });
    } catch (error) {
      return next(error);
    }
  }
}
